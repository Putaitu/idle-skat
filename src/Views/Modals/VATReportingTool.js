'use strict';

/**
 * The VAT reporting tool
 */
class VATReportingTool extends Game.Views.Modals.Modal {
    /**
     * Gets the class name
     */
    get className() {
        return 'vat-reporting-tool';
    }

    /**
     * Gets the model
     */
    get model() {
        return Game.Models.Player.current.vatRecord.payments[this.year][this.quarter];
    }

    /**
     * Gets the quarterly report
     */
    getQuarterlyReport() {
        return Game.Models.Player.current.financialRecord.getQuarterlyReport(this.year, this.quarter);
    }

    /**
     * Renders the header
     */
    renderHeader() {
        return _.h1('Report VAT for ' + this.year + ' Q' + this.quarter);
    }

    /**
     * Renders the body
     */
    renderBody() {
        return _.div({class: this.className + '__calculation'},
             
        );
    }
}

module.exports = VATReportingTool;
