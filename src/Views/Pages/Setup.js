'use strict';

class Setup extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current.company;
            
        this.fetch();

        this.sanityCheck();

        this.renderCalculations();
        this.updatePersonalAccount();
    }

    /**
     * Performs a sanity check
     */
    sanityCheck() {
        if(!this.model.name) {
            this.model.name = 'My Company A/S';
            return alert('Company name cannot be empty');
        }

        if(this.model.capital < 0) {
            this.model.capital = 20000;
            return alert('Capital cannot be a negative number');
        }

        if(this.model.unitPrice < 0) {
            this.model.unitPrice = 0;
            return alert('Unit price cannot be a negative number');
        }

        if(this.model.unitProduction < 0) {
            this.model.unitProduction = 0;
            return alert('Unit production cannot be a negative number');
        }

        if(this.model.unitProductionCost < 0) {
            this.model.unitProductionCost = 0;
            return alert('Unit production cost cannot be a negative number');
        }

        if(this.model.demand < 0) {
            this.model.demand = 0;
            return alert('Demand cannot be a negative number');
        }

        if(Game.Models.Player.current.personalAccount < 0) {
            return alert('Your capital cannot exceed your personal account');
        }

        return true;
    }
    
    /**
     * Updates the personal account
     */
    updatePersonalAccount() {
        Game.Models.Player.current.personalAccount = 50000 - this.model.capital;

        Game.Views.Widgets.PlayerInfo.update();
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
        
        return _.div({class: 'page--setup__user-input__field'},
            _.h4({class: 'page--setup__user-input__field__label'}, label || ''),
            _.div({class: 'page--setup__user-input__field__description'}, description || ''),
            _.input({disabled: readOnly, type: type, class: 'widget widget--input', value: this.model[key] || ''})
                .on('input', (e) => {
                    if(readOnly) { return; }

                    this.model[key] = e.currentTarget.value;

                    this.renderCalculations();
                    this.updatePersonalAccount();
                })
        );
    }

    /**
     * Renders a calculation field
     *
     * @param {String} label
     * @param {String} result
     * @param {String} vat
     */
    renderCalculationField(label, result, vat) {
        return _.div({class: 'page--setup__calculations__field'},
            _.h4({class: 'page--setup__calculations__field__label'}, label),
            _.div({class: 'page--setup__calculations__field__result'}, result),
            _.if(vat, 
                _.div({class: 'page--setup__calculations__field__vat'}, 'VAT: ' + vat)
            )
        );
    }

    /**
     * Renders the calculations
     */
    renderCalculations() {
        let calculations = this.element.querySelector('.page--setup__calculations__inner');

        if(!calculations) { return; }

        calculations.innerHTML = '';

        _.append(calculations,
            _.h2({class: 'page--setup__calculations__heading'}, 'Calculations'),
            this.renderCalculationField(
                'Sales',
                this.model.demand + ' × ' + this.model.unitPrice + ' = ' + this.model.estimatedYearlySales,
                this.model.estimatedYearlySales + ' × 25% = ' + this.model.estimatedYearlySalesVAT
            ),
            this.renderCalculationField(
                'Cost',
                this.model.unitProduction + ' × ' + this.model.unitProductionCost + ' = ' + this.model.estimatedYearlyProductionCost,
                this.model.estimatedYearlyProductionCost + ' / 125% × 25% = ' + this.model.estimatedYearlyProductionCostVAT
            ),
            this.renderCalculationField(
                'Income',
                this.model.estimatedYearlyIncome
            ),
            this.renderCalculationField(
                'B-skat',
                this.model.estimatedYearlyBSkat + ' (' + this.model.estimatedMonthlyBSkat + ' per month)'
            ),
            this.renderCalculationField(
                'VAT',
                this.model.estimatedYearlySalesVAT + ' - ' + this.model.estimatedYearlyProductionCostVAT + ' = ' + this.model.estimatedYearlyVAT
            )
        );
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--setup'},
            _.div({class: 'page--setup__numbers'},
                _.div({class: 'page--setup__user-input'},
                    _.h2({class: 'page--setup__user-input__heading'}, 'Registration'),
                    this.renderInputField('name', 'Name', 'The name of your company'),
                    _.h2({class: 'page--setup__user-input__heading'}, 'Business plan'),
                    this.renderInputField('capital', 'Capital', 'How much you, as the owner, will invest for the company\'s spending'),
                    this.renderInputField('unitPrice', 'Unit price', 'How much you want to charge for your product'),
                    this.renderInputField('unitProduction', 'Unit production', 'How many units you plan to produce in a year'),
                    this.renderInputField('unitProductionCost', 'Production cost', 'How much a single unit costs to make'),
                    this.renderInputField('demand', 'Demand', 'How many units people will buy')
                ),
                _.div({class: 'page--setup__calculations'},
                    _.div({class: 'page--setup__calculations__inner'})
                )
            ),
            _.div({class: 'page--setup__actions'},
                _.button({class: 'widget widget--button'}, 'Start game')
                    .click((e) => {
                        if(!this.sanityCheck()) { return; }

                        this.model.save();

                        Game.Services.ConfigService.set('completedSetup', true);
                        Game.Services.TimeService.startClock();

                        Crisp.Router.init();
                    })
            )
        );
    }
}

module.exports = Setup;
