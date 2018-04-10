'use strict';

/**
 * The VAT reporting tool
 */
class VATReportingTool extends Game.Views.Modals.Modal {
    /**
     * Gets the class name
     */
    get className() {
        return 'modal--vat-reporting-tool';
    }

    /**
     * Renders the header
     */
    renderHeader() {
        return _.h1('Report VAT for ' + this.year + ' Q' + this.quarter);
    }

    /**
     * Renders the footer
     */
    renderFooter() {
        return _.button({class: 'widget widget--button blue align-right'}, 'Submit')
            .click(() => {
                if(this.step < 5) { return; }  

                this.close();

                Game.Services.SessionService.setVat(this.year, this.quarter, true);

                this.trigger('submit');
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
        let sales = Game.Services.SessionService.getSalesQuarter(this.year, this.quarter);

        if(this.step > 2) {
            return sales / 1.25 * 0.25;
        } else if(this.step > 1) {
            return sales / 1.25;
        }

        return 0;
    }
    
    /**
     * Gets the cost number
     */
    get cost() {
        let cost = Game.Services.SessionService.getCostQuarter(this.year, this.quarter);

        if(this.step > 4) {
            return cost / 1.25 * 0.25;
        } else if(this.step > 3) {
            return cost / 1.25;
        }

        return 0;
    }

    /**
     * Renders the body
     */
    renderBody() {
        if(!this.step) { this.step = 1; }

        return _.div({class: this.className + '__calculation'},
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Sales'),
                _.div({class: 'widget widget--label'}, Game.Services.SessionService.getSalesQuarter(this.year, this.quarter) + ' DKK'),
                _.if(this.step === 1,
                    _.button({class: 'widget widget--button blue'},
                        '/ 1.25',
                        _.div({class: 'widget__tooltip'}, 'Get the sales without VAT')
                    ).click(() => { this.setStep(2); })
                ),
                _.if(this.step !== 1,
                    _.div({class: 'widget widget--label text-center disabled'}, '/ 1.25')
                ),
                _.if(this.step === 2,
                    _.button({class: 'widget widget--button blue'},
                        '* 0.25',
                        _.div({class: 'widget__tooltip'}, 'Get the sales VAT amount')
                    ).click(() => { this.setStep(3); })
                ),
                _.if(this.step !== 2,
                    _.div({class: 'widget widget--label text-center'}, '* 0.25')
                ),
                _.div({class: 'widget widget--label ' + this.className + '__result'}, this.sales + ' DKK')
            ),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Cost'),
                _.div({class: 'widget widget--label'}, Game.Services.SessionService.getCostQuarter(this.year, this.quarter) + ' DKK'),
                _.if(this.step === 3,
                    _.button({class: 'widget widget--button blue'},
                        '/ 1.25',
                        _.div({class: 'widget__tooltip'}, 'Get the cost without VAT')
                    ).click(() => { this.setStep(4); })
                ),
                _.if(this.step !== 3,
                    _.div({class: 'widget widget--label text-center'}, '/ 1.25')
                ),
                _.if(this.step === 4,
                    _.button({class: 'widget widget--button blue'},
                        '* 0.25',
                        _.div({class: 'widget__tooltip'}, 'Get the cost VAT amount')
                    ).click(() => { this.setStep(5); })
                ),
                _.if(this.step !== 4,
                    _.div({class: 'widget widget--label text-center disabled'}, '* 0.25')
                ),
                _.div({class: 'widget widget--label ' + this.className + '__result'}, this.cost + ' DKK')
            ),
            _.if(this.step > 4,
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'Total'),
                    _.div({class: 'widget widget--label'}, 'sales VAT - cost VAT'),
                    _.div({class: 'widget widget--label'}, '(' + this.sales + ' DKK - ' + this.cost + ' DKK)'),
                    _.div({class: 'widget widget--label'}),
                    _.div({class: 'widget widget--label ' + this.className + '__result'}, (Math.round((this.sales - this.cost) * 100) / 100) + ' DKK')
                )
            )
        );
    }
}

module.exports = VATReportingTool;
