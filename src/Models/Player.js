'use strict';

let current;

/**
 * The player model
 */
class Player extends Game.Models.Entity {
    /**
     * Structure
     */
    structure() {
        this.personalAccount = 50000;
        this.company = new Game.Models.Company();
        this.vatRecord = new Game.Models.VATRecord();
        this.financialRecord = new Game.Models.FinancialRecord();  
    }

    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.company = new Game.Models.Company(this.company);
        this.vatRecord = new Game.Models.VATRecord(this.vatRecord);
        this.financialRecord = new Game.Models.FinancialRecord(this.financialRecord);
    }

    /**
     * Loads the player data
     *
     * @returns {Player} Player
     */
    static load() {
        return new Player(Game.Services.ConfigService.get('player'));
    }

    /**
     * Get the current player
     */
    static get current() {
        if(!current) {
            current = this.load();
        }

        return current;
    }

    /**
     * Saves the player data
     */
    save() {
        Game.Services.ConfigService.set('player', this);
    }
    
    /**
     * Reports VAT quarterly
     *
     * @param {Number} year
     * @param {Number} quarter
     */
    reportQuarterlyVAT(year, quarter) {
        let amount = 0;

        let report = this.financialRecord.getQuarterlyReport(year, quarter);     

        amount += report.sales * 0.25; // Sales VAT
        amount -= report.productionCost / 1.25 * 0.25; // Cost VAT

        this.vatRecord.payments[year][quarter].isReported = true; 
        this.vatRecord.payments[year][quarter].amount = amount;
    }
    
    /**
     * Pays VAT quarterly
     *
     * @param {Number} year
     * @param {Number} quarter
     */
    payQuarterlyVAT(year, quarter) {
        let payment = this.vatRecord.payments[year][quarter];
        let amount = payment.amount;

        if(payment.fine > 0) {
            amount += payment.fine;

            alert('A late fee of ' + payment.fine + ' kr. has been added');
        }

        this.company.bankBalance -= amount;
        payment.isPaid = true; 
    }
}

module.exports = Player;
