'use strict';

const MACHINE_PRICE = 200;
const MACHINE_CAPACITY = 10;

/**
 * The main company model
 */
class Company extends Game.Models.Entity {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);
    }

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

        this.inventory = 0;
        this.machines = 0;
        this.summaries = {};
    }

    /**
     * Rounds a number by 2 decimal places
     */
    round(num) {
        return Math.round(num * 100) / 100;
    }

    /**
     * Gets the current summary
     */
    get currentSummary() {
        let time = Game.Services.TimeService.currentTime;
        
        if(!this.summaries[time.getFullYear()]) {
            this.summaries[time.getFullYear()] = {};
        }

        if(!this.summaries[time.getFullYear()][time.getMonth() + 1]) {
            this.summaries[time.getFullYear()][time.getMonth() + 1] = new Game.Models.Summary();
        }
            
        return this.summaries[time.getFullYear()][time.getMonth() + 1];
    }

    /**
     * Gets the production capacity
     */
    get productionCapacity() {
        return this.machines * MACHINE_CAPACITY;
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
        let player = Game.Models.Player.current;

        player.company = this;

        player.save();
    }

    /**
     * Sells a unit
     */
    sellUnit() {
        if(this.inventory < 1) { return; }
        
        this.inventory--;

        this.capital += this.unitPrice;
        this.currentSummary.sales += this.unitPrice;
    }

    /**
     * Produces a unit
     */
    produceUnit() {
        if(this.capital < this.unitProductionCost) {
            return alert('You do not have enough capital to produce more units');
        }

        this.inventory++;

        this.capital -= this.unitProductionCost;
        this.currentSummary.productionCost += this.unitProductionCost;
    }

    /**
     * Purchases a machine
     */
    purchaseMachine() {
        if(this.capital < MACHINE_PRICE) {
            return alert('You do not have enough capital to purchase more machines');
        }

        this.machines++;

        this.capital -= MACHINE_PRICE;
        this.currentSummary.productionCost += MACHINE_PRICE;
    }
}

module.exports = Company;
