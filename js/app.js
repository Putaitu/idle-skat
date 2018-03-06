/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

window._ = Crisp.Elements;

// -------------------
// Constants
// -------------------
window.Game = {
    MACHINE_PRICE: 10000,
    MACHINE_CAPACITY: 1,
    PRODUCTION_COST: 10,
    DEFAULT_UNIT_PRICE: 10
};

// -------------------
// Services
// -------------------
Game.Services = {};
Game.Services.ConfigService = __webpack_require__(2);
Game.Services.TimeService = __webpack_require__(3);
Game.Services.DebugService = __webpack_require__(4);
Game.Services.SessionService = __webpack_require__(5);

// -------------------
// Models
// -------------------
Game.Models = {};
Game.Models.Entity = __webpack_require__(6);
Game.Models.Player = __webpack_require__(7);
Game.Models.Company = __webpack_require__(8);
Game.Models.Report = __webpack_require__(9);
Game.Models.VATRecord = __webpack_require__(10);
Game.Models.VATPayment = __webpack_require__(11);
Game.Models.FinancialRecord = __webpack_require__(12);

// -------------------
// Views
// -------------------
Game.Views = {};

Game.Views.Widgets = {};
Game.Views.Widgets.PlayerInfo = __webpack_require__(13);
Game.Views.Widgets.DebugMenu = __webpack_require__(14);
Game.Views.Widgets.ProgressBar = __webpack_require__(15);

Game.Views.Modals = {};
Game.Views.Modals.Modal = __webpack_require__(16);
Game.Views.Modals.Message = __webpack_require__(17);
Game.Views.Modals.Transfer = __webpack_require__(18);
Game.Views.Modals.VATReportingTool = __webpack_require__(19);

Game.Views.Drawers = {};
Game.Views.Drawers.Drawer = __webpack_require__(20);
Game.Views.Drawers.Timeline = __webpack_require__(21);
Game.Views.Drawers.Stats = __webpack_require__(22);
Game.Views.Drawers.Notifications = __webpack_require__(23);

Game.Views.Charts = {};
Game.Views.Charts.PieChart = __webpack_require__(24);
Game.Views.Charts.CoinStack = __webpack_require__(25);

Game.Views.Pages = {};
Game.Views.Pages.Setup = __webpack_require__(26);
Game.Views.Pages.BTaxEstimation = __webpack_require__(27);
Game.Views.Pages.Session = __webpack_require__(28);

// -------------------
// Controllers
// -------------------
Game.Controllers = {};
Game.Controllers.ViewController = __webpack_require__(29);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The service for user config stored in localStorage
 */

class ConfigService {
    /**
     * Sets a value
     *
     * @param {String} key
     * @param {Object} value
     */
    static set(key, value) {
        if (!this.cache) {
            this.cache = {};
        }

        if (!!parseFloat(value)) {
            value = parseFloat(value);
        }

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            localStorage.setItem(key, value);
        }

        this.cache[key] = value;
    }

    /**
     * Gets a value
     *
     * @param {String} key
     * @param {Object} defaultValue
     *
     * @returns {Object} Value
     */
    static get(key, defaultValue) {
        if (!this.cache) {
            this.cache = {};
        }

        if (this.cache[key]) {
            return this.cache[key];
        }

        let value;

        // Parse object
        try {
            value = JSON.parse(localStorage.getItem(key)) || defaultValue;
        } catch (e) {
            value = localStorage.getItem(key) || defaultValue;
        }

        // Parse number
        if (!!parseFloat(value)) {
            value = parseFloat(value);
        }

        this.cache[key] = value;

        return value;
    }
}

module.exports = ConfigService;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const HOURS_PER_SECOND = 24;

/**
 * Resets hours, minutes and seconds of a date
 */
Date.prototype.reset = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);

    return this;
};

/**
 * Adds hours to a date
 */
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
};

/**
 * Adds days to a date
 */
Date.prototype.addDays = function (d) {
    this.setDate(this.getDate() + d);
    return this;
};

/**
 * Adds months to a date
 */
Date.prototype.addMonths = function (m) {
    this.setMonth(this.getMonth() + m);
    return this;
};

/**
 * Gets the actual month
 */
Date.prototype.getMonthName = function () {
    const names = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return names[this.getMonth()];
};

/**
 * Gets quarter from a date
 */
Date.prototype.getQuarter = function () {
    let month = this.getMonth() + 1;

    if (month <= 3) {
        return 1;
    }
    if (month <= 6) {
        return 2;
    }
    if (month <= 9) {
        return 3;
    }
    return 4;
};

/**
 * Pretty prints a date
 */
Date.prototype.prettyPrint = function () {
    let string = this.getFullYear() + '-';

    if (this.getMonth() + 1 < 10) {
        string += '0';
    }

    string += this.getMonth() + 1 + '-';

    if (this.getDate() < 10) {
        string += '0';
    }

    string += this.getDate();

    return string;
};

/**
 * A global helper function for wrapping setTimeout in a promise
 *
 * @param {Number} timeout
 *
 * @returns {Promise} Callback
 */
window.wait = timeout => {
    timeout = timeout || 0;
    timeout *= 1000;

    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
};

/**
 * The service for managing time
 */
class TimeService {
    /**
     * Starts the clock
     */
    static startClock() {
        let startDate = new Date();
        startDate.reset();
        startDate.setMonth(0);
        startDate.setDate(1);

        Game.Services.ConfigService.set('time', startDate.getTime());
        Game.Services.ConfigService.set('startTime', startDate.getTime());
    }

    /**
     * Ticks the time
     */
    static tick() {
        let time = this.currentTime;

        time.addHours(HOURS_PER_SECOND);

        Game.Services.ConfigService.set('time', time.getTime());
    }

    /**
     * Adds days to the current time
     *
     * @param {Number} amount
     */
    static addDays(amount) {
        let time = this.currentTime;

        time.addHours(amount * 24);

        Game.Services.ConfigService.set('time', time.getTime());
    }

    /**
     * Gets the start time
     */
    static get startTime() {
        let unix = Game.Services.ConfigService.get('startTime');

        if (!unix) {
            return new Date();
        }

        return new Date(unix);
    }

    /**
     * Gets the current time
     */
    static get currentTime() {
        let unix = Game.Services.ConfigService.get('time');

        if (!unix) {
            return new Date();
        }

        return new Date(unix);
    }

    /**
     * Gets the current year
     */
    static get currentYear() {
        return this.currentTime.getFullYear();
    }

    /**
     * Gets the current month
     */
    static get currentMonth() {
        return this.currentTime.getMonth() + 1;
    }

    /**
     * Gets the current date
     */
    static get currentDate() {
        return this.currentTime.getDate();
    }

    /**
     * Gets the previous quarter
     */
    static get previousQuarter() {
        let quarter = this.currentQuarter - 1;

        if (quarter <= 0) {
            quarter = 4;
        }

        return quarter;
    }

