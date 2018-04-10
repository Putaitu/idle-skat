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
    MACHINE_PRICE: 5000,
    MACHINE_CAPACITY: 1,
    MACHINE_PERSONAL_ACCOUNT_MINIMUM: 7500,
    PRODUCTION_COST: 10,
    DEFAULT_UNIT_PRICE: 20,
    OVERDRAFT_PERSONAL_ACCOUNT_MINIMUM: 10000,
    OVERDRAFT_AMOUNT: 3000,
    PRICING_PERSONAL_ACCOUNT_MINIMUM: 5000
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
Game.Views.Modals.FinancialReportingTool = __webpack_require__(20);

Game.Views.Drawers = {};
Game.Views.Drawers.Drawer = __webpack_require__(21);
Game.Views.Drawers.Timeline = __webpack_require__(22);
Game.Views.Drawers.QuestLog = __webpack_require__(23);
Game.Views.Drawers.Stats = __webpack_require__(24);
Game.Views.Drawers.Notifications = __webpack_require__(25);
Game.Views.Drawers.Controls = __webpack_require__(26);

Game.Views.Charts = {};
Game.Views.Charts.PieChart = __webpack_require__(27);
Game.Views.Charts.CoinStack = __webpack_require__(28);

Game.Views.Pages = {};
Game.Views.Pages.Setup = __webpack_require__(29);
Game.Views.Pages.BTaxEstimation = __webpack_require__(30);
Game.Views.Pages.Session = __webpack_require__(31);

// -------------------
// Controllers
// -------------------
Game.Controllers = {};
Game.Controllers.ViewController = __webpack_require__(32);

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
            value = Math.round(value * 100) / 100;
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
            value = Math.round(value * 100) / 100;
        }

        this.cache[key] = value;

        return value;
    }

    /**
     * Applies a test year
     */
    static applyTestYear() {
        this.set('btax', { "2018": { "1": { "isPaid": true, "amount": 950 }, "2": { "isPaid": true, "amount": 950 }, "3": { "isPaid": true, "amount": 950 }, "4": { "isPaid": true, "amount": 950 }, "5": { "isPaid": true, "amount": 950 }, "6": { "isPaid": true, "amount": 950 }, "7": { "isPaid": true, "amount": 950 }, "8": { "isPaid": true, "amount": 950 }, "9": { "isPaid": true, "amount": 950 }, "10": { "isPaid": true, "amount": 950 }, "11": { "isPaid": true, "amount": 950 }, "12": { "isPaid": true, "amount": 950 } }, "2019": { "1": { "isPaid": false, "amount": 950 }, "2": { "isPaid": false, "amount": 950 } } });
        this.set('cost', { "2018": { "1": 1273.5, "2": 1104.5, "3": 844.5, "4": 1013.5, "5": 1234.5, "6": 1182.5, "7": 805.5, "8": 779.5, "9": 740.5, "10": 779.5, "11": 610.5, "12": 701.5 } });
        this.set('sales', { "2018": { "1": 2462.5, "2": 3500, "3": 3687.5, "4": 2925, "5": 3562.5, "6": 3512.5, "7": 3875, "8": 3750, "9": 3562.5, "10": 3750, "11": 2937.5, "12": 3375 } });
        this.set('vat', { "2018": { "1": { "amount": 1285.2, "isPaid": false, "isReported": true }, "2": { "amount": 1313.6, "isPaid": false, "isReported": true }, "3": { "amount": 1772.1, "isPaid": false, "isReported": true } } });

        let time = new Date(this.get('startTime'));

        time.setMonth(11);
        time.setDate(31);

        this.set('time', time.getTime());

        location.reload();
    }
}

module.exports = ConfigService;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
 * Adds years to a date
 */
Date.prototype.addYears = function (y) {
    this.setYear(this.getFullYear() + y);
    return this;
};

/**
 * Gets the actual month
 */
