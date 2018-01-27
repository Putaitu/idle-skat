'use strict';

class Setup extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.load().company;
            
        this.fetch();

        this.renderEstimates();
    }

    /**
     * Renders a field
     *
     * @param {String} key
     * @param {String} label
     * @param {String} description
     * @param {Boolean} readOnly
     * @param {Function} calculation
     *
     * @returns {HTMLElement} Field element
     */
    renderField(key, label, description, readOnly, calculation) {
        if(typeof calculation !== 'function') {
            calculation = (value) => { return ''; };
        }

        let calculationField;

        return _.div({class: 'page--setup__user-input__field'},
            _.h4({class: 'page--setup__user-input__field__label'}, label || ''),
            _.input({disabled: readOnly, class: 'page--setup__user-input__field__input', value: this.model[key] || ''})
                .on('input', (e) => {
                    if(readOnly) { return; }

                    this.model[key] = e.currentTarget.value;

                    calculationField.innerHTML = calculation(this.model[key]);

                    this.renderEstimates();
                }),
            calculationField = _.div({class: 'page--setup__user-input__field__calculation'}, calculation(this.model[key])),
            _.div({class: 'page--setup__user-input__field__description'}, description || '')
        );
    }

    /**
     * Renders the estimates
     */
    renderEstimates() {
        let estimates = this.element.querySelector('.page--setup__estimates');

        if(!estimates) { return; }

        estimates.innerHTML = '';

        _.append(estimates,
            _.h2({class: 'page--setup__estimates__heading'}, 'Estimates'),
            _.div({class: 'page--setup__estimates__field'},
                _.h4({class: 'page--setup__estimates__field__label'}, 'Total sales'),
                _.div({class: 'page--setup__estimates__field__calculation'}, this.model.estimatedDemand + ' × ' + this.model.unitPrice),
                _.div({class: 'page--setup__estimates__field__result'}, this.model.estimatedTotalSales),
                _.div({class: 'page--setup__estimates__field__vat'}, 'VAT: ' + this.model.estimatedTotalSales + ' × 25% = ' + (this.model.estimatedTotalSales * 0.25))
            ),
            _.div({class: 'page--setup__estimates__field'},
                _.h4({class: 'page--setup__estimates__field__label'}, 'Total cost'),
                _.div({class: 'page--setup__estimates__field__calculation'}, this.model.unitProduction + ' × ' + this.model.productionCost),
                _.div({class: 'page--setup__estimates__field__result'}, this.model.estimatedTotalCost),
                _.div({class: 'page--setup__estimates__field__vat'}, 'VAT: ' + this.model.estimatedTotalCost + ' / 125% * 25% = ' + (this.model.estimatedTotalCost / 1.25 * 0.25))
            ),
            _.div({class: 'page--setup__estimates__field'},
                _.h4({class: 'page--setup__estimates__field__label'}, 'Estimated income'),
                _.div({class: 'page--setup__estimates__field__result'}, this.model.estimatedIncome)
            )
        );
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--setup'},
            _.div({class: 'page--setup__user-input'},
                this.renderField('name', 'Name'),
                this.renderField('capital', 'Capital', 'How much you, as the owner, invest for the company\'s spending'),
                this.renderField('unitPrice', 'Unit price', 'How much you want to charge for your product'),
                this.renderField('unitProduction', 'Unit production', 'How many units you plan to produce in a year'),
                this.renderField('estimatedDemand', 'Estimated demand', 'How many units people will buy, based on the set price', true),
                this.renderField('productionCost', 'Production cost', 'How much a single unit costs to make', true)
            ),
            _.div({class: 'page--setup__estimates'})
        );
    }
}

module.exports = Setup;