    /**
     * Gets a quarter from a month
     *
     * @param {Number} month
     *
     * @returns {Number} Quarter
     */
    static getQuarterFromMonth(month) {
        if (month > 9) {
            return 4;
        } else if (month > 6) {
            return 3;
        } else if (month > 3) {
            return 2;
        } else {
            return 1;
        }
    }

    /**
     * Gets the current quarter
     */
    static get currentQuarter() {
        return this.getQuarterFromMonth(this.currentTime.getMonth() + 1);
    }
}

module.exports = TimeService;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let autoReloadInterval;

/**
 * A service for debugging
 */
class DebugService {
    /**
     * Sets auto reload on/off
     *
     * @param {Boolean} isActive
     */
    static setAutoReload(isActive) {
        if (!isActive && autoReloadInterval) {
            clearInterval(autoReloadInterval);
        }

        if (isActive && !autoReloadInterval) {
            autoReloadInterval = setInterval(() => {
                if (Game.isPaused) {
                    return;
                }

                this.reloadStyle();
                this.reloadScript();
            }, 500);
        }
    }

    /**
     * Reloads styles
     */
    static reloadStyle() {
        let styleTags = document.querySelectorAll('link');

        if (!styleTags) {
            return;
        }

        for (let i = 0; i < styleTags.length; i++) {
            if (styleTags[i].getAttribute('href').indexOf('css/app.css') === 0) {
                styleTags[i].setAttribute('href', 'css/app.css?' + Date.now());
                return;
            }
        }
    }

    /**
     * Reloads scripts
     */
    static reloadScript() {
        let scriptTags = document.querySelectorAll('script');

        if (!scriptTags) {
            return;
        }

        for (let i = 0; i < scriptTags.length; i++) {
            if (scriptTags[i].getAttribute('src').indexOf('js/app.js') === 0) {
                scriptTags[i].setAttribute('src', 'js/app.js?' + Date.now());
                return;
            }
        }
    }

    /**
     * Resets the game
     */
    static reset() {
        localStorage.clear();

        location.reload();
    }

    /**
     * Pauses the game
     */
    static pause() {
        Game.isPaused = true;
    }

    /**
     * Plays the game
     */
    static play() {
        Game.isPaused = false;
    }
}

module.exports = DebugService;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A general helper service for common actions
 */

class SessionService {
    /**
     * Automatically produces units
     */
    static autoProduceUnits() {
        let machines = Game.Services.ConfigService.get('machines', 0);

        if (machines < 1) {
            return;
        }

        for (let i = 0; i < machines; i++) {
            this.produceUnit();
        }
    }

    /**
     * Produces a unit
     */
    static produceUnit() {
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        if (companyAccount < Game.PRODUCTION_COST) {
            return;
        }

        let inventory = Game.Services.ConfigService.get('inventory', 0);

        Game.Services.ConfigService.set('inventory', inventory + 1);
        Game.Services.ConfigService.set('companyAccount', companyAccount - Game.PRODUCTION_COST);
    }

