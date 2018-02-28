'use strict';

/**
 * The B-skat estimation page
 */
class BSkatEstimation extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = {
            income: 96000,
            bskat: 0
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
        this.model.bskat = 0;
        this.finalBSkat.innerHTML = '';

        this.updatePieChart();
    }

    /**
     * Updates the pie chart
     */
    updatePieChart() {
        if(!this.pieChart) { return; }
        
        this.pieChart.setSlice('bskat', 0.33, {
            percent: this.model.bskat / this.model.income,
            value: this.model.bskat
        });

        this.pieChart.setSlice('income', 0.33, {
            percent: 1 - (this.model.bskat / this.model.income),
            value: this.model.income
        });
    }
    
    /**
     * Wraps setTimeout in a promise
     *
     * @param {Number} timeout
     *
     * @returns {Promise} Callback
     */
    wait(timeout) {
        timeout = timeout || 0;
        timeout *= 1000;

        return new Promise((resolve) => {
            setTimeout(() => { resolve(); }, timeout);
        });
    }

    /**
     * Event: Click calculate
     *
     * @param {InputEvent} e
     */
    onClickCalculate(e) {
        let progressBar = new Game.Views.Widgets.ProgressBar();

        progressBar.setProgress(0, 100, 'Step 1...');

        this.wait(1)
        .then(() => {
            progressBar.setProgress(20, 100, 'Step 2...');

            return this.wait(1);
        })
        .then(() => {
            progressBar.setProgress(30, 100, 'Step 3...');

            return this.wait(1);
        })
        .then(() => {
            progressBar.setProgress(40, 100, 'Step 4...');

            return this.wait(1);
        })
        .then(() => {
            progressBar.setProgress(50, 100, 'Step 5...');

            return this.wait(1);
        })
        .then(() => {
            progressBar.setProgress(60, 100, 'Step 6...');

            return this.wait(1);
        })
        .then(() => {
            progressBar.setProgress(70, 100, 'Step 7...');

            return this.wait(1);
        })
        .then(() => {
            progressBar.setProgress(80, 100, 'Step 8...');

            return this.wait(1);
        })
        .then(() => {
            progressBar.setProgress(90, 100, 'Step 9...');

            return this.wait(1);
        })
        .then(() => {
            progressBar.setProgress(100, 100, 'Done!');

            return this.wait(1);
        })
        .then(() => {
            this.model.bskat = this.model.income * 0.38;

            progressBar.remove();

            this.updatePieChart();

            this.finalBSkat.innerHTML = this.model.bskat + ' / 12 = <span>' + Math.round(this.model.bskat / 12) + 'kr. per month</span>';
        });
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--b-skat-estimation'},
            _.h1({class: 'page__title'}, 'B-skat estimation'),
            _.div({class: 'page--b-skat-estimation__input'},
                _.div({class: 'widget-group align-center'},
                    _.label({class: 'widget widget--label'}, 'Target income (yearly)'),
                    _.input({class: 'widget widget--input', type: 'number', min: 0, value: this.model.income})
                        .on('input', (e) => { this.onChangeIncome(e); })
                ),
                _.button({class: 'widget widget--button align-center'}, 'Calculate')
                    .click((e) => { this.onClickCalculate(e); })
            ),
            this.pieChart = new Game.Views.Charts.PieChart({
                className: 'page--b-skat-estimation__pie-chart',
                showPercentage: true,
                model: {
                    bskat: { showPercentage: true, percent: this.model.bskat / this.model.income, label: 'B-skat', value: this.model.bskat, color: 'blue' },
                    income: { percent: 1 - (this.model.bskat / this.model.income), label: 'Target income', color: 'green', value: this.model.income }
                }
            }),
            this.finalBSkat = _.div({class: 'page--b-skat-estimation__final'})
        );
    }
}

module.exports = BSkatEstimation;
