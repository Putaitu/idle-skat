'use strict';

const MACHINE_DELAY = 4;

let machineCounter = 0;

class Session extends Crisp.View {
    /**
     * Constructor
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
        if(!document.hasFocus()) { return; }

        // Tick time 
        Game.Services.TimeService.tick();
       
        this.timeline.heartbeat();
        this.notifications.heartbeat();

        /*
        // Sell one unit every second
        this.model.company.sellUnit();

        // Automatically produce units
        machineCounter++;
        
        if(machineCounter >= MACHINE_DELAY) {
            for(let i = 0; i < this.model.company.machines; i++) {
                this.model.company.produceUnit();
            }

            machineCounter = 0;
        }

        // Update the VAT record drawer
        Game.Views.Drawers.VATRecordDrawer.update();

        // Update the financial record drawer
        Game.Views.Drawers.FinancialRecordDrawer.update();

        // Render the level
        this._render();
        */

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
                    this.renderButton('machines', 'Machines', 'Price: 10000 kr.', 'Purchase', () => { this.model.company.purchaseMachine(); }),
                    this.renderButton('inventory', 'Inventory', 'Cost: ' + this.model.company.unitProductionCost + ' kr.', 'Produce', () => { this.model.company.produceUnit(); }),
                )/*,
                _.div({class: 'page--level__calculations'},
                    _.div({class: 'page--level__calculations__inner'},
                        this.renderCalculationField('Sales', this.model.financialRecord.currentReport.sales + ' kr.'),
                        this.renderCalculationField('Production cost', this.model.financialRecord.currentReport.productionCost + ' kr.') 
                    )
                )*/
            ),
            this.notifications = new Game.Views.Drawers.Notifications(),
            this.timeline = new Game.Views.Drawers.Timeline()
        );
    }
}

module.exports = Session;