    /**
     * Buys a machine
     */
    static buyMachine() {
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        if (companyAccount < Game.MACHINE_PRICE) {
            return;
        }

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

        if (amount > 0) {
            amount = Math.round(amount / 12);
        }

        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        if (companyAccount < amount) {
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

        if (!year) {
            return vat;
        }

        if (!vat[year]) {
            vat[year] = {};
        }

        if (!quarter) {
            return vat[year];
        }

        if (!vat[year][quarter]) {
            vat[year][quarter] = { amount: 0, isPaid: false };
        }

        let firstMonth = (quarter - 1) * 3 + 1;
        let lastMonth = firstMonth + 2;

        for (let month = firstMonth; month <= lastMonth; month++) {
            let sales = this.getSales(year, month);
            let cost = this.getCost(year, month);

            let vatSales = sales / 1.25 * 0.25;
            let vatCost = cost / 1.25 * 0.25;

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

        if (vat.isPaid) {
            return;
        }

        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        if (companyAccount < amount) {
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

        if (inventory < 1) {
            return;
        }

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

        if (year && !sales[year]) {
            sales[year] = {};
        }
        if (month && !sales[year][month]) {
            sales[year][month] = 0;
        }

        // Specific month
        if (year && month) {
            result = sales[year][month];

            // Specific year
        } else if (month) {
            for (let m in sales[year]) {
                result += parseFloat(sales[y][m]) || 0;
            }

            // result sales
        } else {
            for (let y in sales) {
                for (let m in sales[y]) {
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
        if (!year) {
            throw new Error('Year is required');
        }
        if (!month) {
            throw new Error('Month is required');
        }

        let sales = Game.Services.ConfigService.get('sales', {});

        if (!year) {
            return sales;
        }

        if (!sales[year]) {
            sales[year] = {};
        }

        if (!month) {
            return sales[year];
        }

        if (!sales[year][month]) {
            sales[year][month] = 0;
        }

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

        if (year && !cost[year]) {
            cost[year] = {};
        }
        if (month && !cost[year][month]) {
            cost[year][month] = 0;
        }

        // Specific month
        if (year && month) {
            result = cost[year][month];

            // Specific year
        } else if (month) {
            for (let m in cost[year]) {
                result += parseFloat(cost[y][m]) || 0;
            }

            // result cost
        } else {
            for (let y in cost) {
                for (let m in cost[y]) {
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
        if (!year) {
            throw new Error('Year is required');
        }
        if (!month) {
            throw new Error('Month is required');
        }

        let cost = Game.Services.ConfigService.get('cost', {});

        if (!year) {
            return cost;
        }

        if (!cost[year]) {
            cost[year] = {};
        }

        if (!month) {
            return cost[year];
        }

        if (!cost[year][month]) {
            cost[year][month] = 0;
        }

        cost[year][month] = amount;

        Game.Services.ConfigService.set('cost', cost);
    }
}

module.exports = SessionService;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base model for everything
 */

class Entity {
    /**
     * Constructor
     *
     * @param {Object} params
     */
    constructor(params) {
        this.structure();

        if (params && params instanceof Object && !Array.isArray(params)) {
            for (let k in params) {
                switch (typeof this[k]) {
                    case 'number':
                        this[k] = parseFloat(params[k] || 0);
                        break;

                    case 'string':
                        this[k] = (params[k] || '').toString();
                        break;

                    default:
                        this[k] = params[k];
                        break;
                }
            }
        }

        Object.seal(this);
    }

    /**
     * Defines the structure of this model
     */
    structure() {}
}

module.exports = Entity;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
        if (!current) {
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

        if (payment.fine > 0) {
            amount += payment.fine;

            alert('A late fee of ' + payment.fine + ' kr. has been added');
        }

        this.company.bankBalance -= amount;
        payment.isPaid = true;
    }
}

module.exports = Player;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const MACHINE_PRICE = 10000;

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
        if (this.inventory < 1) {
            return;
        }

        this.inventory--;

        this.bankBalance += this.unitPrice;
        Game.Models.Player.current.financialRecord.currentReport.sales += this.unitPrice;
    }

    /**
     * Produces a unit
     */
    produceUnit() {
        if (this.bankBalance < this.unitProductionCost) {
            return alert('You do not have enough money to produce more units');
        }

        this.inventory++;

        this.bankBalance -= this.unitProductionCost;
        Game.Models.Player.current.financialRecord.currentReport.productionCost += this.unitProductionCost;
    }

    /**
     * Purchases a machine
     */
    purchaseMachine() {
        if (this.bankBalance < MACHINE_PRICE) {
            return alert('You do not have enough money to purchase more machines');
        }

        this.machines++;

        this.bankBalance -= MACHINE_PRICE;
        Game.Models.Player.current.financialRecord.currentReport.productionCost += MACHINE_PRICE;
    }
}

module.exports = Company;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A monthly report
 */

class Report extends Game.Models.Entity {
  /**
   * Constructor
   */
  constructor(params) {
    super(params);

    this.sales = parseInt(this.sales);
    this.productionCost = parseInt(this.productionCost);
  }

  /**
   * Structure
   */
  structure() {
    this.sales = 0;
    this.productionCost = 0;
  }

  /**
   * Appends another report to this one
   *
   * @param {Report} report
   */
  append(report) {
    this.sales += report.sales;
    this.productionCost += report.productionCost;
  }
}

module.exports = Report;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

        for (let year = firstYear; year <= targetYear; year++) {
            if (!this.payments[year]) {
                this.payments[year] = {};
            }

            let thisFirstQuarter = 1;

            if (year === firstYear) {
                thisFirstQuarter = firstQuarter;
            }

            let thisTargetQuarter = 4;

            if (year === targetYear) {
                thisTargetQuarter = targetQuarter;
            }

            for (let quarter = thisFirstQuarter; quarter <= thisTargetQuarter; quarter++) {
                if ((this.payments[year][quarter] || {}) instanceof Game.Models.VATPayment === false) {
                    this.payments[year][quarter] = new Game.Models.VATPayment(this.payments[year][quarter]);
                }
            }
        }

        return this.payments;
    }
}

module.exports = VATRecord;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A class for keeping track of VAT payments
 */

class VATPayment extends Game.Models.Entity {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        if (this.dueAt) {
            this.dueAt = new Date(this.dueAt);
        } else {
            this.dueAt = Game.Services.TimeService.currentTime;
            this.dueAt.setMonth(this.dueAt.getMonth() + 3);
        }
    }

    /**
     * Structure
     */
    structure() {
        this.isPaid = false;
        this.isReported = false;
        this.dueAt = null;
        this.fine = 0;
        this.amount = 0;
    }

    /**
     * Update fine
     */
    updateFine() {
        if (this.isPaid || !this.dueAt) {
            return;
        }

        let diffDays = Math.ceil((Game.Services.TimeService.currentTime.getTime() - this.dueAt.getTime()) / (1000 * 3600 * 24));

        // 100 kr. per day fine
        this.fine = Math.floor(diffDays * 100);
    }
}

module.exports = VATPayment;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

        for (let year = firstYear; year <= targetYear; year++) {
            if (!this.reports[year]) {
                this.reports[year] = {};
            }

            let thisFirstMonth = 1;
            let thisTargetMonth = 12;

            if (year === firstYear) {
                thisFirstMonth = firstMonth;
            }

            if (year === targetYear) {
                thisTargetMonth = targetMonth;
            }

            for (let month = thisFirstMonth; month <= thisTargetMonth; month++) {
                if (!this.reports[year][month]) {
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

        for (let month = firstMonth; month < targetMonth; month++) {
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The persistent player info widget
 */

class PlayerInfo extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;

        this.notifications = {
            'company': {},
            'personal-account': {}
        };

        this.fetch();

        setInterval(() => {
            if (Game.isPaused) {
                return;
            }

            this._render();
        }, 1000);
    }

    /**
     * Gets the time string
     */
    getTimeString() {
        let time = Game.Services.TimeService.currentTime;
        let timeString = time.getFullYear() + '-';

        if (time.getMonth() + 1 < 10) {
            timeString += '0';
        }

        timeString += time.getMonth() + 1 + '-';

        if (time.getDate() < 10) {
            timeString += '0';
        }

        timeString += time.getDate();

        return timeString;
    }

    /**
     * Updates this view
     */
    static update() {
        let playerInfo = Crisp.View.get(PlayerInfo);

        if (!playerInfo) {
            return;
        }

        playerInfo.fetch();
    }

    /**
     * Gets whether or not this view is expanded
     */
    get isExpanded() {
        let toggle = this.element.querySelector('.widget--player-info__toggle');

        if (!toggle) {
            return false;
        }

        return toggle.checked;
    }

    /**
     * Sets a notification
     *
     * @param {String} area
     * @param {String} title
     * @param {String} description
     * @param {String} buttonLabel
     * @param {Function} onClick
     */
    static notify(area, title, description, buttonLabel, onClick) {
        let playerInfo = Crisp.View.get(PlayerInfo);

        if (!playerInfo) {
            return;
        }

        let key = btoa(title + description);

        playerInfo.notifications[area][key] = {
            title: title,
            description: description,
            buttonLabel: buttonLabel,
            onClick: onClick
        };

        playerInfo._render();
    }

    /**
     * Clears a notification
     *
     * @param {String} area
     * @param {String} key
     */
    static clearNotification(area, key) {
        let playerInfo = Crisp.View.get(PlayerInfo);

        if (!playerInfo) {
            return;
        }

        delete playerInfo.notifications[area][key];

        playerInfo._render();
    }

    /**
     * Gets a notification string
     *
     * @param {String} area
     *
     * @returns {String} Notifications
     */
    getNotificationsString(area) {
        if (Object.keys(this.notifications[area]).length < 1) {
            return '';
        }

        let strings = [];

        for (let key in this.notifications[area]) {
            let notification = this.notifications[area][key];

            strings.push(notification.title + '\n' + notification.description);
        }

        return strings.join('\n\n');
    }

    /**
     * Renders notifications
     *
     * @param {String} area
     *
     * @returns {HTMLElement} Notifications
     */
    renderNotifications(area) {
        return _.ul({ class: 'widget--player-info__area__notifications' }, _.each(this.notifications[area], (key, notification) => {
            return _.li(_.h4(notification.title), _.if(notification.description, notification.description), _.if(notification.onClick, _.button({ class: 'widget widget--button' }, notification.buttonLabel).click(() => {
                notification.onClick(key);
            })));
        }));
    }

    /**
     * Checks if an area has any notifications
     *
     * @param {String} area
     *
     * @param {Boolean} Has notifications
     */
    hasNotifications(area) {
        return Object.keys(this.notifications[area]).length > 0;
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'widget widget--player-info' }, _.input({ type: 'checkbox', class: 'widget widget--player-info__toggle', checked: this.isExpanded }), _.div({ class: 'widget--player-info__area company' }, _.h4({ class: 'widget--player-info__area__heading' }, 'Company'), _.div({ class: 'widget--player-info__area__icon' + (this.hasNotifications('company') ? ' notification' : '') }, '🏭'), _.div({ class: 'widget--player-info__area__preview' }, this.model.company.name + ': ' + this.model.company.bankBalance + ' kr.'), _.div({ class: 'widget--player-info__area__data' }, 'Name: ' + this.model.company.name, '<br>', 'Bank balance: ' + this.model.company.bankBalance + ' kr.', this.renderNotifications('company'))), _.div({ class: 'widget--player-info__area personal-account' }, _.h4({ class: 'widget--player-info__area__heading' }, 'Personal account'), _.div({ class: 'widget--player-info__area__icon' + (this.hasNotifications('personal-account') ? ' notification' : '') }, '💰'), _.div({ class: 'widget--player-info__area__preview' }, this.model.personalAccount + ' kr.'), _.div({ class: 'widget--player-info__area__data' }, 'Balance: ' + this.model.personalAccount + ' kr.', this.renderNotifications('personal-account'))));
    }
}

module.exports = PlayerInfo;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class DebugMenu extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.fetch();
    }

    /**
     * Renders a button
     *
     * @param {String} label
     * @param {Function} onClick
     */
    renderButton(label, onClick) {
        return _.button({ class: 'widget widget--button widget--debug-menu__button' }, label).click(() => {
            onClick();
        });
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'widget widget--debug-menu' }, _.input({ type: 'checkbox', class: 'widget--debug-menu__toggle' }), this.renderButton('Reset', Game.Services.DebugService.reset), this.renderButton('Pause', Game.Services.DebugService.pause), this.renderButton('Play', Game.Services.DebugService.play), this.renderButton('Skip 30 days', () => {
            Game.Services.TimeService.addDays(30);
        }));
    }
}

