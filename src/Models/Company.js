'use strict';

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
        this.bankBalance = 0;
        this.unitPrice = 20;
        this.unitProduction = 5000;
        this.unitProductionCost = 10;
        this.demand = 10000;

        this.inventory = 0;
        this.machines = 0;
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
     * Gets the estimated yearly B tax
     */
    get estimatedYearlyBTax() {
        return this.round(this.estimatedYearlyIncome * this.estimatedVATPercentage / 100);
    }
    
    /**
     * Gets the estimated yearly VAT
     */
    get estimatedYearlyVAT() {
        return this.round(this.estimatedYearlySalesVAT - this.estimatedYearlyProductionCostVAT);
    }

    /**
     * Gets the estimated monthly B tax
     */
    get estimatedMonthlyBTax() {
        return this.round(this.estimatedYearlyBTax / 12);
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

        this.bankBalance += this.unitPrice;
        Game.Models.Player.current.financialRecord.currentReport.sales += this.unitPrice;
    }

    /**
     * Produces a unit
     */
    produceUnit() {
        if(this.bankBalance < this.unitProductionCost) {
            return alert('You do not have enough money to produce more ' + Game.Services.ConfigService.get('productName'));
        }

        this.inventory++;

        this.bankBalance -= this.unitProductionCost;
        Game.Models.Player.current.financialRecord.currentReport.productionCost += this.unitProductionCost;
    }

    /**
     * Purchases a machine
     */
    purchaseMachine() {
        if(this.bankBalance < Game.MACHINE_PRICE) {
            return alert('You do not have enough money to purchase more machines');
        }

        this.machines++;

        this.bankBalance -= Game.MACHINE_PRICE;
        Game.Models.Player.current.financialRecord.currentReport.productionCost += MACHINE_PRICE;
    }
}

module.exports = Company;