Date.prototype.getMonthName = function () {
    const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
     * Sets paused time
     *
     * @param {Boolean} isPaused
     */
    static set isPaused(isPaused) {
        this._isPaused = isPaused;
    }

    /**
     * Gets paused time
     *
     * @returns {Boolean} Is paused
     */
    static get isPaused() {
        return !!document.querySelector('.modal') || !!this._isPaused;
    }

    /**
     * Ticks the time
     */
    static tick() {
        let time = this.currentTime;

        time.addHours(this.hoursPerSecond);

        this.isNewDay = this.lastDate !== time.getDate();

        this.lastDate = time.getDate();

        Game.Services.ConfigService.set('time', time.getTime());
    }

    /**
     * Gets hours per second
     *
     * @returns {Number} Hours per second
     */
    static get hoursPerSecond() {
        return 6 * (this.speed || 1);
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
     * Sets the current time
     */
    static set currentTime(time) {
        Game.Services.ConfigService.set('time', time.getTime());
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

    /**
     * Goes to the next year
     */
    static goToNextYear() {
        let time = this.currentTime;

        time.setYear(time.getFullYear() + 1);
        time.setMonth(0);
        time.setDate(1);

        this.currentTime = time;
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

        if (!this.isQuestComplete('Overdraft') && companyAccount < amount) {
            return false;
        }
        if (this.isQuestComplete('Overdraft') && companyAccount + Game.OVERDRAFT_AMOUNT < amount) {
            return false;
        }

        return true;
    }

    /**
     * Produces a unit
     */
    static produceUnit() {
        if (!this.canAfford(Game.PRODUCTION_COST)) {
            return;
        }

        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);
        let inventory = Game.Services.ConfigService.get('inventory', 0);

        Game.Services.ConfigService.set('inventory', inventory + 1);
        Game.Services.ConfigService.set('companyAccount', companyAccount - Game.PRODUCTION_COST);
    }

    /**
     * Gets the current machine price
     *
     * @returns {Number} Current machine price
     */
    static getCurrentMachinePrice() {
        let machines = Game.Services.ConfigService.get('machines', 0);
        let price = Game.MACHINE_PRICE;

        if (machines > 0) {
            price += Game.MACHINE_PRICE * 0.5 * machines;
        }

        return price;
    }

    /**
     * Buys a machine
     */
    static buyMachine() {
        let machines = Game.Services.ConfigService.get('machines', 0);
        let price = this.getCurrentMachinePrice();

        if (!this.canAfford(price)) {
            return;
        }

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

        if (quarter < 1) {
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

        if (!btax[year]) {
            btax[year] = {};
        }
        if (!btax[year][month]) {
            btax[year][month] = { isPaid: false, amount: Math.round(Game.Services.ConfigService.get('btaxAmount', 0) / 12) };
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

        if (!btax[year]) {
            btax[year] = {};
        }

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

        if (btax.isPaid) {
            return Promise.reject(new Error('You\'ve already paid B tax for ' + date.getMonthName() + ' ' + date.getFullYear()));
        }

        let amount = Game.Services.ConfigService.get('btaxAmount', 0);

        if (amount > 0) {
            amount = Math.round(amount / 12);
        }

        if (!this.canAfford(amount)) {
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
            vat[year][quarter] = { amount: 0, isPaid: false, isReported: false };
        }

        vat[year][quarter].amount = 0;

        let firstMonth = (quarter - 1) * 3 + 1;
        let lastMonth = firstMonth + 2;

        for (let month = firstMonth; month <= lastMonth; month++) {
            let sales = this.getSales(year, month);
            let cost = this.getCost(year, month);

            let vatSales = sales / 1.25 * 0.25;
            let vatCost = cost / 1.25 * 0.25;

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
        if (!year) {
            throw new Error('Year is required');
        }
        if (!quarter) {
            throw new Error('Quarter is required');
        }

        let vat = Game.Services.ConfigService.get('vat', {});

        if (!vat[year]) {
            vat[year] = {};
        }
        if (!vat[year][quarter]) {
            vat[year][quarter] = {};
        }

        if (isReported !== undefined) {
            vat[year][quarter].isReported = isReported;
        }

        if (isPaid !== undefined) {
            vat[year][quarter].isPaid = isPaid;
        }

        if (amount !== undefined) {
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

        let isFirstTime = !Game.Services.ConfigService.get('hasPaidVAT');

        if (quarter < 1) {
            quarter = 4;
            year--;
        }

        let vat = this.getVat(year, quarter);

        if (vat.isPaid) {
            return;
        }

        if (!this.canAfford(vat.amount)) {
            return Promise.reject('You don\'t have enough money in your company account to pay VAT');
        }

        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        Game.Services.ConfigService.set('companyAccount', companyAccount - vat.amount);

        Game.Services.ConfigService.set('hasPaidVAT', true);

        return new Promise((resolve, reject) => {
            if (!isFirstTime) {
                return resolve();
            }

            let modal = new Game.Views.Modals.Message({
                title: 'Time',
                canSubmit: false,
                canCancel: false,
                message: 'Try to speed time up a bit!',
                focus: {
                    element: '.drawer--timeline__controls',
                    side: 'top',
                    align: 'left'
                }
            });

            let ffwdx2 = document.querySelector('button[title="FFWDx2"]');
            let ffwdx4 = document.querySelector('button[title="FFWDx4"]');

            modal.elevateFocusElement(true, ffwdx2);
            modal.elevateFocusElement(true, ffwdx4);

            let onClick = () => {
                modal.close();

                resolve();

                ffwdx2.removeEventListener('click', onClick);
                ffwdx4.removeEventListener('click', onClick);
            };

            ffwdx2.addEventListener('click', onClick);
            ffwdx4.addEventListener('click', onClick);
        }).then(() => {
            return Promise.resolve('VAT for ' + year + ' Q' + quarter + ' has been paid');
        });
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

        if (inventory < 1) {
            return;
        }

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

        if (year && !sales[year]) {
            sales[year] = {};
        }
        if (month && !sales[year][month]) {
            sales[year][month] = 0;
        }

        // Specific month
        if (year && month) {
            result = parseFloat(sales[year][month]) || 0;

            // Specific year
        } else if (year) {
            for (let m in sales[year]) {
                result += parseFloat(sales[year][m]) || 0;
            }

            // Result sales
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
            result = parseFloat(cost[year][month]) || 0;

            // Specific year
        } else if (year) {
            for (let m in cost[year]) {
                result += parseFloat(cost[year][m]) || 0;
            }

            // Result cost
        } else {
            for (let y in cost) {
                for (let m in cost[y]) {
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

    /**
     * Gets the demand
     *
     * @returns {Number} Demand factor
     */
    static getDemandFactor() {
        let unitPrice = Game.Services.ConfigService.get('unitPrice', 0);

        // Nobody wants units above 1000 DKK 
        if (unitPrice > 1000) {
            return 0;
        }

        return unitPrice / 100;
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

        if (factor <= 0) {
            return 0;
        }

        return Math.round(Math.pow(factor, -1) * 100) / 100;
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
        if (this.bankBalance < Game.MACHINE_PRICE) {
            return alert('You do not have enough money to purchase more machines');
        }

        this.machines++;

        this.bankBalance -= Game.MACHINE_PRICE;
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

        wait(0.1).then(() => {
            this.element.classList.toggle('in');
        });
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
        this.trigger('close');

        this.element.classList.remove('in');

        wait(0.5).then(() => {
            this.remove();

            this.trigger('closed');
        });
    }

    /**
     * Gets the class name
     */
    get className() {
        return this.name.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
    }

    /**
     * Check is is open
     *
     * @returns {Boolean} Is open
     */
    get isOpen() {
        return this.element.classList.contains('in');
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'modal ' + (this.isOpen ? 'in' : '') + ' modal--' + this.className + ' ' + (this.size || 'large') }, _.div({ class: 'modal__dialog' }, _.if(this.canCancel !== false, _.button({ class: 'modal__close widget widget--button' }).click(() => {
            this.trigger('cancel');

            this.close();
        })), _.div({ class: 'modal__header' }, this.renderHeader()), _.div({ class: 'modal__body' }, this.renderBody()), _.div({ class: 'modal__footer' }, this.renderFooter())));
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
     * Post render
     */
    postrender() {
        this.applyFocus();
    }

    /**
     * Gets the focus element
     *
     * @returns {HTMLElement} Element
     */
    get focusElement() {
        if (!this.focus || !this.focus.element) {
            return null;
        }

        return document.querySelector(this.focus.element);
    }

    /**
     * Toggles focused element's elevation
     *
     * @param {Boolean} isElevated
     * @param {HTMLElement} element
     */
    elevateFocusElement(isElevated, element) {
        if (!element) {
            element = this.focusElement;
        }
        if (!element) {
            return;
        }
        if (!isElevated) {
            return element.removeAttribute('style');
        }

        element.style.position = 'relative';
        element.style.zIndex = 99999;
    }

    /**
     * Focuses this modal, if a focus has been set
     */
    applyFocus() {
        if (!this.focus) {
            return;
        }

        let focus = document.querySelector(this.focus.element);

        if (!focus) {
            throw new Error('Modal couldn\'t find element "' + this.focus.element + '"');
        }

        focus = focus.getBoundingClientRect();

        let dialog = this.element.querySelector('.modal__dialog');

        if (!this.focus.side) {
            this.focus.side = 'right';
        }
        if (!this.focus.align) {
            this.focus.align = 'top';
        }

        dialog.classList.add('focused');
        dialog.classList.add(this.focus.side);
        dialog.classList.add('align-' + this.focus.align);

        switch (this.focus.side) {
            case 'right':
                dialog.style.top = focus.top + focus.height / 2 + 'px';
                dialog.style.left = focus.left + focus.width + 'px';
                break;

            case 'left':
                dialog.style.top = focus.top + focus.height / 2 + 'px';
                dialog.style.right = window.innerWidth - focus.right + focus.width + 'px';
                break;

            case 'top':
                dialog.style.bottom = window.innerHeight - focus.top + 'px';
                dialog.style.left = focus.left + focus.width / 2 + 'px';
                break;

            case 'bottom':
                dialog.style.top = focus.bottom + 'px';
                dialog.style.left = focus.left + focus.width / 2 + 'px';
                break;
        }
    }

    /**
     * Renders the footer
     */
    renderFooter() {
        if (this.canSubmit === false) {
            return;
        }

        return _.button({ class: 'widget widget--button align-right' }, 'OK').click(() => {
            this.trigger('ok');

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
        this.canCancel = false;
    }

    /**
     * Render header
     */
    renderHeader() {
        return 'Transfer funds';
    }

    /**
     * Sets the max amount
     *
     * @param {Number} max
     */
    set max(max) {
        this.element.querySelector('input').max = max;
        this.element.querySelector('.text-center:last-child').innerHTML = max;
        this.element.querySelector('input').value = max;
        this.amount = max;

        this.update();
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
        return _.button({ dynamicContent: true, class: 'widget widget--button success align-right' }, 'Transfer ' + this.amount + ' DKK').click(() => {
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
        return 'modal--vat-reporting-tool';
    }

    /**
     * Renders the header
     */
    renderHeader() {
        return _.h1('Report VAT for ' + this.year + ' Q' + this.quarter);
    }

    /**
     * Renders the footer
     */
    renderFooter() {
        return _.button({ class: 'widget widget--button align-right' }, 'Submit').click(() => {
            if (this.step < 5) {
                return;
            }

            this.close();

            Game.Services.SessionService.setVat(this.year, this.quarter, true);

            this.trigger('submit');
        });
    }

    /**
     * Sets the step
     *
     * @param {Number} step
     */
    setStep(step) {
        this.step = step;

        this.fetch();
    }

    /**
     * Gets the sales number
     */
    get sales() {
        let sales = Game.Services.SessionService.getSalesQuarter(this.year, this.quarter);

        if (this.step > 2) {
            return sales / 1.25 * 0.25;
        } else if (this.step > 1) {
            return sales / 1.25;
        }

        return 0;
    }

    /**
     * Gets the cost number
     */
    get cost() {
        let cost = Game.Services.SessionService.getCostQuarter(this.year, this.quarter);

        if (this.step > 4) {
            return cost / 1.25 * 0.25;
        } else if (this.step > 3) {
            return cost / 1.25;
        }

        return 0;
    }

    /**
     * Renders the body
     */
    renderBody() {
        if (!this.step) {
            this.step = 1;
        }

        return _.div({ class: this.className + '__calculation' }, _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Sales'), _.div({ class: 'widget widget--label' }, Game.Services.SessionService.getSalesQuarter(this.year, this.quarter) + ' DKK'), _.if(this.step === 1, _.button({ class: 'widget widget--button' }, '/ 1.25', _.div({ class: 'widget__tooltip' }, 'Get the sales without VAT')).click(() => {
            this.setStep(2);
        })), _.if(this.step !== 1, _.div({ class: 'widget widget--label text-center disabled' }, '/ 1.25')), _.if(this.step === 2, _.button({ class: 'widget widget--button' }, '* 0.25', _.div({ class: 'widget__tooltip' }, 'Get the sales VAT amount')).click(() => {
            this.setStep(3);
        })), _.if(this.step !== 2, _.div({ class: 'widget widget--label text-center' }, '* 0.25')), _.div({ class: 'widget widget--label ' + this.className + '__result' }, this.sales + ' DKK')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Cost'), _.div({ class: 'widget widget--label' }, Game.Services.SessionService.getCostQuarter(this.year, this.quarter) + ' DKK'), _.if(this.step === 3, _.button({ class: 'widget widget--button' }, '/ 1.25', _.div({ class: 'widget__tooltip' }, 'Get the cost without VAT')).click(() => {
            this.setStep(4);
        })), _.if(this.step !== 3, _.div({ class: 'widget widget--label text-center' }, '/ 1.25')), _.if(this.step === 4, _.button({ class: 'widget widget--button' }, '* 0.25', _.div({ class: 'widget__tooltip' }, 'Get the cost VAT amount')).click(() => {
            this.setStep(5);
        })), _.if(this.step !== 4, _.div({ class: 'widget widget--label text-center disabled' }, '* 0.25')), _.div({ class: 'widget widget--label ' + this.className + '__result' }, this.cost + ' DKK')), _.if(this.step > 4, _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Total'), _.div({ class: 'widget widget--label' }, 'sales VAT - cost VAT'), _.div({ class: 'widget widget--label' }, '(' + this.sales + ' DKK - ' + this.cost + ' DKK)'), _.div({ class: 'widget widget--label' }), _.div({ class: 'widget widget--label ' + this.className + '__result' }, Math.round((this.sales - this.cost) * 100) / 100 + ' DKK'))));
    }
}

module.exports = VATReportingTool;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The financial reporting tool
 */

class FinancialReportingTool extends Game.Views.Modals.Modal {
    /**
     * Gets the class name
     */
    get className() {
        return 'modal--financial-reporting-tool';
    }

    /**
     * Renders the header
     */
    renderHeader() {
        return [_.h1({ class: 'widget text-center' }, this.year + ' over'), _.if(this.step === 1, _.p({ class: 'widget text-center' }, 'Report your financial performance to the tax bureau to evaluate the actual tax incurred in the previous year'))];
    }

    /**
     * Renders the footer
     */
    renderFooter() {
        return _.button({ class: 'widget widget--button align-right' }, this.step < 2 ? 'Next' : 'Settle').click(() => {
            if (this.step < 2) {
                return this.setStep(this.step + 1);
            }

            this.close();

            let account = Game.Services.ConfigService.get('companyAccount');

            Game.Services.ConfigService.set('companyAccount', account + this.btaxDifference);

            Crisp.View.get('Stats').update();

            let message = new Game.Views.Modals.Message({
                title: 'Financial report complete',
                message: 'Based on your profit in this year, try to estimate your profit for next year'
            });

            message.on('ok', () => {
                Game.Services.TimeService.goToNextYear();

                Crisp.Router.go('/b-tax-estimation');
            });
        });
    }

    /**
     * Sets the step
     *
     * @param {Number} step
     */
    setStep(step) {
        this.step = step;

        this.fetch();
    }

    /**
     * Gets the sales number
     */
    get sales() {
        return Game.Services.SessionService.getSales(this.year);
    }

    /**
     * Gets the cost number
     */
    get cost() {
        return Game.Services.SessionService.getCost(this.year);
    }

    /**
     * Gets the estimated income
     *
     * @returns {Number} Estimated income
     */
    get estimatedIncome() {
        return Game.Services.ConfigService.get('estimatedIncome');
    }

    /**
     * Gets the B tax paid
     *
     * @returns {Number} B tax paid
     */
    get btaxPaid() {
        return Game.Services.ConfigService.get('btaxAmount');
    }

    /**
     * Gets the B tax payable
     *
     * @returns {Number} B tax payable
     */
    get btaxPayable() {
        return Math.round((this.sales - this.cost) * 0.38 * 100) / 100;
    }

    /**
     * Gets the B tax difference
     *
     * @returns {Number} B tax difference
     */
    get btaxDifference() {
        return Math.round((this.btaxPaid - this.btaxPayable) * 100) / 100;
    }

    /**
     * Pre render
     */
    prerender() {
        if (!this.step) {
            this.step = 1;
        }

        this.size = 'medium';
    }

    /**
     * Renders the body
     */
    renderBody() {
        return _.div({ class: this.className + '__calculation' }, _.if(this.step === 1, _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Sales'), _.div({ class: 'widget widget--label text-right' }, this.sales + ' DKK')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Cost'), _.div({ class: 'widget widget--label text-right' }, '(' + this.cost + ' DKK)')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Profit'), _.div({ class: 'widget widget--label text-right result' }, this.sales - this.cost + ' DKK'))), _.if(this.step === 2, _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Estimated profit'), _.div({ class: 'widget widget--label text-right' }, this.estimatedIncome + ' DKK')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'B tax paid'), _.div({ class: 'widget widget--label text-right' }, this.btaxPaid + ' DKK')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Actual profit'), _.div({ class: 'widget widget--label text-right' }, this.sales - this.cost + ' DKK')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Actual B tax'), _.div({ class: 'widget widget--label text-right' }, this.btaxPayable + ' DKK')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, _.if(this.btaxDifference <= 0, 'B tax payable'), _.if(this.btaxDifference > 0, 'B tax refund')), _.div({ class: 'widget widget--label text-right result' }, Math.abs(this.btaxDifference) + ' DKK'))));
    }
}

module.exports = FinancialReportingTool;

/***/ }),
/* 21 */
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
   * Gets the class name
   *
   * @returns {String} Class name
   */
  get className() {
    return 'drawer-' + this.name.replace('Drawer', '').replace(/([A-Z])/g, '-$1').trim().toLowerCase();
  }

  /**
   * Renders this content
   *
   * @returns {HTMLElement} Element
   */
  renderContent() {}

  /**
   * Template
   */
  template() {
    return _.div({ class: 'drawer ' + this.className }, this.renderContent());
  }
}

