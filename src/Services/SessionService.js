'use strict';

/**
 * A general helper service for common actions
 */
class SessionService {
    /**
     * Automatically produces units
     */
    static autoProduceUnits() {
        let machines = Game.Services.ConfigService.get('machines', 0);

        if(machines < 1) { return; }
        
        for(let i = 0; i < machines; i++) {
            this.produceUnit();
        }
    }

    /**
     * Produces a unit
     */
    static produceUnit() {
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        if(companyAccount < Game.PRODUCTION_COST) { return; }

        let inventory = Game.Services.ConfigService.get('inventory', 0);

        Game.Services.ConfigService.set('inventory', inventory + 1);
        Game.Services.ConfigService.set('companyAccount', companyAccount - Game.PRODUCTION_COST);
    }

    /**
     * Buys a machine
     */
    static buyMachine() {
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        if(companyAccount < Game.MACHINE_PRICE) { return; }

        let machines = Game.Services.ConfigService.get('machines', 0);

        Game.Services.ConfigService.set('machines', machines + 1);
        Game.Services.ConfigService.set('companyAccount', companyAccount - Game.MACHINE_PRICE);
    }

    /**
     * Report VAT
     *
     * @param {Date} date
     *
     * @return {Promise}
     */
    static reportVat(date) {
        let tool = new Game.Views.Modals.VATReportingTool({
            year: date.getFullYear(),
            quarter: date.getQuarter()
        });

        return new Promise((resolve, reject) => {
            tool.on('submit', () => {
                resolve();
            });

            tool.on('cancel', () => {
                reject();
            });
        });
    }

    /**
     * Pay B tax
     *
     * @param {Date} date
     *
     * @return {Promise}
     */
    static payBTax(date) {
        let amount = Game.Services.ConfigService.get('btax', 0);

        if(amount > 0) { amount = Math.round(amount/12); }
        
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        if(companyAccount < amount) {
            return Promise.reject(new Error('You don\'t have enough money in your company account to pay B tax'));
        }

        Game.Services.ConfigService.set('companyAccount', companyAccount - amount);
        
        return Promise.resolve('B tax for ' + date.getMonthName() + ' ' + date.getFullYear() + ' has been paid');
    }
    
    /**
     * Gets VAT info
     *
     * @param {Number} year
     * @param {Number} quarter
     *
     * @returns {Object} VAT info
     */
    static getVat(year, quarter) {
        let vat = Game.Services.ConfigService.get('vat', {});

        if(!year) { return vat; }

        if(!vat[year]) { vat[year] = {}; }

        if(!quarter) { return vat[year]; }

        if(!vat[year][quarter]) { vat[year][quarter] = { amount: 0, isPaid: false, isReported: false }; }

        let firstMonth = ((quarter - 1) * 3) + 1;
        let lastMonth = firstMonth + 2;

        for(let month = firstMonth; month <= lastMonth; month++) {
            let sales = this.getSales(year, month);
            let cost = this.getCost(year, month);

            let vatSales = (sales / 1.25) * 0.25;
            let vatCost = (cost / 1.25) * 0.25;

            vat[year][quarter].amount += vatSales - vatCost;
        }
            
        // Round to 2 decimals
        vat[year][quarter].amount = Math.round((vat[year][quarter].amount) * 100) / 100;
            
        return vat[year][quarter];
    }

    /**
     * Sets VAT info
     *
     * @param {Number} year
     * @param {Number} quarter
     * @param {Boolean} isReported
     * @param {Boolean} isPaid
     * @param {Number} amount
     */
    static setVat(year, quarter, isReported, isPaid, amount) {
        if(!year) { throw new Error('Year is required'); }
        if(!quarter) { throw new Error('Quarter is required'); }

        let vat = Game.Services.ConfigService.get('vat', {});
        
        if(!vat[year]) { vat[year] = {}; }
        if(!vat[year][quarter]) { vat[year][quarter] = {} }
        
        if(isReported !== undefined) {
            vat.isReported = isReported;
        }

        if(isPaid !== undefined) {
            vat.isPaid = isPaid;
        }

        if(amount !== undefined) {
            vat.amount = amount;
        }

        Game.Services.ConfigService.set('vat', vat);
    }

    /**
     * Pay VAT
     *
     * @param {Date} date
     *
     * @return {Promise}
     */
    static payVat(date) {
        let year = date.getFullYear();
        let quarter = date.getQuarter();

        let vat = this.getVat(year, quarter);

        if(vat.isPaid) { return; }

        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        if(companyAccount < vat.amount) {
            return Promise.reject('You don\'t have enough money in your company account to pay VAT');
        }

        Game.Services.ConfigService.set('companyAccount', companyAccount - vat.amount);

        return Promise.resolve('VAT for ' + year + ' Q' + quarter + ' has been paid');
    }

    /**
     * Sets the unit price
     *
     * @param {Number} price 
     */
    static setUnitPrice(price) {
        Game.Services.ConfigService.set('unitPrice', price);
    }

