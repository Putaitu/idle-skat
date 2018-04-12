'use strict';

class Session extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;
            
        this.fetch();

        this.hearbeatInterval = setInterval(() => {
            this.heartbeat();
        }, 1000);

        this.sellTimeout = setTimeout(() => {
            this.sellUnit();
        }, Game.Services.SessionService.getSalesDelay());

        this.on('remove', () => {
            clearInterval(this.hearbeatInterval);
            clearTimeout(this.sellTimeout);
        });
    }

    /**
     * Sells a unit
     */
    sellUnit() {
        this.sellTimeout = setTimeout(() => {
            this.sellUnit();
        }, Game.Services.SessionService.getSalesDelay());
        
        if(Game.Services.TimeService.isPaused) { return; }

        Game.Services.SessionService.sellUnit();
    }

    /**
     * Heartbeat (once per second)
     */
    heartbeat() {
        if(Game.Services.TimeService.isPaused) { return; }

        // Init tutorial 
        if(!Game.Services.ConfigService.get('initTutorialDone')) { 
            this.startInitTutorial();
        }

        // B tax tutorial
        if(Game.Services.TimeService.currentDate === 3 && !Game.Services.ConfigService.get('bTaxTutorialDone')) {
            this.startBTaxTutorial();
        }

        // Quest tutorial
        if(Game.Services.TimeService.currentDate === 10 && !Game.Services.ConfigService.get('questTutorialDone')) {
            this.startQuestTutorial();
        }

        // Unit price tutorial
        if(Game.Services.SessionService.isQuestComplete('Pricing') && !Game.Services.ConfigService.get('pricingTutorialDone')) {
            this.startPricingTutorial();
        }
        
        // Machines tutorial
        if(Game.Services.SessionService.isQuestComplete('Machines') && !Game.Services.ConfigService.get('machinesTutorialDone')) {
            this.startMachinesTutorial();
        }

        // Tick time 
        Game.Services.TimeService.tick();
       
        this.questLog.heartbeat();
        this.controls.heartbeat();
        this.timeline.heartbeat();
        this.notifications.heartbeat();
        this.stats.heartbeat();

        // Update coin stack
        let stackAmount = Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 100);
        
        if(stackAmount !== this.coinStack.amount) {
            this.coinStack.amount = stackAmount;
        }

        // Automatically produce units, if applicable
        if(Game.Services.TimeService.isNewDay) {
            Game.Services.SessionService.autoProduceUnits();
        }
    }

    /**
     * Starts the unit price tutorial
     */
    startPricingTutorial() {
        let modal = new Game.Views.Modals.Message({
            title: 'Change unit prices',
            canCancel: false,
            canSubmit: false,
            message: 'You can now change unit prices, which will affect the demand for your ' + Game.Services.ConfigService.get('productName') + '! Let\'s set the price to 30 DKK now.',
            focus: {
                element: '.drawer--controls__pricing__input',
                side: 'right',
                align: 'middle'
            }
        });

        let input = modal.focusElement;

        setTimeout(() => {
            modal.elevateFocusElement(true);
        }, 200);

        let onInput = (e) => {
            if(e.currentTarget.value != 30) { return; }

            input.removeEventListener('input', onInput);

            modal.elevateFocusElement(false);
            modal.close();
        
            Game.Services.ConfigService.set('pricingTutorialDone', true);
        };

        input.addEventListener('input', onInput);
    }

    /**
     * Starts the machines tutorial
     */
    startMachinesTutorial() {
        new Game.Views.Modals.Message({
            title: 'Machines',
            canCancel: false,
            message: 'You can now buy machines! Click here to buy one and automatically produce ' + Game.Services.ConfigService.get('productName') + '! Each machine produces ' + Game.Services.SessionService.getCurrentMachineProductivity() + ' ' + Game.Services.ConfigService.get('productName') + ' per day',
            focus: {
                element: '.drawer--controls__buy-machine',
                side: 'right',
                align: 'middle'
            }
        });
        
        Game.Services.ConfigService.set('machinesTutorialDone', true);
    }

    /**
     * Starts the B tax tutorial
     */
    startBTaxTutorial() {
        let modal = new Game.Views.Modals.Message({
            title: 'Pay B tax',
            canCancel: false,
            canSubmit: false,
            message: 'It\'s time to pay B tax! Just click the button to pay and move on with your life.',
            focus: {
                element: '.drawer--notifications__entry__action',
                side: 'left',
                align: 'middle'
            }
        });

        let button = modal.focusElement;

        setTimeout(() => {
            modal.elevateFocusElement(true);
        }, 200);

        let onClick = (e) => {
            button.removeEventListener('click', onClick);

            modal.elevateFocusElement(false);
            modal.close();
        
            Game.Services.ConfigService.set('bTaxTutorialDone', true);
        };

        button.addEventListener('click', onClick);
    }

    /**
     * Starts the quest tutorial
     */
    startQuestTutorial() {
        let modal = new Game.Views.Modals.Message({
            title: 'Quests',
            canCancel: false,
            message: 'Save enough money in your personal account to unlock upgrades.',
            focus: {
                element: '.drawer--quest-log',
                side: 'left',
                align: 'top'
            }
        });

        Game.Services.ConfigService.set('questTutorialDone', true);
    }

    /**
     * Starts the init tutorial
     */
    startInitTutorial() {
        Game.Services.TimeService.isPaused = true;

        let produce = () => {
            let modal = new Game.Views.Modals.Message({
                title: 'Produce',
                canCancel: false,
                canSubmit: false,
                message: 'Press this button to produce ' + Game.Services.ConfigService.get('productName') + ' for selling. Let\'s produce 5 ' + Game.Services.ConfigService.get('productName') + ' now.',
                focus: {
                    element: '.drawer--controls__produce',
                    side: 'right',
                    align: 'top'
                }
            });
           
            let button = modal.focusElement;

            modal.elevateFocusElement(true);

            let count = 0;

            let onClick = () => {
                count++;

                if(count >= 5) {
                    button.removeEventListener('click', onClick);
                    modal.elevateFocusElement(false);

                    transfer(); 
                }
            };

            button.addEventListener('click', onClick);
        };
    
        let time = () => {
            let modal = new Game.Views.Modals.Message({
                title: 'Time',
                canSubmit: false,
                canCancel: false,
                message: 'Use these buttons to control time. You can speed up or pause the game entirely. Press play now to start time.',
                focus: {
                    element: '.drawer--timeline__controls',
                    side: 'top',
                    align: 'left'
                }
            });

            let button = document.querySelector('button[title="Play"]');

            modal.elevateFocusElement(true, button); 

            let onClick = () => {
                modal.close();
                
                Game.Services.ConfigService.set('initTutorialDone', true);

                button.removeEventListener('click', onClick);
            };

            button.addEventListener('click', onClick);
        };

        let transfer = () => {
            return new Game.Views.Modals.Message({
                title: 'Company account',
                canCancel: false,
                message: 'This is the money you invested in the company as capital, you produce and buy upgrades and pay tax out of this account',
                focus: {
                    element: '.drawer--stats__company-account',
                    side: 'bottom',
                    align: 'left'
                }
            }).on('ok', () => {
                new Game.Views.Modals.Message({
                    title: 'Personal account',
                    canCancel: false,
                    message: 'This is the money you own privately, when you reach certain amount you can unlock upgrades!',
                    focus: {
                        element: '.drawer--stats__personal-account',
                        side: 'bottom',
                        align: 'right'
                    }
                }).on('ok', () => {
                    new Game.Views.Modals.Message({
                        title: 'Coins',
                        canCancel: false,
                        message: 'This stack of coins represents the money in your personal account',
                        focus: {
                            element: '.coin-stack__stack',
                            side: 'top',
                            align: 'center'
                        }
                    }).on('ok', () => {
                        let modal = new Game.Views.Modals.Message({
                            title: 'Transfer',
                            canCancel: false,
                            canSubmit: false,
                            message: 'You can transfer money from your company account to your personal account. Let\'s transfer 100 DKK now',
                            focus: {
                                element: '.drawer--stats__preview__transactions button',
                                side: 'bottom',
                                align: 'center'
                            }
                        });

                        let button = modal.focusElement;

                        modal.elevateFocusElement(true);

                        let onClick = (e) => {
                            button.removeEventListener('click', onClick);
                           
                            setTimeout(() => {
                                let modal = Crisp.View.get('Transfer');

                                modal.on('submit', () => {
                                    time();
                                });

                                modal.max = 100;
                            });
                            
                            modal.elevateFocusElement(false);
                            modal.close();
                        };

                        button.addEventListener('click', onClick);
                    });
                });
            });
        };

        produce();
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--session'},
            _.div({class: 'page--session__panel top'},
                this.stats = new Game.Views.Drawers.Stats()
            ),
            _.div({class: 'page--session__panel middle'},
                _.div({class: 'page--session__panel left'},
                    this.controls = new Game.Views.Drawers.Controls()
                ),
                _.div({class: 'page--session__panel center'},
                    this.coinStack = new Game.Views.Charts.CoinStack({
                        amount: Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 100)
                    })
                ),
                _.div({class: 'page--session__panel right'},
                    this.questLog = new Game.Views.Drawers.QuestLog(),
                    this.notifications = new Game.Views.Drawers.Notifications()
                )
            ),
            _.div({class: 'page--session__panel bottom'},
                this.timeline = new Game.Views.Drawers.Timeline()
            )
        );
    }
}

module.exports = Session;
