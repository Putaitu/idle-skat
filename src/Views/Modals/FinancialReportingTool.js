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
        return _.h1('Financial report for ' + this.year);
    }

    /**
     * Renders the footer
     */
    renderFooter() {
        return _.button({class: 'widget widget--button align-right'}, 'Submit')
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
        let sales = Game.Services.SessionService.getSales(this.year);

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
        let cost = Game.Services.SessionService.getCost(this.year);

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
                _.div({class: 'widget widget--label'}, 'Profit and loss'),
                _.div({class: 'widget widget--label'}, 'Sales - cost'),
                _.div({class: 'widget widget--label'}, this.sales + ' - ' + this.cost),
                _.div({class: 'widget widget--label text-right'}, this.sales - this.cost)
            )
        );
    }
}

module.exports = FinancialReportingTool;
