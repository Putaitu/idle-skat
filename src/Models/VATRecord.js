'use strict';

/**
 * The record for keeping track of VAT payments
 */
class VATRecord extends Game.Models.Entity {
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
        let firstYear = Game.Services.TimeService.startTime.getFullYear();
        let targetYear = Game.Services.TimeService.currentYear;
        let targetQuarter = Game.Services.TimeService.previousQuarter;

        for(let year = firstYear; year <= targetYear; year++) {
            if(!this.payments[year]) {
                this.payments[year] = {};
            }

            let thisTargetQuarter = 4;

            if(year === targetYear) {
                thisTargetQuarter = targetQuarter;
            }

            for(let quarter = 1; quarter <= thisTargetQuarter; quarter++) {
                if(!this.payments[year][quarter]) {
                    this.payments[year][quarter] = {
                        isPaid: false,
                        isReported: false,
                        amount: 0
                    };
                }
            }
        }

        return this.payments; 
    }

    /**
     * Reports a quarter
     *
     * @param {Number} year
     * @param {Number} quarter
     */
    reportQuarter(year, quarter) {
        let amount = 0;

        // TODO: Figure out amount

        this.payments[year][quarter].isReported = true; 
        this.payments[year][quarter].amount = amount;
    }
}

module.exports = VATRecord;