module.exports = DebugMenu;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A progress bar
 */

class ProgressBar extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.max = this.max || 100;
        this.value = this.value || 0;
        this.message = '';

        this.fetch();

        for (let progressBar of Crisp.View.getAll(ProgressBar)) {
            if (progressBar !== this) {
                progressBar.remove();
            }
        }

        _.append(document.body, this.element);
    }

    /**
     * Sets the progress
     *
     * @param {Number} value
     * @param {Number} max
     * @param {String} message
     */
    setProgress(value, max, message) {
        this.value = value;
        this.max = max;
        this.message = message;

        this.update();
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'widget widget--progress-bar' }, _.progress({ dynamicAttributes: true, class: 'widget--progress-bar__progress', value: this.value, max: this.max }), _.div({ dynamicContent: true, class: 'widget--progress-bar__message' }, this.message));
    }
}

module.exports = ProgressBar;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A modal
 */

class Modal extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.fetch();

        for (let modal of Crisp.View.getAll(Modal)) {
            if (modal === this) {
                continue;
            }

            modal.remove();
        }

        _.append(document.body, this);

        Game.Services.TimeService.isPaused = true;
    }

    /**
     * Renders the header
     */
    renderHeader() {}

    /**
     * Renders the body
     */
    renderBody() {}

    /**
     * Renders the footer
     */
    renderFooter() {}

    /**
     * Closes this modal
     */
    close() {
        this.remove();

        Game.Services.TimeService.isPaused = false;
    }

    /**
     * Gets the class name
     */
    get className() {
        return this.name.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'modal modal--' + this.className + ' ' + (this.size || 'large') }, _.div({ class: 'modal__dialog' }, _.button({ class: 'modal__close widget widget--button' }).click(() => {
            this.close();

            this.trigger('cancel');
        }), _.div({ class: 'modal__header' }, this.renderHeader()), _.div({ class: 'modal__body' }, this.renderBody()), _.div({ class: 'modal__footer' }, this.renderFooter())));
    }
}

module.exports = Modal;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A message modal
 */

class Message extends Game.Views.Modals.Modal {
  /**
   * Constructor
   */
  constructor(params) {
    super(params);
  }

  /**
   * Pre render
   */
  prerender() {
    this.size = this.size || 'small';
  }

  /**
   * Renders the header
   */
  renderHeader() {
    return _.div({ class: 'modal--message__title' }, this.title);
  }

  /**
   * Renders the body
   */
  renderBody() {
    return _.div({ class: 'modal--message__message' }, this.message);
  }

  /**
   * Renders the footer
   */
  renderFooter() {
    return _.button({ class: 'widget widget--button align-right' }, 'OK').click(() => {
      this.close();
    });
  }
}

module.exports = Message;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A modal for transffering funds
 */

class Transfer extends Game.Views.Modals.Modal {
    /**
     * Pre render
     */
    prerender() {
        this.size = this.size || 'small';
        this.amount = 0;
    }

    /**
     * Render header
     */
    renderHeader() {
        return 'Transfer funds';
    }

    /**
     * Render body
     */
    renderBody() {
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        return _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label text-center' }, 0), _.input({ class: 'widget widget--range', type: 'range', min: 0, max: companyAccount }).on('input', e => {
            this.onChangeAmount(e.currentTarget.value);
        }), _.div({ class: 'widget widget--label text-center' }, companyAccount));
    }

    /**
     * Event: Change amount
     *
     * @param {Number} amount
     */
    onChangeAmount(amount) {
        this.amount = parseFloat(amount);

        this.update();
    }

    /**
     * Event: Click transfer
     */
    onClickTransfer() {
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);
        let personalAccount = Game.Services.ConfigService.get('personalAccount', 0);

        if (companyAccount < this.amount) {
            return;
        }

        Game.Services.ConfigService.set('companyAccount', companyAccount - this.amount);
        Game.Services.ConfigService.set('personalAccount', personalAccount + this.amount);

        this.trigger('submit');

        this.close();
    }

    /**
     * Render footer
     */
    renderFooter() {
        return _.button({ dynamicContent: true, class: 'widget widget--button align-right' }, 'Transfer ' + this.amount + ' DKK').click(() => {
            this.onClickTransfer();
        });
    }
}

module.exports = Transfer;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The VAT reporting tool
 */

class VATReportingTool extends Game.Views.Modals.Modal {
  /**
   * Gets the class name
   */
  get className() {
    return 'vat-reporting-tool';
  }

  /**
   * Gets the model
   */
  get model() {
    return Game.Models.Player.current.vatRecord.payments[this.year][this.quarter];
  }

  /**
   * Gets the quarterly report
   */
  getQuarterlyReport() {
    return Game.Models.Player.current.financialRecord.getQuarterlyReport(this.year, this.quarter);
  }

  /**
   * Renders the header
   */
  renderHeader() {
    return _.h1('Report VAT for ' + this.year + ' Q' + this.quarter);
  }

  /**
   * Renders the body
   */
  renderBody() {
    return _.div({ class: this.className + '__calculation' });
  }
}

module.exports = VATReportingTool;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A drawer for information that should be tucked away
 */