module.exports = Drawer;

/***/ }),
/* 22 */
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
        // Able to pay VAT
        if (date.getDate() === 24 && ( // The 24th day of...
        date.getMonth() === 1 || // ...february or...
        date.getMonth() === 4 || // ...may or...
        date.getMonth() === 7 || // ...august or...
        date.getMonth() === 10 // ...november
        )) {
            let expiresOn = new Date(date).addMonths(1);
            expiresOn.setDate(1);

            let year = date.getFullYear();
            let quarter = date.getQuarter() - 1;

            if (quarter < 1) {
                quarter = 4;
                year--;
            }

            // Exclude first occurence
            if (year < Game.Services.TimeService.startTime.getFullYear()) {
                return;
            }

            if (Game.Services.SessionService.getVat(year, quarter).isPaid) {
                return;
            }

            return {
                type: 'yellow',
                title: 'Pay VAT',
                message: 'VAT payment can be made, and is due on ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Pay VAT (' + Game.Services.SessionService.getVat(year, quarter).amount + ' DKK)',
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
            let year = date.getFullYear();
            let quarter = date.getQuarter() - 1;

            if (quarter < 1) {
                quarter = 4;
                year--;
            }

            // Exclude first occurence
            if (year < Game.Services.TimeService.startTime.getFullYear()) {
                return;
            }

            if (Game.Services.SessionService.getVat(year, quarter).isReported) {
                return;
            }

            let expiresOn = new Date(date).addMonths(1);
            expiresOn.setDate(24);

            return {
                type: 'yellow',
                title: 'Report VAT',
                message: 'VAT can be reported, and payment can be made starting ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Report VAT',
                    onClick: 'onClickReportVAT'
                }
            };
        }

        // Able to do yearly financial report
        if (date.getMonth() === 11 && date.getDate() === 31) {
            return {
                type: 'purple',
                title: 'Financial report',
                action: 'onReachFinancialReport'
            };
        }

        // Able to pay B tax
        if (date.getDate() === 3) {
            let btax = Game.Services.SessionService.getBTax(date.getFullYear(), date.getMonth() + 1);

            if (btax.isPaid) {
                return;
            }

            let expiresOn = new Date(date);
            expiresOn.setDate(22);

            return {
                type: 'blue',
                title: 'Pay B tax',
                message: 'B tax payment can be made, and is due on ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Pay B tax (' + btax.amount + ' DKK)',
                    onClick: 'onClickPayBTax'
                }
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
     * Event: Click pause
     */
    onClickPause() {
        Game.Services.TimeService.isPaused = true;

        this.update();
    }

    /**
     * Event: Click pause
     */
    onClickPlay() {
        Game.Services.TimeService.isPaused = false;

        Game.Services.TimeService.speed = 1;

        this.update();
    }

    /**
     * Event: Click fast forward
     *
     * @param {Number} factor
     */
    onClickFastForward(factor) {
        Game.Services.TimeService.isPaused = false;

        Game.Services.TimeService.speed = factor;

        this.update();
    }

    /**
     * Gets the state of the timeline
     *
     * @returns {String} State
     */
    get state() {
        if (Game.Services.TimeService.isPaused) {
            return 'paused';
        }

        if (Game.Services.TimeService.speed === 2) {
            return 'ffwdx2';
        }

        if (Game.Services.TimeService.speed === 4) {
            return 'ffwdx4';
        }

        return 'playing';
    }

    /**
     * Renders the content
     */
    renderContent() {
        let date = Game.Services.TimeService.currentTime;

        return _.div({ class: 'drawer__preview' }, _.div({ dynamicContent: true, class: 'drawer--timeline__controls' }, _.div({ class: 'widget-group' }, _.button({ class: 'widget widget--button small' + (this.state === 'paused' ? ' active' : ''), title: 'Pause' }, '⏸').click(() => {
            this.onClickPause();
        }), _.button({ class: 'widget widget--button small' + (this.state === 'playing' ? ' active' : ''), title: 'Play' }, '▶️').click(() => {
            this.onClickPlay();
        }), _.button({ class: 'widget widget--button small' + (this.state === 'ffwdx2' ? ' active' : ''), title: 'FFWDx2' }, '⏩').click(() => {
            this.onClickFastForward(2);
        }), _.button({ class: 'widget widget--button small' + (this.state === 'ffwdx4' ? ' active' : ''), title: 'FFWDx4' }, '⏭').click(() => {
            this.onClickFastForward(4);
        }))), _.div({ dynamicContent: true, class: 'drawer--timeline__scroller' }, _.div({ class: 'drawer--timeline__scroller__year' }, date.getFullYear()), _.div({ class: 'drawer--timeline__scroller__month' }, date.getMonthName()), _.div({ class: 'drawer--timeline__scroller__days' }, _.loop(60, day => {
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
        }))));
    }
}

