'use strict';

class Setup extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = {
            name: 'My Company Aps',
            total: 7500,
            capital: 5000
        };
            
        this.fetch();
    }
   
    /**
     * Updates the pie chart
     */
    updatePieChart() {
        if(!this.pieChart) { return; }
        
        this.pieChart.setSlice('account', 0.33, {
            percent: 1 - (this.model.capital / this.model.total),
            value: this.model.total - this.model.capital
        });

        this.pieChart.setSlice('capital', 0.33, {
            percent: this.model.capital / this.model.total,
            value: this.model.capital
        });
    }

    /**
     * Event: Change name
     *
     * @param {InputEvent} e
     */
    onChangeName(e) {
        this.model.name = e.currentTarget.value;
    }
    
    /**
     * Event: Change capital
     *
     * @param {InputEvent} e
     */
    onChangeCapital(e) {
        let value = parseInt(e.currentTarget.value);

        if(value < 5000) {
            e.currentTarget.value = 5000;
        }

        if(value > this.model.total) {
            e.currentTarget.value = this.model.total;
        }

        this.model.capital = e.currentTarget.value;

        this.updatePieChart();
    }

    /**
     * Event: Change product
     *
     * @param {InputEvent} e
     */
    onChangeProduct(e) {
        this.model.productName = e.currentTarget.value || 'units';
    }

    /**
     * Event: Click next
     *
     * @param {InputEvent} e
     */
    onClickNext(e) {
        // We clear localStorage this point to make sure we start with a clean slate
        localStorage.clear();

        Game.Services.ConfigService.set('personalAccount', this.model.total - this.model.capital);
        Game.Services.ConfigService.set('companyAccount', this.model.capital);
        Game.Services.ConfigService.set('companyName', this.model.name);
        Game.Services.ConfigService.set('productName', this.model.productName || 'units');

        Crisp.Router.go('/b-tax-estimation');
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--setup'},
            _.div({class: 'page__container'},
                _.h1({class: 'page__title'}, 'Setup'),
                _.div({class: 'page--setup__input'},
                    _.div({class: 'widget-group align-center'},
                        _.label({class: 'widget widget--label'}, 'Company name'),
                        _.input({class: 'widget widget--input', type: 'text', name: 'name', placeholder: 'E.g. "My Company ApS"', value: this.model.name})
                            .on('input', (e) => { this.onChangeName(e); })
                    ),
                    _.div({class: 'widget-group align-center'},
                        _.label({class: 'widget widget--label'}, 'Capital'),
                        _.input({class: 'widget widget--input', type: 'number', min: 0, max: this.model.account, step: 1000, name: 'capital', placeholder: 'E.g. 3000', value: this.model.capital})
                            .on('input', (e) => { this.onChangeCapital(e); })
                    ),
                    _.div({class: 'widget-group align-center'},
                        _.label({class: 'widget widget--label'}, 'Product'),
                        _.input({class: 'widget widget--input', type: 'text', name: 'productName', placeholder: 'E.g. kittens or lasers'})
                            .on('input', (e) => { this.onChangeProduct(e); })
                    )
                ),
                this.pieChart = new Game.Views.Charts.PieChart({
                    className: 'page--setup__pie-chart',
                    model: {
                        account: { percent: 1 - (this.model.capital / this.model.total), label: 'Personal account', value: this.model.total - this.model.capital, color: 'green' },
                        capital: { percent: this.model.capital / this.model.total, label: 'Capital', value: this.model.capital, color: 'blue' },
                        total: { percent: 1, label: 'Total funds', color: 'transparent', value: this.model.total }
                    }
                }),
                _.button({class: 'widget widget--button blue align-right'}, 'Next')
                    .click((e) => { this.onClickNext(e); })
            )
        );
    }
}

module.exports = Setup;
