'use strict';

/**
 * The financial reporting tool
 */
class FinancialReportingTool extends Game.Views.Modals.Modal {
    /**
     * Gets the class name
     */
    get className() {
        return 'modal--financial-reporting-tool';
    }

    /**
     * Renders the header
     */
    renderHeader() {
        return [
            _.h1({class: 'widget text-center'}, this.year + ' over'),
            _.if(this.step === 1,
                _.p({class: 'widget text-center'}, 'Report your financial performance to the tax bureau to evaluate the actual tax incurred in the previous year'),
            )
        ];
    }

    /**
     * Renders the footer
     */
    renderFooter() {
        return _.button({class: 'widget widget--button blue align-right'}, this.step < 2 ? 'Next' : 'Settle')
            .click(() => {
                if(this.step < 2) { return this.setStep(this.step + 1); }  

                this.close();

                let account = Game.Services.ConfigService.get('companyAccount');

                Game.Services.ConfigService.set('companyAccount', account + this.btaxDifference);

                Crisp.View.get('Stats').update(); 

                let message = new Game.Views.Modals.Message({
                    title: 'Financial report complete',
                    message: 'Based on your profit in this year, try to estimate your profit for next year'
                });
                
                message.on('ok', () => {
                    Game.Services.TimeService.goToNextYear();

                    Crisp.Router.go('/b-tax-estimation');
                });
            });
    }

    /**
     * Sets the step
     *
     * @param {Number} step
     */
    setStep(step) {
        this.step = step;

        this.fetch();
    }

    /**
     * Gets the sales number
     */
    get sales() {
        return Game.Services.SessionService.getSales(this.year);
    }
    
    /**
     * Gets the cost number
     */
    get cost() {
        return Game.Services.SessionService.getCost(this.year);
    }

    /**
     * Gets the estimated income
     *
     * @returns {Number} Estimated income
     */
    get estimatedIncome() {
        return Game.Services.ConfigService.get('estimatedIncome');
    }

    /**
     * Gets the B tax paid
     *
     * @returns {Number} B tax paid
     */
    get btaxPaid() {
        return Game.Services.ConfigService.get('btaxAmount');
    }
    
    /**
     * Gets the B tax payable
     *
     * @returns {Number} B tax payable
     */
    get btaxPayable() {
        return Math.round((this.sales - this.cost) * 0.38 * 100) / 100;
    }

    /**
     * Gets the B tax difference
     *
     * @returns {Number} B tax difference
     */
    get btaxDifference() {
        return Math.round((this.btaxPaid - this.btaxPayable) * 100) / 100;
    }

    /**
     * Pre render
     */
    prerender() {
        if(!this.step) { this.step = 1; }

        this.size = 'medium';
    }

    /**
     * Renders the body
     */
    renderBody() {
        return _.div({class: this.className + '__calculation'},
            _.if(this.step === 1,
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'Sales'),
                    _.div({class: 'widget widget--label text-right'}, this.sales + ' DKK')
                ),
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'Cost'),
                    _.div({class: 'widget widget--label text-right'}, '(' + this.cost + ' DKK)')
                ),
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'Profit'),
                    _.div({class: 'widget widget--label text-right result'}, this.sales - this.cost + ' DKK')
                )
            ),
            _.if(this.step === 2,
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'Estimated profit'),
                    _.div({class: 'widget widget--label text-right'}, this.estimatedIncome + ' DKK')
                ),
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'B tax paid'),
                    _.div({class: 'widget widget--label text-right'}, this.btaxPaid + ' DKK')
                ),
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'Actual profit'),
                    _.div({class: 'widget widget--label text-right'}, this.sales - this.cost + ' DKK')
                ),
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'Actual B tax'),
                    _.div({class: 'widget widget--label text-right'}, this.btaxPayable + ' DKK')
                ),
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'},
                        _.if(this.btaxDifference <= 0, 'B tax payable'),
                        _.if(this.btaxDifference > 0, 'B tax refund')
                    ),
                    _.div({class: 'widget widget--label text-right result'}, Math.abs(this.btaxDifference) + ' DKK')
                )
            )
        );
    }
}

module.exports = FinancialReportingTool;