module.exports = Timeline;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A visual representation of quests
 */

class QuestLog extends Game.Views.Drawers.Drawer {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.setQuest('Pricing', 'Reach 💰 ' + Game.PRICING_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to set unit prices', () => {
            return this.personalAccount >= Game.PRICING_PERSONAL_ACCOUNT_MINIMUM;
        });

        this.setQuest('Machines', 'Reach 💰 ' + Game.MACHINE_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to get machines', () => {
            return this.personalAccount >= Game.MACHINE_PERSONAL_ACCOUNT_MINIMUM;
        });

        this.setQuest('Overdraft', 'Reach 💰 ' + Game.OVERDRAFT_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to get an overdraft allowance', () => {
            return this.personalAccount >= Game.OVERDRAFT_PERSONAL_ACCOUNT_MINIMUM;
        });

        this.fetch();
    }

    /**
     * Gets the current amount in the personal account
     *
     * @returns {Number} Amount
     */
    get personalAccount() {
        return Game.Services.ConfigService.get('personalAccount', 0);
    }

    /**
     * Defines a quest
     *
     * @param {String} title
     * @param {String} message
     * @param {Function} isComplete
     */
    setQuest(title, message, isComplete) {
        if (!this.quests) {
            this.quests = [];
        }

        this.quests.push({
            title: title,
            message: message,
            isComplete: isComplete
        });
    }

    /**
     * Gets the current quest
     * NOTE: Side effect, stores completed quests in cache
     */
    get currentQuest() {
        let currentQuest;
        let completedQuests = Game.Services.ConfigService.get('completedQuests', []);

        for (let quest of this.quests || []) {
            if (!currentQuest && !quest.isComplete()) {
                currentQuest = quest;
            }

            if (quest.isComplete() && completedQuests.indexOf(quest.title) < 0) {
                completedQuests.push(quest.title);
            }
        }

        Game.Services.ConfigService.set('completedQuests', completedQuests);

        return currentQuest;
    }

    /**
     * Hearbeat
     */
    heartbeat() {
        this.fetch();
    }

    /**
     * Renders the content
     */
    renderContent() {
        let quest = this.currentQuest;

        if (!quest) {
            return;
        }

        return _.div({ class: this.className + '__quest' }, _.div({ class: this.className + '__quest__title' }, quest.title), _.div({ class: this.className + '__quest__message' }, quest.message));
    }
}

