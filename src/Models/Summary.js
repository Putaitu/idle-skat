'use strict';

/**
 * A monthly summary
 */
class Summary extends Game.Models.Entity {
    /**
     * Structure
     */
    structure() {
        this.sales = 0;
        this.productionCost = 0;
    }
}

module.exports = Summary;
