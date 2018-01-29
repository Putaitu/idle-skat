'use strict';

/**
 * A class for keeping track of reports
 */
class FinancialRecord extends Game.Models.Entity {
    /**
     * Structure
     */
    structure() {
        this.reports = {};
    }

    /**
     * Generate reports
     */
    generateReports() {
        let firstYear = Game.Services.TimeService.startTime.getFullYear();
        let firstMonth = Game.Services.TimeService.startTime.getMonth() + 1;
        let targetYear = Game.Services.TimeService.currentYear;
        let targetMonth = Game.Services.TimeService.currentMonth;

        for(let year = firstYear; year <= targetYear; year++) {
            if(!this.reports[year]) {
                this.reports[year] = {};
            }

            let thisFirstMonth = 1;
            let thisTargetMonth = 12;

            if(year === firstYear) {
                thisFirstMonth = firstMonth;
            }

            if(year === targetYear) {
                thisTargetMonth = targetMonth;
            }

            for(let month = thisFirstMonth; month <= thisTargetMonth; month++) {
                if(!this.reports[year][month]) {
                    this.reports[year][month] = new Game.Models.Report();
                }
            }
        }

        return this.reports; 
    }

    /**
     * Gets quarterly report
     *
     * @param {Number} year
     * @param {Number} quarter
     *
     * @returns {Object} Quarterly report
     */
    getQuarterlyReport(year, quarter) {
        this.generateReports();

        let firstMonth = quarter * 3 - 2;
        let targetMonth = firstMonth + 3;
        
        let report = new Game.Models.Report();

        for(let month = firstMonth; month < targetMonth; month++) {
            report.append(this.reports[year][month]);
        }

        return report; 
    }

    /**
     * Gets the current report
     */
    get currentReport() {
        this.generateReports();

        return this.reports[Game.Services.TimeService.currentYear][Game.Services.TimeService.currentMonth];
    }

}

module.exports = FinancialRecord;