module.exports = QuestLog;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Player statistics
 */

class Stats extends Game.Views.Drawers.Drawer {
    /**
     * Heartbeat
     */
    heartbeat() {
        this.update();
    }

    /**
     * Renders the preview
     */
    renderContent() {
        return _.div({ class: 'drawer__preview drawer--stats__preview' }, _.div({ class: 'drawer--stats__preview__company' }, _.div({ dynamicContent: true, class: 'widget widget--label text-center drawer--stats__company-account' }, '🏭 ' + Game.Services.ConfigService.get('companyAccount', 0) + ' DKK')), _.div({ class: 'drawer--stats__preview__transactions' }, _.button({ class: 'widget widget--button green align-center' }, 'Transfer ➜').click(() => {
            let expired = Crisp.View.get('Notifications').getExpiredNotification();

            if (expired) {
                let title = expired.title;

                title = title.charAt(0).toLowerCase() + title.slice(1);

                return new Game.Views.Modals.Message({
                    title: 'You need to ' + title,
                    message: 'You need to ' + title + ' before you can transfer money'
                });
            }

            new Game.Views.Modals.Transfer();
        })), _.div({ class: 'drawer--stats__preview__personal' }, _.div({ dynamicContent: true, class: 'widget widget--label text-center drawer--stats__personal-account' }, '💰 ' + Game.Services.ConfigService.get('personalAccount', 0) + ' DKK')));
    }
}

module.exports = Stats;

