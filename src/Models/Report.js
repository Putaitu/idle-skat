'use strict';

/**
 * A monthly report
 */
class Report extends Game.Models.Entity {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.sales = parseInt(this.sales);
        this.productionCost = parseInt(this.productionCost);
    }

    /**
     * Structure
     */
    structure() {
        this.sales = 0;
        this.productionCost = 0;
    }

    /**
     * Appends another report to this one
     *
     * @param {Report} report
     */
    append(report) {
        this.sales += report.sales;
        this.productionCost += report.productionCost;
    }
}

module.exports = Report;
