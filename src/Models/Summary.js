'use strict';

/**
 * A monthly summary
 */
class Summary extends Game.Models.Entity {
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
}

module.exports = Summary;