/***/ }),
/* 25 */
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

        notification.createdOn = Game.Services.TimeService.currentTime.reset();

        let key = notification.createdOn.getTime().toString();

        if (instance.model[key]) {
            return;
        }

        if (typeof instance[notification.action] === 'function') {
            return instance[notification.action](notification);
        }

        instance.model[key] = notification;

        instance.save();

        instance.fetch();
    }

    /**
     * Gets expired notification
     *
     * @returns {Object} Notification
     */
    getExpiredNotification() {
        for (let key in this.model) {
            if (this.model[key].isExpired) {
                return this.model[key];
            }
        }

        return null;
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
     * Renders the content
     */
    renderContent() {
        let currentDate = Game.Services.TimeService.currentTime;

        return _.div({ dynamicChildren: true, class: 'drawer__preview drawer--notifications__entries' }, _.each(this.model, (key, notification) => {
            let entry = _.div({ dynamicAttributes: true, class: 'drawer--notifications__entry' + (notification.isExpired ? ' expired' : '') }, _.do(() => {
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

                return _.button({ dynamicAttributes: true, class: 'drawer--notifications__entry__action widget widget--button ' + notification.type || '' }, notification.action.label).click(e => {
                    if (typeof this[notification.action.onClick] !== 'function') {
                        return;
                    }

                    this[notification.action.onClick](notification).then(message => {
                        entry.classList.toggle('out', true);
                        entry.dataset.crDynamicAttributes = false;

                        setTimeout(() => {
                            delete this.model[key];
                            this.save();
                            this.fetch();
                        }, 500);

                        if (message) {
                            new Game.Views.Modals.Message({
                                title: 'Success',
                                message: message
                            });
                        }
                    }).catch(e => {
                        if (!e) {
                            return;
                        }

                        console.log(e);

                        new Game.Views.Modals.Message({
                            title: 'Error',
                            message: e.message
                        });
                    });
                });
            }));

            return entry;
        }));
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

    /**
     * Event: Reached financial report
     *
     * @param {Object} notification
     */
    onReachFinancialReport(notification) {
        return Game.Services.SessionService.financialReport(new Date());
    }
}

module.exports = Notifications;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Controls
 */

class Controls extends Game.Views.Drawers.Drawer {
    /**
     * Heartbeat
     */
    heartbeat() {
        this.update();
    }

    /**
     * Event: Changed unit price
     *
     * @param {Number} price
     */
    onChangeUnitPrice(price) {
        Game.Services.SessionService.setUnitPrice(price);

        this.heartbeat();
    }

    /*
     * Event: Click buy machine
     */
    onClickBuyMachine() {
        Game.Services.SessionService.buyMachine();

        this.heartbeat();
    }

    /*
     * Event: Click produce
     */
    onClickProduce() {
        Game.Services.SessionService.produceUnit();

        this.heartbeat();
    }

    /**
     * Renders the content
     */
    renderContent() {
        let year = Game.Services.TimeService.currentYear;
        let month = Game.Services.TimeService.currentMonth;

        return [
        // Unit price
        _.if(Game.Services.SessionService.isQuestComplete('Pricing'), _.div({ class: 'drawer--controls__heading' }, 'Pricing'), _.div({ class: 'widget-group' }, _.div({ dynamicContent: true, class: 'widget widget--label' }, 'Unit price'), _.input({ class: 'widget widget--input small drawer--controls__pricing__input', type: 'number', value: Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE) }).on('input', e => {
            this.onChangeUnitPrice(e.currentTarget.value);
        }), _.div({ class: 'widget widget--label small' }, _.span({ class: 'vat' }))), _.div({ dynamicContent: true }, 'Demand (sales per day): ' + Game.Services.SessionService.getSalesPerDay() + ' units')),

        // Machines
        _.if(Game.Services.SessionService.isQuestComplete('Machines'), _.div({ dynamicContent: true, class: 'drawer--controls__heading' }, 'Machines: ' + Game.Services.ConfigService.get('machines', 0)), _.div({ class: 'widget-group' }, _.button({ dynamicAttributes: true, class: 'widget widget--button drawer--controls__buy-machine' }, 'Buy machine').click(e => {
            this.onClickBuyMachine();
        }), _.div({ dynamicContent: true, class: 'widget widget--label text-right vat' }, Game.Services.SessionService.getCurrentMachinePrice() + ' DKK'))),

        // Inventory
        _.div({ dynamicContent: true, class: 'drawer--controls__heading' }, 'Inventory: ' + Game.Services.ConfigService.get('inventory', 0)), _.div({ class: 'widget-group' }, _.button({ class: 'widget widget--button drawer--controls__produce' }, 'Produce').click(e => {
            this.onClickProduce();
        }), _.div({ class: 'widget widget--label text-right vat' }, Game.PRODUCTION_COST + ' DKK')),

        // Statistics
        _.div({ class: 'drawer--controls__heading' }, 'Statistics for ' + year), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Estimated profit:'), _.div({ dynamicContent: true, class: 'widget widget--label text-right' }, Game.Services.ConfigService.get('estimatedIncome', 0) + ' DKK')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Sales:'), _.div({ dynamicContent: true, class: 'widget widget--label text-right' }, Game.Services.SessionService.getSales(year) + ' DKK')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Cost:'), _.div({ dynamicContent: true, class: 'widget widget--label text-right' }, '(' + Game.Services.SessionService.getCost(year) + ' DKK)')), _.div({ class: 'widget-group' }, _.div({ class: 'widget widget--label' }, 'Actual profit:'), _.div({ dynamicContent: true, class: 'widget widget--label text-right drawer--controls__actual-profit' }, Game.Services.SessionService.getSales(year) - Game.Services.SessionService.getCost(year) + ' DKK'))];
    }
}

module.exports = Controls;

/***/ }),
/* 27 */
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
/* 28 */
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
        this.color = this.color || '#000000';
        this.maxCoinsPerStack = this.maxCoinsPerStack || 10;

        this.coins = _.div({ class: 'coin-stack__coins' });

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

            let coin = _.div({ class: 'coin-stack__coin in', style: 'bottom: ' + (this.getStackAmount(0) + 0.5) * this.coinHeight + 'px' });

            setTimeout(() => {
                coin.remove();
                this.update();
            }, 400);

            _.append(this.coins, coin);
        } else if (this.amount < this.currentAmount) {
            this.currentAmount--;

            let coin = _.div({ class: 'coin-stack__coin out', style: 'bottom: ' + (this.getStackAmount(0) + 0.5) * this.coinHeight + 'px' });

            setTimeout(() => {
                coin.remove();
                this.update();
            }, 400);

            _.append(this.coins, coin);
        }

        if (this.element) {
            this.fetch();
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
     * @param {Number} index
     *
     * @returns {String} Amount style
     */
    getAmountStyle(index) {
        let amount = this.getStackAmount(index);

        if (index === 0) {
            amount -= this.coins.children.length;
        }

        return 'height: calc(' + amount + ' * ' + this.coinHeight + 'px); ';
    }

    /**
     * Gets the position style
     *
     * @param {Number} index
     *
     * @return {String} Position style
     */
    getPositionStyle(index) {
        let zIndex = this.stackCount - index;
        let opacity = 1 - index * 0.1;

        if (opacity < 0) {
            opacity = 0;
        }

        let style = 'z-index: ' + zIndex + '; opacity: ' + opacity + '; ';

        if (index > 0) {
            let translateX = index * 10;

            if (index % 2) {
                translateX *= -1;
            }

            style += 'transform: translateX(' + translateX + 'px); ';
        }

        return style;
    }

    /**
     * Gets the amount of stacks
     *
     * @returns {Number} Stacks
     */
    get stackCount() {
        return Math.ceil(this.currentAmount / this.maxCoinsPerStack);
    }

    /**
     * Gets the amount of coins in a stack
     *
     * @param {Number} index
     *
     * @returns {Number} Amount
     */
    getStackAmount(index) {
        if (index === 0) {
            return this.currentAmount % this.maxCoinsPerStack;
        }

        return this.maxCoinsPerStack;
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'coin-stack' }, _.loop(this.stackCount - 1, i => {
            return _.div({ class: 'coin-stack__stack', 'data-index': i, 'data-amount': this.getStackAmount(i), style: this.getAmountStyle(i) + this.getPositionStyle(i) });
        }));
    }

    /**
     * Post render
     */
    postrender() {
        _.append(this.element, this.coins);
    }
}