class Drawer extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = this.model || {};

        this.fetch();
    }

    /**
     * Gets whether or not this view is expanded
     */
    get isExpanded() {
        let toggle = this.element.querySelector('.drawer__toggle');

        if (!toggle) {
            return false;
        }

        return toggle.checked;
    }

    /**
     * Renders the content of the drawer
     */
    renderContent() {}

    /**
     * Renders the preview of the drawer
     */
    renderPreview() {
        return _.div({ class: 'drawer__preview' }, _.label({ class: 'drawer__preview__label' }, this.name.replace('Drawer', '').replace(/([A-Z])/g, ' $1').trim()));
    }

    /**
     * Updates this drawer (static)
     */
    static update() {
        let drawer = Crisp.View.get(this);

        if (!drawer) {
            return;
        }

        drawer.update();
    }

    /**
     * Renders the toggle
     */
    renderToggle() {
        return _.input({ type: 'checkbox', class: 'drawer__toggle', checked: this.isExpanded });
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'drawer drawer-' + this.name.replace('Drawer', '').replace(/([A-Z])/g, '-$1').trim().toLowerCase() }, this.renderToggle(), this.renderPreview(), this.renderContent());
    }
}

module.exports = Drawer;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The pervasive timeline
 */

class Timeline extends Game.Views.Drawers.Drawer {
    /**
     * Gets the notification for a date
     *
     * @param {Date} date
     *
     * @returns {Object} Notification
     */
    getNotification(date) {
        // Pay VAT due date
        if (date.getDate() === 1 && ( // The first day of...
        date.getMonth() === 2 || // ...march or...
        date.getMonth() === 5 || // ...june or...
        date.getMonth() === 8 || // ...september or...
        date.getMonth() === 11 // ...december
        )) {
            return {
                type: 'alert',
                title: 'VAT due',
                isSilent: true
            };
        }

        // Able to pay VAT
        if (date.getDate() === 24 && ( // The 24th day of...
        date.getMonth() === 1 || // ...february or...
        date.getMonth() === 4 || // ...may or...
        date.getMonth() === 7 || // ...august or...
        date.getMonth() === 10 // ...november
        )) {
            let expiresOn = new Date(date).addMonths(1);
            expiresOn.setDate(1);

            return {
                type: 'warning',
                title: 'Pay VAT',
                message: 'VAT payment can be made, and is due on ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Pay VAT (' + Game.Services.SessionService.getVat(date.getFullYear(), date.getQuarter()).amount + ' DKK)',
                    onClick: 'onClickPayVAT'
                }
            };
        }

        // Report VAT
        if (date.getDate() === 4 && ( // The first day of...
        date.getMonth() === 0 || // ...january or...
        date.getMonth() === 3 || // ...april or...
        date.getMonth() === 6 || // ...july or...
        date.getMonth() === 9 // ...october
        )) {
            let expiresOn = new Date(date).addMonths(1);
            expiresOn.setDate(24);

            return {
                type: 'warning',
                title: 'Report VAT',
                message: 'VAT can be reported, and payment can be made starting ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Report VAT',
                    onClick: 'onClickReportVAT'
                }
            };
        }

        // Able to pay B tax
        if (date.getDate() === 1) {
            let expiresOn = new Date(date);
            expiresOn.setDate(22);

            return {
                type: 'warning',
                title: 'Pay B tax',
                message: 'B tax payment can be made, and is due on ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Pay B tax (' + Math.round(Game.Services.ConfigService.get('btax', 0) / 12) + ' DKK)',
                    onClick: 'onClickPayBTax'
                }
            };
        }

        // B tax payment due
        if (date.getDate() === 22) {
            return {
                type: 'alert',
                title: 'B tax due',
                isSilent: true
            };
        }
    }

    /**
     * Event: Click notification
     *
     * @param {Object} notification
     */
    onClickNotification(notification) {
        alert(notification.message);
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.update();
    }

    /**
     * Renders the toggle
     */
    renderToggle() {
        return null;
    }

    /**
     * Renders the preview
     */
    renderPreview() {
        let date = Game.Services.TimeService.currentTime;

        return _.div({ dynamicContent: true, class: 'drawer__preview drawer--timeline__scroller' }, _.div({ class: 'drawer--timeline__scroller__year' }, date.getFullYear()), _.div({ class: 'drawer--timeline__scroller__month' }, date.getMonthName()), _.div({ class: 'drawer--timeline__scroller__days' }, _.loop(30, day => {
            let currentDate = new Date(date);

            currentDate.addDays(day);
            currentDate.reset();

            let notification = this.getNotification(currentDate);

            if (notification && day === 0 && !notification.isSilent) {
                Game.Views.Drawers.Notifications.set(notification);
            }

            return _.div({ class: 'drawer--timeline__scroller__day ' + (currentDate.getDate() % 2 === 0 ? 'even' : 'odd') }, _.if(currentDate.getDate() === 1 && day > 0, _.div({ class: 'drawer--timeline__scroller__day__month' }, currentDate.getMonthName())), _.div({ class: 'drawer--timeline__scroller__day__number', 'data-number': currentDate.getDate() }, currentDate.getDate()), _.do(() => {
                if (!notification) {
                    return;
                }

                return _.div({ class: 'drawer--timeline__scroller__day__notification ' + (notification.type || '') }, notification.title);
            }));
        })));
    }

    /**
     * Renders the main content
     */
    renderContent() {
        return _.div({ class: 'drawer__content drawer--timeline__days' });
    }
}

module.exports = Timeline;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Player statistics
 */

class Stats extends Game.Views.Drawers.Drawer {
    /**
     * Renders the toggle
     */
    renderToggle() {
        return null;
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.update();
    }

    /**
     * Renders the preview
     */
    renderPreview() {
        return _.div({ class: 'drawer__preview drawer--stats__preview' }, _.div({ class: 'drawer--stats__preview__company' }, _.div({ dynamicContent: true, class: 'widget widget--label text-center' }, 'Company account: ' + Game.Services.ConfigService.get('companyAccount', 0) + ' DKK')), _.div({ class: 'drawer--stats__preview__transactions' }, _.button({ class: 'widget widget--button align-center' }, 'Transfer ➜').click(() => {
            new Game.Views.Modals.Transfer();
        })), _.div({ class: 'drawer--stats__preview__personal' }, _.div({ dynamicContent: true, class: 'widget widget--label text-center' }, 'Personal account: ' + Game.Services.ConfigService.get('personalAccount', 0) + ' DKK')));
    }
}

module.exports = Stats;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Notification drawer
 */

class Notifications extends Game.Views.Drawers.Drawer {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Services.ConfigService.get('notifications') || {};

        for (let key in this.model) {
            let entry = this.model[key];

            if (entry.createdOn) {
                entry.createdOn = new Date(entry.createdOn);
            }

            if (entry.expiresOn) {
                entry.expiresOn = new Date(entry.expiresOn);
            }
        }

