'use strict';

/**
 * The record for keeping track of VAT payments
 */
class VATRecord extends Game.Models.Entity {
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
        this.payments = {};
    }

    /**
     * Generates all payments
     */
    generatePayments() {
        let startTime = Game.Services.TimeService.startTime;
        let firstYear = startTime.getFullYear();
        let firstQuarter = Game.Services.TimeService.getQuarterFromMonth(startTime.getMonth() + 1);
        let targetYear = Game.Services.TimeService.currentYear;
        let targetQuarter = Game.Services.TimeService.currentQuarter - 1;

        for(let year = firstYear; year <= targetYear; year++) {
            if(!this.payments[year]) {
                this.payments[year] = {};
            }

            let thisFirstQuarter = 1;

            if(year === firstYear) {
                thisFirstQuarter = firstQuarter;
            }

            let thisTargetQuarter = 4;

            if(year === targetYear) {
                thisTargetQuarter = targetQuarter;
            }

            for(let quarter = thisFirstQuarter; quarter <= thisTargetQuarter; quarter++) {
                if((this.payments[year][quarter] || {}) instanceof Game.Models.VATPayment === false) {
                    this.payments[year][quarter] = new Game.Models.VATPayment(this.payments[year][quarter]);
                }
            }
        }

        return this.payments; 
    }
}

module.exports = VATRecord;