module.exports = CoinStack;

/***/ }),
/* 29 */
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

        if (value < 5000) {
            e.currentTarget.value = 5000;
        }

        if (value > this.model.total) {
            e.currentTarget.value = this.model.total;
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
        return _.div({ class: 'page page--setup' }, _.div({ class: 'page__container' }, _.h1({ class: 'page__title' }, 'Setup'), _.div({ class: 'page--setup__input' }, _.div({ class: 'widget-group align-center' }, _.label({ class: 'widget widget--label' }, 'Company name'), _.input({ class: 'widget widget--input', type: 'text', name: 'name', placeholder: 'E.g. "My Company ApS"', value: this.model.name }).on('input', e => {
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
        })));
    }
}

module.exports = Setup;

/***/ }),
/* 30 */
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
            income: 30000,
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
            new Game.Views.Modals.Message({
                message: 'Please calculate your B tax first'
            });

            return;
        }

        // Save the estimated income
        Game.Services.ConfigService.set('estimatedIncome', this.model.income);

        // Save the B tax estimate
        Game.Services.ConfigService.set('btaxAmount', this.model.btax);

        // Check if setup is complete
        if (!Game.Services.ConfigService.get('completedSetup')) {
            Game.Services.ConfigService.set('completedSetup', true);
            Game.Services.TimeService.startClock();
        }

        location.hash = '/session';
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'page page--b-tax-estimation' }, _.div({ class: 'page__container' }, _.h1({ class: 'page__title' }, 'B tax estimation for ' + Game.Services.TimeService.currentYear), _.p({ class: 'widget widget--label text-center' }, 'Estimate how much profit you will make in the coming year, you will pay your b-tax based on this amount'), _.div({ class: 'page--b-tax-estimation__input' }, _.div({ class: 'widget-group align-center' }, _.label({ class: 'widget widget--label' }, 'Target profit for ' + Game.Services.TimeService.currentYear), _.input({ class: 'widget widget--input', type: 'number', step: 1000, min: 0, value: this.model.income }).on('input', e => {
            this.onChangeIncome(e);
        })), _.button({ class: 'widget widget--button align-center' }, 'Calculate B tax').click(e => {
            this.onClickCalculate(e);
        })), this.pieChart = new Game.Views.Charts.PieChart({
            className: 'page--b-tax-estimation__pie-chart',
            showPercentage: true,
            model: {
                btax: { showPercentage: true, percent: this.model.btax / this.model.income, label: 'B tax', value: this.model.btax, color: 'blue' },
                income: { percent: 1 - this.model.btax / this.model.income, label: 'Target profit', color: 'green', value: this.model.income }
            }
        }), this.finalBTax = _.div({ class: 'page--b-tax-estimation__final' }), _.div({ class: 'widget-group align-right stretch' }, _.if(!Game.Services.ConfigService.get('completedSetup'), _.a({ href: '#/', class: 'widget widget--button' }, 'Back'), _.div({ class: 'widget-group__separator' })), _.button({ class: 'widget widget--button' }, 'Done').click(e => {
            this.onClickDone(e);
        }))));
    }
}

