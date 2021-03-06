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
        
        for(let m = 0; m < machines; m++) {
            for(let p = 0; p < this.getCurrentMachineProductivity(); p++) {
                this.produceUnit();
            }
        }
    }

    /**
     * Checks if a quest has been completed
     *
     * @param {String} title
     *
     * @returns {Boolean} Has been completed
     */
    static isQuestComplete(title) {
        let completedQuests = Game.Services.ConfigService.get('completedQuests', []);
       
        return completedQuests.indexOf(title) > -1;
    }

    /**
     * Checks if the player can afford a certain amount
     *
     * @param {Number} amount
     *
     * @returns {Boolean} Can afford
     */
    static canAfford(amount) {
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        return companyAccount >= amount;
    }

    /**
     * Produces a unit
     */
    static produceUnit() {
        if(!this.canAfford(this.getCurrentProductionCost())) { return; }

        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);
        let inventory = Game.Services.ConfigService.get('inventory', 0);

        Game.Services.ConfigService.set('inventory', inventory + 1);
        Game.Services.ConfigService.set('companyAccount', companyAccount - this.getCurrentProductionCost());
    }

    /**
     * Gets the current machine productivity
     *
     * @returns {Number} Machine productivity
     */
    static getCurrentMachineProductivity() {
        let productivity = Game.MACHINE_PRODUCTIVITY;

        if(this.isQuestComplete('Productivity')) {
            productivity++;
        }

        return productivity;
    }

    /**
     * Gets the current production cost
     *
     * @returns {Number} Current production cost
     */
    static getCurrentProductionCost() {
        let cost = Game.PRODUCTION_COST;

        if(this.isQuestComplete('Cost')) {
            cost -= cost * 0.1;
        }

        return cost;
    }

    /**
     * Gets the current machine price
     *
     * @returns {Number} Current machine price
     */
    static getCurrentMachinePrice() {
        let machines = Game.Services.ConfigService.get('machines', 0);
        let price = Game.MACHINE_PRICE;

        if(machines > 0) {
            price = Math.round(price * Math.pow(1.5, machines) * 100) / 100;
        }

        return price;
    }

    /**
     * Buys a machine
     */
    static buyMachine() {
        let machines = Game.Services.ConfigService.get('machines', 0);
        let price = this.getCurrentMachinePrice();

        if(!this.canAfford(price)) { return; }

        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        Game.Services.ConfigService.set('machines', machines + 1);
        Game.Services.ConfigService.set('companyAccount', companyAccount - price);
    }

    /**
     * Report VAT
     *
     * @param {Date} date
     *
     * @return {Promise}
     */
    static reportVat(date) {
        let year = date.getFullYear();
        let quarter = date.getQuarter() - 1;

        if(quarter < 1) {
            quarter = 4;
            year--;
        }

        let tool = new Game.Views.Modals.VATReportingTool({
            year: year,
            quarter: quarter
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
     * Financial report
     *
     * @param {Date} date
     *
     * @return {Promise}
     */
    static financialReport(date) {
        let year = date.getFullYear();

        let tool = new Game.Views.Modals.FinancialReportingTool({
            year: year
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
     * Gets the B tax information
     *
     * @param {Number} year
     * @param {Number} month
     *
     * @returns { Object} B Tax info
     */
    static getBTax(year, month) {
        let btax = Game.Services.ConfigService.get('btax', {});

        if(!btax[year]) {
            btax[year] = {};
        }
       
        if(!btax[year][month]) {
            btax[year][month] = {
                isPaid: false,
                amount: 0
            };
        }
        
        if(!btax[year][month].isPaid) {
            btax[year][month].amount = Math.round(Game.Services.ConfigService.get('btaxAmount', 0) / 12);
        }

        return btax[year][month];
    }
    
    /**
     * Sets the B tax information
     *
     * @param {Number} year
     * @param {Number} month
     * @param {Object} info
     */
    static setBTax(year, month, info) {
        let btax = Game.Services.ConfigService.get('btax', {});

        if(!btax[year]) { btax[year] = {}; }

        btax[year][month] = info;

        Game.Services.ConfigService.set('btax', btax);
    }

    /**
     * Pay B tax
     *
     * @param {Date} date
     *
     * @return {Promise}
     */
    static payBTax(date) {
        let btax = this.getBTax(date.getFullYear(), date.getMonth() + 1);

        if(btax.isPaid) { 
            return Promise.reject(new Error('You\'ve already paid B tax for ' + date.getMonthName() + ' ' + date.getFullYear()));
        }

        let amount = Game.Services.ConfigService.get('btaxAmount', 0);

        if(amount > 0) { amount = Math.round(amount/12); }
        
        if(!this.canAfford(amount)) {
            return Promise.reject(new Error('You don\'t have enough money in your company account to pay B tax'));
        }
       
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        Game.Services.ConfigService.set('companyAccount', companyAccount - amount);

        btax.isPaid = true;

        this.setBTax(date.getFullYear(), date.getMonth() + 1, btax);

        return Promise.resolve();
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
            
        vat[year][quarter].amount = 0;

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
        vat[year][quarter].amount = Math.round(vat[year][quarter].amount * 100) / 100;
            
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
            vat[year][quarter].isReported = isReported;
        }

        if(isPaid !== undefined) {
            vat[year][quarter].isPaid = isPaid;
        }

        if(amount !== undefined) {
            vat[year][quarter].amount = amount;
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
        let quarter = date.getQuarter() - 1;

        if(quarter < 1) {
            quarter = 4;
            year--;
        }

        let vat = this.getVat(year, quarter);

        if(vat.isPaid) { return; }

        if(!this.canAfford(vat.amount)) {
            return Promise.reject('You don\'t have enough money in your company account to pay VAT');
        }

        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

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
     * Sells an appropriate amount of units
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
        cost += this.getCurrentProductionCost() * 1.25;

        this.setSales(year, month, sales);
        this.setCost(year, month, cost);
                
        Game.Services.ConfigService.set('inventory', inventory - 1);
        Game.Services.ConfigService.set('companyAccount', companyAccount + unitPrice);
        Game.Services.ConfigService.set('lastSale', Date.now());
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
            result = parseFloat(sales[year][month]) || 0;

        // Specific year
        } else if(year) {
            for(let m in sales[year]) {
                result += parseFloat(sales[year][m]) || 0;
            }
        
        // Result sales
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
            result = parseFloat(cost[year][month]) || 0;

        // Specific year
        } else if(year) {
            for(let m in cost[year]) {
                result += parseFloat(cost[year][m]) || 0;
            }
        
        // Result cost
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

        // Nobody wants units above 500 DKK 
        if(unitPrice > 500) {
            return 0;
        }
        
        if(this.isQuestComplete('Demand 2')) {
            return (unitPrice/100) * 0.8;
        }

        if(this.isQuestComplete('Demand 1')) {
            return (unitPrice/100) * 0.9;
        }

        return unitPrice/100;
    }

    /**
     * Gets the sales delay in milliseconds
     *
     * @returns {Number} Sales delay
     */
    static getSalesDelay() {
        return this.getDemandFactor() * 1000 * 24 / Game.Services.TimeService.hoursPerSecond;
    }

    /**
     * Gets sales per day
     *
     * @returns {Number} Sales per day
     */
    static getSalesPerDay() {
        let factor = this.getDemandFactor();

        if(factor <= 0) { return 0; }

        return Math.round(Math.pow(factor, -1) * 100) / 100;
    }
}

module.exports = SessionService;
