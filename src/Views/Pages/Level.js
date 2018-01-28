'use strict';

class Level extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current.company;
            
        this.fetch();

        setInterval(() => {
            this.heartbeat();
        }, 1000);
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.model.sellUnit();

        this._render();

        Game.Models.Player.current.save();
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

        if(typeof this.model[key] === 'number') {
            type = 'number';
        }
        
        return _.div({class: 'page--level__user-input__field'},
            _.h4({class: 'page--level__user-input__field__label'}, label || ''),
            _.div({class: 'page--level__user-input__field__description'}, description || ''),
            _.input({disabled: readOnly, type: type, class: 'widget widget--input', value: this.model[key] || ''})
                .on('change', (e) => {
                    if(readOnly) { return; }

                    this.model[key] = e.currentTarget.value;

                    Game.Models.Player.current.save();
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
            _.h4({class: 'page--level__user-input__field__label'}, (label || '') + ': ' + this.model[key]),
            _.div({class: 'page--level__user-input__field__description'}, description || ''),
            _.button({class: 'widget widget--button'}, action)
                .on('click', (e) => {
                    onClick();
                    
                    Game.Models.Player.current.save();
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
                    this.renderButton('machines', 'Machines', 'Price: 200', 'Purchase', () => { this.model.purchaseMachine(); }),
                    this.renderButton('inventory', 'Inventory', 'Capacity: ' + this.model.productionCapacity + ' / Cost: ' + (this.model.productionCapacity * this.model.unitProductionCost), 'Produce', () => { this.model.produceUnits(); }),
                ),
                _.div({class: 'page--level__calculations'},
                    _.div({class: 'page--level__calculations__inner'},
                        this.renderCalculationField('Sales', this.model.currentSummary.sales || '0'),
                        this.renderCalculationField('Production cost', this.model.currentSummary.productionCost || '0') 
                    )
                )
            )
        );
    }
}

module.exports = Level;
