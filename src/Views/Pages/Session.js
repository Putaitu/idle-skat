'use strict';

class Session extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;
            
        this.fetch();

        setInterval(() => {
            this.heartbeat();
        }, 1000);

        setTimeout(() => {
            this.sellUnit();
        }, Game.Services.SessionService.getSalesDelay());

        if(!Game.Services.ConfigService.get('tutorialTaken')) {
            setTimeout(() => {
                this.startTutorial();
            }, 200);
        }
    }

    /**
     * Sells a unit
     */
    sellUnit() {
        setTimeout(() => {
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

        // Tick time 
        Game.Services.TimeService.tick();
       
        this.questLog.heartbeat();
        this.controls.heartbeat();
        this.timeline.heartbeat();
        this.notifications.heartbeat();
        this.stats.heartbeat();

        // Update coin stack
        let stackAmount = Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000);
        
        if(stackAmount !== this.coinStack.amount) {
            this.coinStack.amount = stackAmount;
        }

        // Automatically produce units, if applicable
        Game.Services.SessionService.autoProduceUnits();
    }

    /**
     * Starts the tutorial
     */
    startTutorial() {
        Game.Services.ConfigService.set('tutorialTaken', true);

        let currentStep = 0;

        let onCancel = () => {
            new Game.Views.Modals.Message({
                title: 'Tutorial cancelled',
                message: 'You can restart the tutorial at any time by pressing this button',
                focus: {
                    element: '.page--session__start-tutorial',
                    side: 'bottom',
                    align: 'right'
                }
            });
        };

        let step = () => {
            currentStep++;

            switch(currentStep) {
                case 1:
                    return new Game.Views.Modals.Message({
                        title: 'Produce',
                        message: 'Press this button to produce units for selling',
                        focus: {
                            element: '.drawer--controls__produce',
                            side: 'right',
                            align: 'top'
                        }
                    }).on('ok', () => {
                        step(); 
                    }).on('cancel', () => {
                        onCancel();  
                    });
                
                case 2:
                    return new Game.Views.Modals.Message({
                        title: 'Company account',
                        message: 'This is the money you invested in the company as capital, you produce and buy upgrades and pay tax out of this account',
                        focus: {
                            element: '.drawer--stats__company-account',
                            side: 'bottom',
                            align: 'left'
                        }
                    }).on('ok', () => {
                        step(); 
                    }).on('cancel', () => {
                        onCancel();  
                    });
                
                case 3:
                    return new Game.Views.Modals.Message({
                        title: 'Personal account',
                        message: 'This is the money you own privately, when you reach certain amount you can unlock upgrades. The more money you have here the more coins you will have!',
                        focus: {
                            element: '.drawer--stats__personal-account',
                            side: 'bottom',
                            align: 'right'
                        }
                    }).on('ok', () => {
                        step(); 
                    }).on('cancel', () => {
                        onCancel();  
                    });
                
                case 4:
                    return new Game.Views.Modals.Message({
                        title: 'Pay B tax',
                        message: 'It\'s a monthly prepayment for b-tax based on you expected income, regardless of how much you actually earned',
                        focus: {
                            element: '.drawer--notifications__entries',
                            side: 'left',
                            align: 'top'
                        }
                    }).on('ok', () => {
                        step(); 
                    }).on('cancel', () => {
                        onCancel();  
                    });
                
                case 5:
                    return new Game.Views.Modals.Message({
                        title: 'Report VAT',
                        message: 'Report to the tax bureau how much goods and service tax you should pay, based on how much you sold throughout the quarter and how much you paid in cost to produce the products.',
                        focus: {
                            element: '.drawer--notifications__entries',
                            side: 'left',
                            align: 'top'
                        }
                    }).on('ok', () => {
                        step(); 
                    }).on('cancel', () => {
                        onCancel();  
                    });
                
                case 6:
                    return new Game.Views.Modals.Message({
                        title: 'Quests',
                        message: 'Save enough money in your personal account to unlock upgrades',
                        focus: {
                            element: '.drawer--quest-log',
                            side: 'left',
                            align: 'top'
                        }
                    }).on('ok', () => {
                        step(); 
                    }).on('cancel', () => {
                        onCancel();  
                    });
                
                case 7:
                    return new Game.Views.Modals.Message({
                        title: 'Time',
                        message: 'The game will now run in normal speed. If you want to change the speed of the game at any time, you can use these buttons',
                        focus: {
                            element: '.drawer--timeline__controls',
                            side: 'top',
                            align: 'left'
                        }
                    });
            }
        };

        step();
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--session'},
            _.div({class: 'page--session__panel top'},
                this.stats = new Game.Views.Drawers.Stats(),
                _.button({class: 'widget widget--button round page--session__start-tutorial', title: 'Start tutorial'}, '?')
                    .click(() => { this.startTutorial(); })
            ),
            _.div({class: 'page--session__panel middle'},
                _.div({class: 'page--session__panel left'},
                    this.controls = new Game.Views.Drawers.Controls()
                ),
                _.div({class: 'page--session__panel center'},
                    this.coinStack = new Game.Views.Charts.CoinStack({
                        amount: Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000)
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