        this.fetch();
    }

    /**
     * Sets a notification
     *
     * @param {Object} notification
     */
    static set(notification) {
        let instance = Crisp.View.get(Notifications);

        if (!instance) {
            return;
        }

        notification.createdOn = Game.Services.TimeService.currentTime;

        let key = notification.createdOn.getTime().toString();

        instance.model[key] = notification;

        instance.save();

        instance.fetch();
    }

    /**
     * Save changes
     */
    save() {
        Game.Services.ConfigService.set('notifications', this.model);
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.update();
    }

    /**
     * Renders the preview
     */
    renderPreview() {
        let currentDate = Game.Services.TimeService.currentTime;

        return _.div({ dynamicChildren: true, class: 'drawer__preview drawer--notifications__entries' }, _.each(this.model, (key, notification) => {
            return _.div({ class: 'drawer--notifications__entry' }, _.do(() => {
                if (!notification.expiresOn) {
                    return;
                }

                let percent = (currentDate.getTime() - notification.createdOn.getTime()) / (notification.expiresOn.getTime() - notification.createdOn.getTime()) * 100;

                if (percent >= 100) {
                    notification.isExpired = true;
                    percent = 100;
                }

                return _.div({ dynamicAttributes: true, class: 'drawer--notifications__entry__progress', style: 'width: ' + percent + '%' });
            }), _.if(notification.title, _.div({ class: 'drawer--notifications__entry__title' }, notification.title)), _.if(notification.message, _.div({ class: 'drawer--notifications__entry__message' }, notification.message)), _.do(() => {
                if (!notification.action) {
                    return;
                }

                return _.button({ dynamicAttributes: true, class: 'drawer--notifications__entry__action widget widget--button ' + (notification.isExpired ? 'alert' : notification.type || '') }, notification.action.label).click(e => {
                    if (typeof this[notification.action.onClick] !== 'function') {
                        return;
                    }

                    this[notification.action.onClick](notification).then(message => {
                        e.currentTarget.parentElement.classList.toggle('out', true);

                        setTimeout(() => {
                            delete this.model[key];
                            this.save();
                        }, 500);

                        if (message) {
                            new Game.Views.Modals.Message({
                                title: 'Success',
                                message: message
                            });
                        }
                    }).catch(e => {
                        new Game.Views.Modals.Message({
                            title: 'Error',
                            message: e.message
                        });
                    });
                });
            }));
        }));
    }

    /**
     * Renders the toggle
     */
    renderToggle() {
        return null;
    }

    /**
     * Event: Click pay B tax
     *
     * @param {Object} notification
     */
    onClickPayBTax(notification) {
        return Game.Services.SessionService.payBTax(notification.createdOn);
    }

    /**
     * Event: Click pay VAT
     *
     * @param {Object} notification
     */
    onClickPayVAT(notification) {
        return Game.Services.SessionService.payVat(notification.createdOn);
    }

    /**
     * Event: Click report VAT
     *
     * @param {Object} notification
     */
    onClickReportVAT(notification) {
        return Game.Services.SessionService.reportVat(notification.createdOn);
    }
}

module.exports = Notifications;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A flexible pie chart
 */

class PieChart extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = this.model || {};

        this.fetch();
    }

    /**
     * Gets a coordinate based on percent
     *
     * @param {Number} percent
     *
     * @param {Object} Coordinate
     */
    getCoordinate(percent) {
        return {
            x: Math.cos(2 * Math.PI * percent),
            y: Math.sin(2 * Math.PI * percent)
        };
    }

    /**
     * Sets translation
     *
     * @param {Number} x
     * @param {Number} y
     */
    setTranslation(x, y) {
        x = x || 0;
        y = y || 0;

        this.element.setAttribute('transform', 'translate(' + x + ', ' + y + ')');
    }

    /**
     * Gets the mean of a list of numbers
     *
     * @param {Array} numbers
     *
     * @returns {Number} Mean
     */
    getMean(...numbers) {
        let mean = 0;

        for (let number of numbers) {
            mean += number;
        }

        mean /= numbers.length;

        return mean;
    }

    /**
     * Interpolates between 2 values
     *
     * @param {Number} value1
     * @param {Number} value2
     * @param {Number} amount
     */
    static lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;

        return value1 + (value2 - value1) * amount;
    }

    /**
     * Sets the percentage and colour of a slice
     *
     * @param {String} name
     * @param {Number} duration
     * @param {Object} slice
     */
    setSlice(name, duration, slice) {
        if (!this.model[name]) {
            this.model[name] = {
                percent: 0,
                value: 0,
                color: 'transparent'
            };
        }

        let startPercent = this.model[name].percent;
        let startColor = this.model[name].color || slice.color;
        let startValue = this.model[name].value || slice.value;

        this.model[name].percent = startPercent;
        this.model[name].color = startColor;
        this.model[name].value = startValue;

        duration = duration || 0;

        let amount = 0;
        let time = Date.now();

        if (duration <= 0) {
            this.model[name].percent = slice.percent;
            this.model[name].color = slice.color;
            this.model[name].value = slice.value;

            _.replace(this.svg, this.renderSlices());
            return;
        }

        let tick = () => {
            let delta = (Date.now() - time) / 1000;
            amount += delta / duration;

            time = Date.now();

            this.model[name].percent = PieChart.lerp(startPercent, slice.percent, amount);
            this.model[name].value = PieChart.lerp(startValue, slice.value, amount);

            _.replace(this.svg, this.renderSlices());
            _.replace(this.labels, this.renderLabels());

            if (amount >= 1) {
                return;
            }

            requestAnimationFrame(() => {
                tick();
            });
        };

        requestAnimationFrame(() => {
            tick();
        });
    }

    /**
     * Renders the slices
     *
     * @returns {Array} Slices
     */
    renderSlices() {
        let percent = 0;
        let sliceIndex = 0;

        return _.each(this.model, (name, slice) => {
            let start = this.getCoordinate(percent);

            percent += slice.percent;

            let end = this.getCoordinate(percent);

            let largeArc = slice.percent > 0.5 ? 1 : 0;

            let pathData = 'M ' + start.x + ' ' + start.y + ' ' + 'A 1 1 0 ' + largeArc + ' 1 ' + end.x + ' ' + end.y + 'L 0 0';

            sliceIndex++;

            return _.path({ d: pathData, fill: slice.color, 'data-percent': slice.percent, 'data-name': name });
        });
    }

    /**
     * Renders the labels
     *
     * @returns {Array} Array of labels
     */
    renderLabels() {
        return _.each(this.model, (name, slice) => {
            if (!slice.label) {
                return;
            }

            return _.label({ class: 'widget widget--label pie-chart__label', style: 'border-left: 2em solid ' + slice.color }, _.if(slice.showPercentage, _.span({ class: 'pie-chart__label__percent' }, Math.round(slice.percent * 100) + '%')), slice.label + ' (' + Math.round(slice.value) + 'kr.)');
        });
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'pie-chart ' + (this.className || '') }, this.svg = _.svg({ class: 'pie-chart__svg', viewBox: '-1 -1 2 2' }, this.renderSlices()), this.labels = _.div({ class: 'pie-chart__labels' }, this.renderLabels()));
    }
}

