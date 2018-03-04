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
        let tool = new Game.Views.Modals.VATReportingTool({ date: date });

        return new Promise((resolve, reject) => {
            tool.on('done', () => {
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

        if(!vat[year][quarter]) { vat[year][quarter] = { amount: 0, isPaid: false }; }

        let firstMonth = ((quarter - 1) * 3) + 1;
        let lastMonth = firstMonth + 2;

        for(let month = firstMonth; month <= lastMonth; month++) {
            let sales = this.getSales(year, month);
            let cost = this.getCost(year, month);

            let vatSales = (sales / 1.25) * 0.25;
            let vatCost = (cost / 1.25) * 0.25;

            vat[year][quarter].amount += vatSales + vatCost;
        }

        return vat[year][quarter];
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

        if(companyAccount < amount) {
            return Promise.reject('You don\'t have enough money in your company account to pay VAT');
        }

        Game.Services.ConfigService.set('companyAccount', companyAccount - amount);

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

        sales += unitPrice;
        cost += Game.PRODUCTION_COST;

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
}

module.exports = SessionService;
