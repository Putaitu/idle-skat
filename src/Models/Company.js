'use strict';

/**
 * The main company model
 */
class Company extends Game.Models.Entity {
    /**
     * Structure
     */
    structure() {
        this.name = 'My Company A/S';
        this.capital = 20000;
        this.unitPrice = 20;
        this.unitProduction = 5000;
        this.unitProductionCost = 10;
        this.demand = 10000;
    }

    /**
     * Rounds a number by 2 decimal places
     */
    round(num) {
        return Math.round(num * 100) / 100;
    }

    /**
     * Gets the estimated yearly sales
     */
    get estimatedYearlySales() {
        return this.round(this.demand * this.unitPrice);
    }
    
    /**
     * Gets the estimated yearly sales VAT
     */
    get estimatedYearlySalesVAT() {
        return this.round(this.estimatedYearlySales * 0.25);
    }
    
    /**
     * Gets the estimated yearly cost
     */
    get estimatedYearlyProductionCost() {
        return this.round(this.unitProduction * this.unitProductionCost);
    }
    
    /**
     * Gets the estimated yearly cost VAT
     */
    get estimatedYearlyProductionCostVAT() {
        return this.round(this.estimatedYearlyProductionCost / 1.25 * 0.25);
    }
    
    /**
     * Gets the estimated income
     */
    get estimatedYearlyIncome() {
        return this.round(this.estimatedYearlySales - this.estimatedYearlyProductionCost);
    }

    /**
     * Gets the estimated yearly B skat
     */
    get estimatedYearlyBSkat() {
        return this.round(this.estimatedYearlyIncome * this.estimatedVATPercentage / 100);
    }
    
    /**
     * Gets the estimated yearly VAT
     */
    get estimatedYearlyVAT() {
        return this.round(this.estimatedYearlySalesVAT - this.estimatedYearlyProductionCostVAT);
    }

    /**
     * Gets the estimated monthly B skat
     */
    get estimatedMonthlyBSkat() {
        return this.round(this.estimatedYearlyBSkat / 12);
    }

    /**
     * Gets the estimated VAT percentage
     */
    get estimatedVATPercentage() {
        return 38;
    }
    
    /**
     * Saves this company
     */
    save() {
        this.sanityCheck();

        let player = Game.Models.Player.load();

        player.company = this;

        player.save();
    }

    /**
     * Performs a sanity check
     */
    sanityCheck() {
        if(!this.name) {
            this.name = 'My Company A/S';
        }

        if(this.capital < 0) {
            this.capital = 20000;
        }

        if(this.unitPrice < 0) {
            this.unitPrice = 0;
        }

        if(this.unitProduction < 0) {
            this.unitProduction = 0;
        }

        if(this.unitProductionCost < 0) {
            this.unitProductionCost = 0;
        }

        if(this.demand < 0) {
            this.demand = 0;
        }
    }
}

module.exports = Company;
