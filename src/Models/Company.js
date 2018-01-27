'use strict';

/**
 * The main company model
 */
class Company extends Game.Models.Entity {
    /**
     * Structure
     */
    structure() {
        this.name = '';
        this.capital = 0;
        this.unitPrice = 0;
        this.unitProduction = 0;
    }

    /**
     * Gets the estimated demand
     */
    get estimatedDemand() {
        return this.unitPrice * 500;
    }

    /**
     * Gets the estimated total sales
     */
    get estimatedTotalSales() {
        return this.estimatedDemand * this.unitPrice;
    }
    
    /**
     * Gets the estimated total cost
     */
    get estimatedTotalCost() {
        return this.unitProduction * this.productionCost;
    }
    
    /**
     * Gets the estimated income
     */
    get estimatedIncome() {
        return this.estimatedTotalSales - this.estimatedTotalCost;
    }

    /**
     * Gets the production cost
     */
    get productionCost() {
        return 10;
    }

    /**
     * Saves this company
     */
    save() {
        Game.Services.ConfigService.set('company', this);
    }
}

module.exports = Company;
