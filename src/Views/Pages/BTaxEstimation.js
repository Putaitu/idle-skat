'use strict';

/**
 * The B tax estimation page
 */
class BTaxEstimation extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = {
            income: 96000,
            btax: 0
        };

        this.fetch();
    }

    /**
     * Event: Change income
     *
     * @param {InputEvent} e
     */
    onChangeIncome(e) {
        let value = parseInt(e.currentTarget.value);

        if(value < 0) {
            e.currentTarget.value = 0;
        }

        this.model.income = parseInt(e.currentTarget.value);
        this.model.btax = 0;
        this.finalBTax.innerHTML = '';

        this.updatePieChart();
    }

    /**
     * Updates the pie chart
     */
    updatePieChart() {
        if(!this.pieChart) { return; }
        
        this.pieChart.setSlice('btax', 0.33, {
            percent: this.model.btax / this.model.income,
            value: this.model.btax
        });

        this.pieChart.setSlice('income', 0.33, {
            percent: 1 - (this.model.btax / this.model.income),
            value: this.model.income
        });
    }
    
    /**
     * Event: Click calculate
     *
     * @param {InputEvent} e
     */
    onClickCalculate(e) {
        let progressBar = new Game.Views.Widgets.ProgressBar();
        let progress = 0;
        let max = 38;

        progress += 0.8;
        progressBar.setProgress(progress, max, 'Church tax...');
        
        wait(1)
        .then(() => {
            progress += 2.8;
            progressBar.setProgress(progress, max, 'State tax...');

            return wait(0.9);
        })
        .then(() => {
            progress += 5;
            progressBar.setProgress(progress, max, 'Health contributions...');

            return wait(0.85);
        })
        .then(() => {
            progress += 23.8;
            progressBar.setProgress(progress, max, 'Municipal tax...');

            return wait(1);
        })
        .then(() => {
            progress += 2.8;
            progressBar.setProgress(progress, max, 'Labour market contribution...');

            return wait(0.4);
        })
        .then(() => {
            progress += 2.8;
            progressBar.setProgress(progress, max, 'ATP contribution...');

            return wait(2);
        })
        .then(() => {
            this.model.btax = this.model.income * 0.38;

            progressBar.remove();

            this.updatePieChart();

            this.finalBTax.innerHTML = this.model.btax + ' / 12 = <span>' + Math.round(this.model.btax / 12) + 'kr. per month</span>';
        });
    }

    /**
     * Event: Click done
     *
     * @param {InputEvent} e
     */
    onClickDone(e) {
        if(this.model.btax <= 0) { return alert('Please calculate your B tax first'); } 

        // Save the estimated income
        Game.Services.ConfigService.set('estimatedIncome', this.model.income);

        // Save the B tax estimate
        Game.Services.ConfigService.set('btax', this.model.btax);

        // Check if setup is complete
        if(!Game.Services.ConfigService.set('completedSetup')) {
            Game.Services.ConfigService.set('completedSetup', true);
            Game.Services.TimeService.startClock();
        }

        location.hash = '/session';
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--b-tax-estimation'},
            _.h1({class: 'page__title'}, 'B tax estimation for ' + Game.Services.TimeService.currentYear),
            _.div({class: 'page--b-tax-estimation__input'},
                _.div({class: 'widget-group align-center'},
                    _.label({class: 'widget widget--label'}, 'Target income for ' + Game.Services.TimeService.currentYear),
                    _.input({class: 'widget widget--input', type: 'number', step: 1000, min: 0, value: this.model.income})
                        .on('input', (e) => { this.onChangeIncome(e); })
                ),
                _.button({class: 'widget widget--button align-center'}, 'Calculate B tax')
                    .click((e) => { this.onClickCalculate(e); })
            ),
            this.pieChart = new Game.Views.Charts.PieChart({
                className: 'page--b-tax-estimation__pie-chart',
                showPercentage: true,
                model: {
                    btax: { showPercentage: true, percent: this.model.btax / this.model.income, label: 'B tax', value: this.model.btax, color: 'blue' },
                    income: { percent: 1 - (this.model.btax / this.model.income), label: 'Target income', color: 'green', value: this.model.income }
                }
            }),
            this.finalBTax = _.div({class: 'page--b-tax-estimation__final'}),
            _.button({class: 'widget widget--button align-right'}, 'Done')
                .click((e) => { this.onClickDone(e); })
        );
    }
}

module.exports = BTaxEstimation;