    /**
     * Sells a unit
     */
    static sellUnit() {
        let inventory = Game.Services.ConfigService.get('inventory', 0);

        if(inventory < 1) { return; }
        
        let year = Game.Services.TimeService.currentYear;
        let month = Game.Services.TimeService.currentMonth;
       
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);
        let sales = this.getSales(year, month);
        let cost = this.getCost(year, month);
        let unitPrice = Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE);

        sales += unitPrice * 1.25;
        cost += Game.PRODUCTION_COST * 1.25;

        this.setSales(year, month, sales);
        this.setCost(year, month, cost);
                
        Game.Services.ConfigService.set('inventory', inventory - 1);
        Game.Services.ConfigService.set('companyAccount', companyAccount + unitPrice);
    }

    /**
     * Gets the sales numbers
     *
     * @param {Number} year
     * @param {Number} month
     *
     * @param {Number} Sales
     */
    static getSales(year, month) {
        let result = 0;
        let sales = Game.Services.ConfigService.get('sales', {});

        if(year && !sales[year]) { sales[year] = {}; }
        if(month && !sales[year][month]) { sales[year][month] = 0; }
    
        // Specific month
        if(year && month) {
            result = sales[year][month];

        // Specific year
        } else if(month) {
            for(let m in sales[year]) {
                result += parseFloat(sales[y][m]) || 0;
            }
        
        // result sales
        } else {
            for(let y in sales) {
                for(let m in sales[y]) {
                    result += parseFloat(sales[y][m]) || 0;
                }
            }
        }

        return result;
    }
   
    /**
     * Gets sales per quarter
     *
     * @param {Number} year
     * @param {Number} quarter
     *
     * @returns {Number} Sales per quarter
     */
    static getSalesQuarter(year, quarter) {
        let result = 0;

        let month = (quarter - 1) * 3 + 1;

        result += this.getSales(year, month);
        
        month++;

        result += this.getSales(year, month);
        
        month++;
        
        result += this.getSales(year, month);

        return result;
    }

    /**
     * Sets the sales numbers
     *
     * @param {Number} year
     * @param {Number} month
     * @param {Number} amount
     */
    static setSales(year, month, amount) {
        if(!year) { throw new Error('Year is required'); }
        if(!month) { throw new Error('Month is required'); }

        let sales = Game.Services.ConfigService.get('sales', {});

        if(!year) { return sales; }

        if(!sales[year]) { sales[year] = {}; }

        if(!month) { return sales[year]; }
        
        if(!sales[year][month]) { sales[year][month] = 0; }

        sales[year][month] = amount;
        
        Game.Services.ConfigService.set('sales', sales);
    }
    
    /**
     * Gets the cost numbers
     *
     * @param {Number} year
     * @param {Number} month
     *
     * @param {Object|Number} cost
     */
    static getCost(year, month) {
        let result = 0;
        let cost = Game.Services.ConfigService.get('cost', {});

        if(year && !cost[year]) { cost[year] = {}; }
        if(month && !cost[year][month]) { cost[year][month] = 0; }
    
        // Specific month
        if(year && month) {
            result = cost[year][month];

        // Specific year
        } else if(month) {
            for(let m in cost[year]) {
                result += parseFloat(cost[y][m]) || 0;
            }
        
        // result cost
        } else {
            for(let y in cost) {
                for(let m in cost[y]) {
                    result += parseFloat(cost[y][m]) || 0;
                }
            }
        }

        return Math.round(result);
    }
    
    /**
     * Gets cost per quarter
     *
     * @param {Number} year
     * @param {Number} quarter
     *
     * @returns {Number} Cost per quarter
     */
    static getCostQuarter(year, quarter) {
        let result = 0;

        let month = (quarter - 1) * 3 + 1;

        result += this.getCost(year, month);
        
        month++;

        result += this.getCost(year, month);
        
        month++;
        
        result += this.getCost(year, month);

        return result;
    }

    /**
     * Sets the cost numbers
     *
     * @param {Number} year
     * @param {Number} month
     * @param {Number} amount
     */
    static setCost(year, month, amount) {
        if(!year) { throw new Error('Year is required'); }
        if(!month) { throw new Error('Month is required'); }

        let cost = Game.Services.ConfigService.get('cost', {});

        if(!year) { return cost; }

        if(!cost[year]) { cost[year] = {}; }

        if(!month) { return cost[year]; }
        
        if(!cost[year][month]) { cost[year][month] = 0; }

        cost[year][month] = amount;
        
        Game.Services.ConfigService.set('cost', cost);
    }

    /**
     * Gets the demand
     *
     * @returns {Number} Demand factor
     */
    static getDemandFactor() {
        let unitPrice = Game.Services.ConfigService.get('unitPrice', 0);

        // Nobody wants units above 1000 DKK 
        if(unitPrice > 1000) {
            return 0;
        }

        return unitPrice/100;
    }

    /**
     * Gets sales per second
     *
     * @returns {Number} Sales per second
     */
    static getSalesPerSecond() {
        let factor = this.getDemandFactor();

        if(factor <= 0) { return 0; }

        return Math.round(Math.pow(factor, -1));
    }
}

module.exports = SessionService;