module.exports = BTaxEstimation;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Session extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;

        this.fetch();

        this.hearbeatInterval = setInterval(() => {
            this.heartbeat();
        }, 1000);

        this.sellTimeout = setTimeout(() => {
            this.sellUnit();
        }, Game.Services.SessionService.getSalesDelay());

        this.on('remove', () => {
            clearInterval(this.hearbeatInterval);
            clearTimeout(this.sellTimeout);
        });
    }

    /**
     * Sells a unit
     */
    sellUnit() {
        this.sellTimeout = setTimeout(() => {
            this.sellUnit();
        }, Game.Services.SessionService.getSalesDelay());

        if (Game.Services.TimeService.isPaused) {
            return;
        }

        Game.Services.SessionService.sellUnit();
    }

    /**
     * Heartbeat (once per second)
     */
    heartbeat() {
        if (Game.Services.TimeService.isPaused) {
            return;
        }

        // Init tutorial 
        if (!Game.Services.ConfigService.get('initTutorialDone')) {
            this.startInitTutorial();
        }

        // B tax tutorial
        if (Game.Services.TimeService.currentDate === 3 && !Game.Services.ConfigService.get('bTaxTutorialDone')) {
            this.startBTaxTutorial();
        }

        // Quest tutorial
        if (Game.Services.TimeService.currentDate === 10 && !Game.Services.ConfigService.get('questTutorialDone')) {
            this.startQuestTutorial();
        }

        // Unit price tutorial
        if (Game.Services.SessionService.isQuestComplete('Pricing') && !Game.Services.ConfigService.get('pricingTutorialDone')) {
            this.startPricingTutorial();
        }

        // Machines tutorial
        if (Game.Services.SessionService.isQuestComplete('Machines') && !Game.Services.ConfigService.get('machinesTutorialDone')) {
            this.startMachinesTutorial();
        }

        // Tick time 
        Game.Services.TimeService.tick();

        this.questLog.heartbeat();
        this.controls.heartbeat();
        this.timeline.heartbeat();
        this.notifications.heartbeat();
        this.stats.heartbeat();

        // Update coin stack
        let stackAmount = Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000);

        if (stackAmount !== this.coinStack.amount) {
            this.coinStack.amount = stackAmount;
        }

        // Automatically produce units, if applicable
        if (Game.Services.TimeService.isNewDay) {
            Game.Services.SessionService.autoProduceUnits();
        }
    }

    /**
     * Starts the unit price tutorial
     */
    startPricingTutorial() {
        let modal = new Game.Views.Modals.Message({
            title: 'Change unit prices',
            canCancel: false,
            canSubmit: false,
            message: 'You can now change unit prices! Let\'s set the price to 30 DKK now.',
            focus: {
                element: '.drawer--controls__pricing__input',
                side: 'right',
                align: 'middle'
            }
        });

        let input = modal.focusElement;

        setTimeout(() => {
            modal.elevateFocusElement(true);
        }, 200);

        let onInput = e => {
            if (e.currentTarget.value != 30) {
                return;
            }

            input.removeEventListener('input', onInput);

            modal.elevateFocusElement(false);
            modal.close();

            Game.Services.ConfigService.set('pricingTutorialDone', true);
        };

        input.addEventListener('input', onInput);
    }

    /**
     * Starts the machines tutorial
     */
    startMachinesTutorial() {
        new Game.Views.Modals.Message({
            title: 'Machines',
            canCancel: false,
            message: 'You can now buy machines! Click here to buy one and automate your unit production.',
            focus: {
                element: '.drawer--controls__buy-machine',
                side: 'right',
                align: 'middle'
            }
        });

        Game.Services.ConfigService.set('machinesTutorialDone', true);
    }

    /**
     * Starts the B tax tutorial
     */
    startBTaxTutorial() {
        let modal = new Game.Views.Modals.Message({
            title: 'Pay B tax',
            canCancel: false,
            canSubmit: false,
            message: 'It\'s time to pay B tax! Just click the button to pay and move on with your life.',
            focus: {
                element: '.drawer--notifications__entry__action',
                side: 'left',
                align: 'middle'
            }
        });

        let button = modal.focusElement;

        setTimeout(() => {
            modal.elevateFocusElement(true);
        }, 200);

        let onClick = e => {
            button.removeEventListener('click', onClick);

            modal.elevateFocusElement(false);
            modal.close();

            Game.Services.ConfigService.set('bTaxTutorialDone', true);
        };

        button.addEventListener('click', onClick);
    }

    /**
     * Starts the quest tutorial
     */
    startQuestTutorial() {
        let modal = new Game.Views.Modals.Message({
            title: 'Quests',
            canCancel: false,
            message: 'Save enough money in your personal account to unlock upgrades.',
            focus: {
                element: '.drawer--quest-log',
                side: 'left',
                align: 'top'
            }
        });

        Game.Services.ConfigService.set('questTutorialDone', true);
    }

    /**
     * Starts the init tutorial
     */
    startInitTutorial() {
        Game.Services.TimeService.isPaused = true;

        let produce = () => {
            let modal = new Game.Views.Modals.Message({
                title: 'Produce',
                canCancel: false,
                canSubmit: false,
                message: 'Press this button to produce units for selling. Let\'s produce 5 units now.',
                focus: {
                    element: '.drawer--controls__produce',
                    side: 'right',
                    align: 'top'
                }
            });

            let button = modal.focusElement;

            modal.elevateFocusElement(true);

            let count = 0;

            let onClick = () => {
                count++;

                if (count >= 5) {
                    button.removeEventListener('click', onClick);
                    modal.elevateFocusElement(false);

                    transfer();
                }
            };

            button.addEventListener('click', onClick);
        };

        let time = () => {
            let modal = new Game.Views.Modals.Message({
                title: 'Time',
                canSubmit: false,
                canCancel: false,
                message: 'Use these buttons to control time. You can speed up or pause the game entirely. Press play now to start time.',
                focus: {
                    element: '.drawer--timeline__controls',
                    side: 'top',
                    align: 'left'
                }
            });

            let button = document.querySelector('button[title="Play"]');

            modal.elevateFocusElement(true, button);

            let onClick = () => {
                modal.close();

                Game.Services.ConfigService.set('initTutorialDone', true);

                button.removeEventListener('click', onClick);
            };

            button.addEventListener('click', onClick);
        };

        let transfer = () => {
            return new Game.Views.Modals.Message({
                title: 'Company account',
                canCancel: false,
                message: 'This is the money you invested in the company as capital, you produce and buy upgrades and pay tax out of this account',
                focus: {
                    element: '.drawer--stats__company-account',
                    side: 'bottom',
                    align: 'left'
                }
            }).on('ok', () => {
                new Game.Views.Modals.Message({
                    title: 'Personal account',
                    canCancel: false,
                    message: 'This is the money you own privately, when you reach certain amount you can unlock upgrades. The more money you have here the more coins you will have!',
                    focus: {
                        element: '.drawer--stats__personal-account',
                        side: 'bottom',
                        align: 'right'
                    }
                }).on('ok', () => {
                    let modal = new Game.Views.Modals.Message({
                        title: 'Transfer',
                        canCancel: false,
                        canSubmit: false,
                        message: 'You can transfer money from your company account to your personal account. Let\'s transfer 100 DKK now',
                        focus: {
                            element: '.drawer--stats__preview__transactions button',
                            side: 'bottom',
                            align: 'center'
                        }
                    });

                    let button = modal.focusElement;

                    modal.elevateFocusElement(true);

                    let onClick = e => {
                        button.removeEventListener('click', onClick);

                        setTimeout(() => {
                            let modal = Crisp.View.get('Transfer');

                            modal.on('submit', () => {
                                time();
                            });

                            modal.max = 100;
                        });

                        modal.elevateFocusElement(false);
                        modal.close();
                    };

                    button.addEventListener('click', onClick);
                });
            });
        };

        produce();
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'page page--session' }, _.div({ class: 'page--session__panel top' }, this.stats = new Game.Views.Drawers.Stats()), _.div({ class: 'page--session__panel middle' }, _.div({ class: 'page--session__panel left' }, this.controls = new Game.Views.Drawers.Controls()), _.div({ class: 'page--session__panel center' }, this.coinStack = new Game.Views.Charts.CoinStack({
            amount: Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000)
        })), _.div({ class: 'page--session__panel right' }, this.questLog = new Game.Views.Drawers.QuestLog(), this.notifications = new Game.Views.Drawers.Notifications())), _.div({ class: 'page--session__panel bottom' }, this.timeline = new Game.Views.Drawers.Timeline()));
    }
}

module.exports = Session;

/***/ }),
/* 32 */
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