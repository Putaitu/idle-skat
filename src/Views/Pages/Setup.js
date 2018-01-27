'use strict';

class Setup extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.load().company;
            
        this.fetch();

        this.model.sanityCheck();

        this.renderCalculations();
    }

    /**
     * Renders a field
     *
     * @param {String} key
     * @param {String} label
     * @param {String} description
     * @param {Boolean} readOnly
     *
     * @returns {HTMLElement} Field element
     */
    renderField(key, label, description, readOnly) {
        return _.div({class: 'page--setup__user-input__field'},
            _.h4({class: 'page--setup__user-input__field__label'}, label || ''),
            _.div({class: 'page--setup__user-input__field__description'}, description || ''),
            _.input({disabled: readOnly, class: 'page--setup__user-input__field__input', value: this.model[key] || ''})
                .on('input', (e) => {
                    if(readOnly) { return; }

                    this.model[key] = e.currentTarget.value;

                    this.renderCalculations();
                })
        );
    }

    /**
     * Renders the calculations
     */
    renderCalculations() {
        let calculations = this.element.querySelector('.page--setup__calculations');

        if(!calculations) { return; }

        calculations.innerHTML = '';

        _.append(calculations,
            _.h2({class: 'page--setup__calculations__heading'}, 'Calculations (yearly)'),
            _.div({class: 'page--setup__calculations__field'},
                _.h4({class: 'page--setup__calculations__field__label'}, 'Sales'),
                _.div({class: 'page--setup__calculations__field__result'}, this.model.demand + ' × ' + this.model.unitPrice + ' = ' + this.model.estimatedYearlySales),
                _.div({class: 'page--setup__calculations__field__vat'}, 'VAT: ' + this.model.estimatedYearlySales + ' × 25% = ' + this.model.estimatedYearlySalesVAT)
            ),
            _.div({class: 'page--setup__calculations__field'},
                _.h4({class: 'page--setup__calculations__field__label'}, 'Cost'),
                _.div({class: 'page--setup__calculations__field__result'}, this.model.unitProduction + ' × ' + this.model.estimatedYearlyProductionCost + ' = ' + this.model.estimatedYearlyProductionCost),
                _.div({class: 'page--setup__calculations__field__vat'}, 'VAT: ' + this.model.estimatedYearlyProductionCost + ' / 125% × 25% = ' + this.model.estimatedYearlyProductionCostVAT)
            ),
            _.div({class: 'page--setup__calculations__field'},
                _.h4({class: 'page--setup__calculations__field__label'}, 'Income'),
                _.div({class: 'page--setup__calculations__field__result'}, this.model.estimatedYearlyIncome)
            ),
            _.div({class: 'page--setup__calculations__field'},
                _.h4({class: 'page--setup__calculations__field__label'}, 'B-skat'),
                _.div({class: 'page--setup__calculations__field__result'}, this.model.estimatedYearlyBSkat + ' (' + this.model.estimatedMonthlyBSkat + ' per month)')
            ),
            _.div({class: 'page--setup__calculations__field'},
                _.h4({class: 'page--setup__calculations__field__label'}, 'VAT'),
                _.div({class: 'page--setup__calculations__field__result'}, this.model.estimatedYearlySalesVAT + ' - ' + this.model.estimatedYearlyProductionCostVAT + ' = ' + this.model.estimatedYearlyVAT)
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
                    _.h2({class: 'page--setup__user-input__heading'}, 'Estimates'),
                    this.renderField('name', 'Name'),
                    this.renderField('capital', 'Capital', 'How much you, as the owner, will invest for the company\'s spending'),
                    this.renderField('unitPrice', 'Unit price', 'How much you want to charge for your product'),
                    this.renderField('unitProduction', 'Unit production', 'How many units you plan to produce in a year'),
                    this.renderField('unitProductionCost', 'Production cost', 'How much a single unit costs to make'),
                    this.renderField('demand', 'Demand', 'How many units people will buy, based on the set price')
                ),
                _.div({class: 'page--setup__calculations'})
            ),
            _.div({class: 'page--setup__actions'},
                _.button({class: 'widget widget--button'}, 'Start game')
                    .click((e) => {
                        this.model.save();
                    })
            )
        );
    }
}

module.exports = Setup;
