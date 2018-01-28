'use strict';

class Level extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;
            
        this.fetch();

        setInterval(() => {
            if(Game.isPaused) { return; }

            this.heartbeat();
        }, 1000);
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        // Tick time 
        Game.Services.TimeService.tick();
        
        // Sell one unit every second
        this.model.company.sellUnit();

        // Automatically produce units
        for(let i = 0; i < this.model.company.machines; i++) {
            this.model.company.produceUnit();
        }

        // Check VAT payment
        let checkPaymentQuarter = (paymentQuarter, quarter, year) => {
            // Report VAT
            if(!paymentQuarter.isReported) {
                Game.Views.Widgets.PlayerInfo.notify('calendar', 'Report VAT (Q' + quarter + ' ' + year + ')', 'Report VAT', (key) => {
                    this.model.vatRecord.reportQuarter(year, quarter);

                    this.model.save();

                    Game.Views.Widgets.PlayerInfo.clearNotification('calendar', key);
                    Game.Views.Widgets.PlayerInfo.update();
                });

            // Pay VAT
            } else if(!paymentQuarter.isPaid) {
                Game.Views.Widgets.PlayerInfo.notify('calendar', 'Pay VAT (Q' + quarter + ' ' + year + ')', 'Pay VAT', (key) => {
                    Game.Views.Widgets.PlayerInfo.clearNotification('calendar', key);
                });

            }
        };
        
        let previousQuarter = Game.Services.TimeService.previousQuarter;
        let currentYear = Game.Services.TimeService.currentYear;
        
        this.model.vatRecord.generatePayments();
        
        for(let year in this.model.vatRecord.payments) {
            let paymentYear = this.model.vatRecord.payments[year];
        
            for(let quarter in paymentYear) {
                let paymentQuarter = paymentYear[quarter];

                if(quarter <= previousQuarter) {
                    checkPaymentQuarter(paymentQuarter, quarter, year);
                }
            }
        }

        // Render the level
        this._render();

        // Save the current state
        this.model.save();
    }

    /**
     * Renders an input field
     *
     * @param {String} key
     * @param {String} label
     * @param {String} description
     * @param {Boolean} readOnly
     *
     * @returns {HTMLElement} Field element
     */
    renderInputField(key, label, description, readOnly) {
        let type = 'text';

        if(typeof this.model.company[key] === 'number') {
            type = 'number';
        }
        
        return _.div({class: 'page--level__user-input__field'},
            _.h4({class: 'page--level__user-input__field__label'}, label || ''),
            _.div({class: 'page--level__user-input__field__description'}, description || ''),
            _.input({disabled: readOnly, type: type, class: 'widget widget--input', value: this.model.company[key] || ''})
                .on('change', (e) => {
                    if(readOnly) { return; }

                    this.model.company[key] = e.currentTarget.value;

                    this.model.save();
                    Game.Views.Widgets.PlayerInfo.update();
                    
                    this.fetch();
                })
        );
    }
    
    /**
     * Renders a button
     *
     * @param {String} key
     * @param {String} label
     * @param {String} description
     * @param {String} action
     * @param {Function} onClick
     *
     * @returns {HTMLElement} Field element
     */
    renderButton(key, label, description, action, onClick) {
        return _.div({class: 'page--level__user-input__field'},
            _.h4({class: 'page--level__user-input__field__label'}, (label || '') + ': ' + this.model.company[key]),
            _.div({class: 'page--level__user-input__field__description'}, description || ''),
            _.button({class: 'widget widget--button'}, action)
                .on('click', (e) => {
                    onClick();
                    
                    this.model.save();
                    Game.Views.Widgets.PlayerInfo.update();

                    this.fetch();
                })
        );
    }

    /**
     * Renders a calculation field
     *
     * @param {String} label
     * @param {String} result
     */
    renderCalculationField(label, result) {
        return _.div({class: 'page--level__calculations__field'},
            _.h4({class: 'page--level__calculations__field__label'}, label),
            _.div({class: 'page--level__calculations__field__result'}, result)
        );
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--level'},
            _.div({class: 'page--level__numbers'},
                _.div({class: 'page--level__user-input'},
                    this.renderInputField('unitPrice', 'Unit price'),
                    this.renderButton('machines', 'Machines', 'Price: 200', 'Purchase', () => { this.model.company.purchaseMachine(); }),
                    this.renderButton('inventory', 'Inventory', 'Capacity: ' + this.model.company.productionCapacity + ' / Cost: ' + (this.model.company.productionCapacity * this.model.company.unitProductionCost), 'Produce', () => { this.model.company.produceUnit(); }),
                ),
                _.div({class: 'page--level__calculations'},
                    _.div({class: 'page--level__calculations__inner'},
                        this.renderCalculationField('Sales', this.model.company.currentSummary.sales || '0'),
                        this.renderCalculationField('Production cost', this.model.company.currentSummary.productionCost || '0') 
                    )
                )
            )
        );
    }
}

module.exports = Level;