module.exports = PieChart;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class CoinStack extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.currentAmount = this.amount;
        this.coinHeight = this.coinHeight || 10;
        this.label = this.label || '';
        this.color = this.color || '#000000';

        this.fetch();
    }

    /**
     * Transfers an amount from one stack to another
     *
     * @param {CoinStack} from
     * @param {CoinStack} to
     * @param {Number} amount
     */
    static transfer(from, to, amount) {
        if (from.amount < amount) {
            throw new Error('The coin stack does not have enough coins to transfer ' + amount + ' coins');
        }

        from.amount -= amount;

        setTimeout(() => {
            to.amount += amount;
        }, 500);
    }

    /**
     * Gets the stack element
     *
     * @returns {HTMLElement} Stack element
     */
    get stackElement() {
        return this.element.querySelector('.coin-stack__stack');
    }

    /**
     * Updates the stack height
     */
    update() {
        if (this.amount > this.currentAmount) {
            this.currentAmount++;

            let targetAmount = this.currentAmount;

            let coin = _.div({ class: 'coin-stack__coin in', style: 'bottom: ' + (this.currentAmount - 1) * this.coinHeight + 'px' });

            setTimeout(() => {
                this.update();
            }, 50);

            setTimeout(() => {
                this.stackElement.setAttribute('style', this.getAmountStyle(targetAmount));
                coin.remove();
            }, 400);

            _.append(this.stackElement, coin);
        } else if (this.amount < this.currentAmount) {
            this.currentAmount--;

            let targetAmount = this.currentAmount;

            this.stackElement.setAttribute('style', this.getAmountStyle(targetAmount));

            let coin = _.div({ class: 'coin-stack__coin out', style: 'bottom: ' + this.currentAmount * this.coinHeight + 'px' });

            setTimeout(() => {
                this.update();
            }, 50);

            setTimeout(() => {
                coin.remove();
            }, 400);

            _.append(this.stackElement, coin);
        }
    }

    /**
     * Sets the coin amount
     *
     * @param {Number} amount
     */
    set amount(amount) {
        if (amount < 0) {
            amount = 0;
        }

        amount = Math.round(amount);

        this._amount = amount;

        this.update();
    }

    /**
     * Gets the coin amount
     *
     * @returns {Number} Amount
     */
    get amount() {
        return this._amount || 0;
    }

    /**
     * Gets the amount style
     *
     * @param {Number} amount
     *
     * @returns {String} Amount style
     */
    getAmountStyle(amount) {
        return 'height: calc(' + (amount || this.amount) + ' * ' + this.coinHeight + 'px);';
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'coin-stack' }, _.div({ class: 'coin-stack__stack', style: this.getAmountStyle() }), _.div({ class: 'coin-stack__label', style: 'color: ' + this.color }, this.label));
    }
}

module.exports = CoinStack;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Setup extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = {
            name: 'My Company Aps',
            total: 7500,
            capital: 5000
        };

        this.fetch();
    }

    /**
     * Updates the pie chart
     */
    updatePieChart() {
        if (!this.pieChart) {
            return;
        }

        this.pieChart.setSlice('account', 0.33, {
            percent: 1 - this.model.capital / this.model.total,
            value: this.model.total - this.model.capital
        });

        this.pieChart.setSlice('capital', 0.33, {
            percent: this.model.capital / this.model.total,
            value: this.model.capital
        });
    }

    /**
     * Event: Change name
     *
     * @param {InputEvent} e
     */
    onChangeName(e) {
        this.model.name = e.currentTarget.value;
    }

    /**
     * Event: Change capital
     *
     * @param {InputEvent} e
     */
    onChangeCapital(e) {
        let value = parseInt(e.currentTarget.value);

        if (value < 0) {
            e.currentTarget.value = 0;
        }

        if (value > this.model.account) {
            e.currentTarget.value = this.model.account;
        }

        this.model.capital = e.currentTarget.value;

        this.updatePieChart();
    }

    /**
     * Event: Click next
     *
     * @param {InputEvent} e
     */
    onClickNext(e) {
        // We clear localStorage this point to make sure we start with a clean slate
        localStorage.clear();

        Game.Services.ConfigService.set('personalAccount', this.model.total - this.model.capital);
        Game.Services.ConfigService.set('companyAccount', this.model.capital);
        Game.Services.ConfigService.set('companyName', this.model.name);

        Crisp.Router.go('/b-tax-estimation');
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'page page--setup' }, _.h1({ class: 'page__title' }, 'Setup'), _.div({ class: 'page--setup__input' }, _.div({ class: 'widget-group align-center' }, _.label({ class: 'widget widget--label' }, 'Company name'), _.input({ class: 'widget widget--input', type: 'text', name: 'name', placeholder: 'E.g. "My Company ApS"', value: this.model.name }).on('input', e => {
            this.onChangeName(e);
        })), _.div({ class: 'widget-group align-center' }, _.label({ class: 'widget widget--label' }, 'Capital'), _.input({ class: 'widget widget--input', type: 'number', min: 0, max: this.model.account, step: 1000, name: 'capital', placeholder: 'E.g. 3000', value: this.model.capital }).on('input', e => {
            this.onChangeCapital(e);
        }))), this.pieChart = new Game.Views.Charts.PieChart({
            className: 'page--setup__pie-chart',
            model: {
                account: { percent: 1 - this.model.capital / this.model.total, label: 'Personal account', value: this.model.total - this.model.capital, color: 'green' },
                capital: { percent: this.model.capital / this.model.total, label: 'Capital', value: this.model.capital, color: 'blue' },
                total: { percent: 1, label: 'Total funds', color: 'transparent', value: this.model.total }
            }
        }), _.button({ class: 'widget widget--button align-right' }, 'Next').click(e => {
            this.onClickNext(e);
        }));
    }
}

module.exports = Setup;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The B tax estimation page
 */

class BTaxEstimation extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = {
            income: 96000,
            btax: 0
        };

        this.fetch();
    }

    /**
     * Event: Change income
     *
     * @param {InputEvent} e
     */
    onChangeIncome(e) {
        let value = parseInt(e.currentTarget.value);

        if (value < 0) {
            e.currentTarget.value = 0;
        }

        this.model.income = parseInt(e.currentTarget.value);
        this.model.btax = 0;
        this.finalBTax.innerHTML = '';

        this.updatePieChart();
    }

    /**
     * Updates the pie chart
     */
    updatePieChart() {
        if (!this.pieChart) {
            return;
        }

        this.pieChart.setSlice('btax', 0.33, {
            percent: this.model.btax / this.model.income,
            value: this.model.btax
        });

        this.pieChart.setSlice('income', 0.33, {
            percent: 1 - this.model.btax / this.model.income,
            value: this.model.income
        });
    }

    /**
     * Event: Click calculate
     *
     * @param {InputEvent} e
     */
    onClickCalculate(e) {
        let progressBar = new Game.Views.Widgets.ProgressBar();
        let progress = 0;
        let max = 38;

        progress += 0.8;
        progressBar.setProgress(progress, max, 'Church tax...');

        wait(1).then(() => {
            progress += 2.8;
            progressBar.setProgress(progress, max, 'State tax...');

            return wait(0.9);
        }).then(() => {
            progress += 5;
            progressBar.setProgress(progress, max, 'Health contributions...');

            return wait(0.85);
        }).then(() => {
            progress += 23.8;
            progressBar.setProgress(progress, max, 'Municipal tax...');

            return wait(1);
        }).then(() => {
            progress += 2.8;
            progressBar.setProgress(progress, max, 'Labour market contribution...');

            return wait(0.4);
        }).then(() => {
            progress += 2.8;
            progressBar.setProgress(progress, max, 'ATP contribution...');

            return wait(2);
        }).then(() => {
            this.model.btax = this.model.income * 0.38;

            progressBar.remove();

            this.updatePieChart();

            this.finalBTax.innerHTML = this.model.btax + ' / 12 = <span>' + Math.round(this.model.btax / 12) + 'kr. per month</span>';
        });
    }

    /**
     * Event: Click done
     *
     * @param {InputEvent} e
     */
    onClickDone(e) {
        if (this.model.btax <= 0) {
            return alert('Please calculate your B tax first');
        }

        // Save the estimated income
        Game.Services.ConfigService.set('estimatedIncome', this.model.income);

        // Save the B tax estimate
        Game.Services.ConfigService.set('btax', this.model.btax);

        // Check if setup is complete
        if (!Game.Services.ConfigService.set('completedSetup')) {
            Game.Services.ConfigService.set('completedSetup', true);
            Game.Services.TimeService.startClock();
        }

        location.hash = '/session';
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'page page--b-tax-estimation' }, _.h1({ class: 'page__title' }, 'B tax estimation for ' + Game.Services.TimeService.currentYear), _.div({ class: 'page--b-tax-estimation__input' }, _.div({ class: 'widget-group align-center' }, _.label({ class: 'widget widget--label' }, 'Target income for ' + Game.Services.TimeService.currentYear), _.input({ class: 'widget widget--input', type: 'number', step: 1000, min: 0, value: this.model.income }).on('input', e => {
            this.onChangeIncome(e);
        })), _.button({ class: 'widget widget--button align-center' }, 'Calculate B tax').click(e => {
            this.onClickCalculate(e);
        })), this.pieChart = new Game.Views.Charts.PieChart({
            className: 'page--b-tax-estimation__pie-chart',
            showPercentage: true,
            model: {
                btax: { showPercentage: true, percent: this.model.btax / this.model.income, label: 'B tax', value: this.model.btax, color: 'blue' },
                income: { percent: 1 - this.model.btax / this.model.income, label: 'Target income', color: 'green', value: this.model.income }
            }
        }), this.finalBTax = _.div({ class: 'page--b-tax-estimation__final' }), _.button({ class: 'widget widget--button align-right' }, 'Done').click(e => {
            this.onClickDone(e);
        }));
    }
}

module.exports = BTaxEstimation;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Session extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;

        this.stats = new Game.Views.Drawers.Stats();
        this.notifications = new Game.Views.Drawers.Notifications();
        this.timeline = new Game.Views.Drawers.Timeline();
        this.coinStack = new Game.Views.Charts.CoinStack({
            amount: Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000)
        });

        this.fetch();

        setInterval(() => {
            if (Game.isPaused) {
                return;
            }

            this.heartbeat();
        }, 1000);
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.element.classList.toggle('paused', !document.hasFocus());

        if (!document.hasFocus() || Game.Services.TimeService.isPaused) {
            return;
        }

        // Tick time 
        Game.Services.TimeService.tick();

        this.timeline.heartbeat();
        this.notifications.heartbeat();
        this.stats.heartbeat();

        // Update coin stack
        let stackAmount = Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000);

        if (stackAmount !== this.coinStack.amount) {
            this.coinStack.amount = stackAmount;
        }

        // Sell one unit every second
        Game.Services.SessionService.sellUnit();

        // Automatically produce units
        Game.Services.SessionService.autoProduceUnits();

        // Update the view
        this.update();
    }

    /**
     * Event: Changed unit price
     *
     * @param {Number} price
     */
    onChangeUnitPrice(price) {
        Game.Services.SessionService.setUnitPrice(price);

        this.update();
    }

    /*
     * Event: Click buy machine
     */
    onClickBuyMachine() {
        Game.Services.SessionService.buyMachine();

        this.update();
    }

    /*
     * Event: Click produce
     */
    onClickProduce() {
        Game.Services.SessionService.produceUnit();

        this.update();
    }

    /**
     * Template
     */
    template() {
        let year = Game.Services.TimeService.currentYear;
        let month = Game.Services.TimeService.currentMonth;

        return _.div({ class: 'page page--session' }, _.div({ class: 'page--session__user-input' }, _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Unit price'), _.input({ class: 'widget widget--input text-center', type: 'number', value: Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE) }).on('input', e => {
            this.onChangeUnitPrice(e.currentTarget.value);
        }), _.div({ dynamicContent: true, class: 'widget widget--label text-right vat' }, Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE) * 1.25 + ' DKK')), _.div({ class: 'widget-group' }, _.div({ dynamicContent: true, class: 'widget widget--label' }, 'Machines: ' + Game.Services.ConfigService.get('machines', 0)), _.button({ class: 'widget widget--button' }, 'Buy machine (' + Game.MACHINE_PRICE + ' DKK)').click(e => {
            this.onClickBuyMachine();
        }), _.div({ class: 'widget widget--label text-right vat' }, Game.MACHINE_PRICE * 1.25 + ' DKK')), _.div({ class: 'widget-group' }, _.div({ dynamicContent: true, class: 'widget widget--label' }, 'Inventory: ' + Game.Services.ConfigService.get('inventory', 0)), _.button({ class: 'widget widget--button' }, 'Produce (' + Game.PRODUCTION_COST + ' DKK)').click(e => {
            this.onClickProduce();
        }), _.div({ class: 'widget widget--label text-right vat' }, Game.PRODUCTION_COST * 1.25 + ' DKK')), _.div({ class: 'widget-group' }, _.div({ class: 'class: widget widget--label' }, 'Sales this year (estimated ' + Game.Services.ConfigService.get('estimatedIncome', 0).toString() + '):'), _.div({ dynamicContent: true, class: 'class: widget widget--label' }, Game.Services.SessionService.getSales(year).toString())), _.div({ class: 'widget-group' }, _.div({ class: 'class: widget widget--label' }, 'Cost this year:'), _.div({ dynamicContent: true, class: 'class: widget widget--label' }, Game.Services.SessionService.getCost(year).toString()))), this.stats.element, this.notifications.element, this.timeline.element, this.coinStack.element);
    }
}

module.exports = Session;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The view controller
 */

class ViewController {
    /**
     * Initialise routes
     */
    static init() {
        Crisp.Router.route('/', this.index);
        Crisp.Router.route('/b-tax-estimation', this.btax);
        Crisp.Router.route('/session', this.session);

        Crisp.Router.init();
    }

    /**
     * Index
     */
    static index() {
        _.replace(document.body, new Game.Views.Pages.Setup());
    }

    /**
     * B tax
     */
    static btax() {
        _.replace(document.body, new Game.Views.Pages.BTaxEstimation());
    }

    /**
     * Session
     */
    static session() {
        _.replace(document.body, new Game.Views.Pages.Session());
    }
}

ViewController.init();

module.exports = ViewController;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map