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

/**
 * Adds hours to a date
 */
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
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

window._ = Crisp.Elements;

window.Game = {};

// -------------------
// Services
// -------------------
Game.Services = {};
Game.Services.ConfigService = __webpack_require__(2);
Game.Services.TimeService = __webpack_require__(3);
Game.Services.DebugService = __webpack_require__(4);

// -------------------
// Models
// -------------------
Game.Models = {};
Game.Models.Entity = __webpack_require__(5);
Game.Models.Player = __webpack_require__(6);
Game.Models.Company = __webpack_require__(7);
Game.Models.Report = __webpack_require__(8);
Game.Models.VATRecord = __webpack_require__(9);
Game.Models.VATPayment = __webpack_require__(10);
Game.Models.FinancialRecord = __webpack_require__(11);

// -------------------
// Views
// -------------------
Game.Views = {};

Game.Views.Widgets = {};
Game.Views.Widgets.PlayerInfo = __webpack_require__(12);
Game.Views.Widgets.DebugMenu = __webpack_require__(13);

Game.Views.Modals = {};
Game.Views.Modals.Modal = __webpack_require__(14);
Game.Views.Modals.VATReportingTool = __webpack_require__(15);

Game.Views.Drawers = {};
Game.Views.Drawers.Drawer = __webpack_require__(16);
Game.Views.Drawers.FinancialRecordDrawer = __webpack_require__(17);
Game.Views.Drawers.VATRecordDrawer = __webpack_require__(18);

Game.Views.Pages = {};
Game.Views.Pages.Setup = __webpack_require__(19);
Game.Views.Pages.Level = __webpack_require__(20);

// -------------------
// Controllers
// -------------------
Game.Controllers = {};

Game.Controllers.ViewController = __webpack_require__(21);

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
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            localStorage.setItem(key, value);
        }
    }

    /**
     * Gets a value
     *
     * @param {String} key
     *
     * @returns {Object} Value
     */
    static get(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return localStorage.getItem(key);
        }
    }
}

module.exports = ConfigService;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const HOURS_PER_SECOND = 12;

/**
 * The service for managing time
 */
class TimeService {
    /**
     * Starts the clock
     */
    static startClock() {
        Game.Services.ConfigService.set('time', Date.now());
        Game.Services.ConfigService.set('startTime', Date.now());
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
        if (amount < 1) {
            return;
        }

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
/* 6 */
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
/* 7 */
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
     * Gets the estimated yearly B skat
     */
    get estimatedYearlyBSkat() {
        return this.round(this.estimatedYearlyIncome * this.estimatedVATPercentage / 100);
    }

    /**
     * Gets the estimated yearly VAT
     */
    get estimatedYearlyVAT() {
        return this.round(this.estimatedYearlySalesVAT - this.estimatedYearlyProductionCostVAT);
    }

    /**
     * Gets the estimated monthly B skat
     */
    get estimatedMonthlyBSkat() {
        return this.round(this.estimatedYearlyBSkat / 12);
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
        return _.div({ class: 'modal modal--' + this.className }, _.div({ class: 'modal__dialog' }, _.button({ class: 'modal__close widget widget--button' }).click(() => {
            this.close();
        }), _.div({ class: 'modal__header' }, this.renderHeader()), _.div({ class: 'modal__body' }, this.renderBody()), _.div({ class: 'modal__footer' }, this.renderFooter())));
    }
}

module.exports = Modal;

/***/ }),
/* 15 */
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
/* 16 */
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
     * Updates this drawer
     */
    update() {}

    /**
     * Template
     */
    template() {
        return _.div({ class: 'drawer drawer-' + this.name.replace('Drawer', '').replace(/([A-Z])/g, '-$1').trim().toLowerCase() }, _.input({ type: 'checkbox', class: 'drawer__toggle', checked: this.isExpanded }), this.renderPreview(), this.renderContent());
    }
}

module.exports = Drawer;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A drawer for the financial record and paying B tax
 */

class FinancialRecordDrawer extends Game.Views.Drawers.Drawer {
    /**
     * Gets the drawer position
     */
    get position() {
        return 'bottom';
    }

    /**
     * Renders this drawer
     */
    renderContent() {
        return _.div({ class: 'drawer__content' }, _.each(Game.Models.Player.current.financialRecord.reports, (year, months) => {
            return [_.h4(year), _.each(months, (month, report) => {
                if (report.bTaxIsPaid) {
                    return;
                }

                return _.button({ class: 'widget widget--button' }, month);
            })];
        }));
    }
}

module.exports = FinancialRecordDrawer;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The drawer for VAT reminders and calculations
 */

class VATRecordDrawer extends Game.Views.Drawers.Drawer {
    /**
     * Constructor
     */
    constructor(params) {
        params = params || {};

        params.dueReports = [];
        params.duePayments = [];

        params.model = Game.Models.Player.current.vatRecord;

        super(params);
    }

    /**
     * Gets the drawer position
     */
    get position() {
        return 'bottom';
    }

    /**
     * Renders the preview of this drawer
     */
    renderPreview() {
        return _.div({ class: 'drawer__preview' }, _.label({ class: 'drawer__preview__label' }, 'VAT Record'), _.if(this.dueReports.length > 0 || this.duePayments.length > 0, _.div({ class: 'drawer__preview__notification' }, this.dueReports.length + this.duePayments.length)));
    }

    /**
     * Updates this drawer
     */
    update() {
        this.model.generatePayments();

        this.checkPayments();

        this.fetch();
    }

    /**
     * Checks a payment for any due dates
     *
     * @param {Number} year
     * @param {Number} quarter
     * @param {VATPayment} payment
     */
    checkPayment(year, quarter, payment) {}

    /**
     * Checks all payments
     */
    checkPayments() {
        this.duePayments = [];

        let previousQuarter = Game.Services.TimeService.previousQuarter;
        let currentYear = Game.Services.TimeService.currentYear;

        for (let year in this.model.payments) {
            let paymentYear = this.model.payments[year];

            for (let quarter in paymentYear) {
                if (quarter <= previousQuarter && year == currentYear || year < currentYear) {
                    let payment = paymentYear[quarter];

                    payment.updateFine();

                    if (!payment.isReported || !payment.isPaid) {
                        this.duePayments.push(payment);
                    }
                }
            }
        }
    }

    /**
     * Renders this drawer
     */
    renderContent() {
        return _.div({ class: 'drawer__content' }, _.each(this.model.payments, (year, quarters) => {
            return [_.h4(year), _.each(quarters, (quarter, payment) => {
                if (payment.isPaid || !payment.dueAt) {
                    return;
                }

                return _.button({ class: 'widget widget--button' }, quarter).click(() => {
                    if (!payment.isReported) {
                        new Game.Views.Modals.VATReportingTool({
                            year: year,
                            quarter: quarter
                        });
                    } else {
                        Game.Models.Player.current.payQuarterlyVAT(year, quarter);
                    }
                });
            })];
        }));
    }
}

module.exports = VATRecordDrawer;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Setup extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current.company;

        this.fetch();

        this.sanityCheck();

        this.renderCalculations();
        this.updatePersonalAccount();
    }

    /**
     * Performs a sanity check
     */
    sanityCheck() {
        if (!this.model.name) {
            this.model.name = 'My Company A/S';
            return alert('Company name cannot be empty');
        }

        if (this.model.capital < 0) {
            this.model.capital = 20000;
            return alert('Capital cannot be a negative number');
        }

        if (this.model.unitPrice < 0) {
            this.model.unitPrice = 0;
            return alert('Unit price cannot be a negative number');
        }

        if (this.model.unitProduction < 0) {
            this.model.unitProduction = 0;
            return alert('Unit production cannot be a negative number');
        }

        if (this.model.unitProductionCost < 0) {
            this.model.unitProductionCost = 0;
            return alert('Unit production cost cannot be a negative number');
        }

        if (this.model.demand < 0) {
            this.model.demand = 0;
            return alert('Demand cannot be a negative number');
        }

        if (Game.Models.Player.current.personalAccount < 0) {
            return alert('Your capital cannot exceed your personal account');
        }

        return true;
    }

    /**
     * Updates the personal account
     */
    updatePersonalAccount() {
        Game.Models.Player.current.personalAccount = 50000 - this.model.capital;

        Game.Views.Widgets.PlayerInfo.update();
    }

    /**
     * Renders an input field
     *
     * @param {String} key
     * @param {String} label
     * @param {String} description
     * @param {Boolean} readOnly
     *
     * @returns {HTMLElement} Field element
     */
    renderInputField(key, label, description, readOnly) {
        let type = 'text';

        if (typeof this.model[key] === 'number') {
            type = 'number';
        }

        return _.div({ class: 'page--setup__user-input__field' }, _.h4({ class: 'page--setup__user-input__field__label' }, label || ''), _.div({ class: 'page--setup__user-input__field__description' }, description || ''), _.input({ disabled: readOnly, type: type, class: 'widget widget--input', value: this.model[key] || '' }).on('input', e => {
            if (readOnly) {
                return;
            }

            this.model[key] = e.currentTarget.value;

            this.renderCalculations();
            this.updatePersonalAccount();
        }));
    }

    /**
     * Renders a calculation field
     *
     * @param {String} label
     * @param {String} result
     * @param {String} vat
     */
    renderCalculationField(label, result, vat) {
        return _.div({ class: 'page--setup__calculations__field' }, _.h4({ class: 'page--setup__calculations__field__label' }, label), _.div({ class: 'page--setup__calculations__field__result' }, result), _.if(vat, _.div({ class: 'page--setup__calculations__field__vat' }, 'VAT: ' + vat)));
    }

    /**
     * Renders the calculations
     */
    renderCalculations() {
        let calculations = this.element.querySelector('.page--setup__calculations__inner');

        if (!calculations) {
            return;
        }

        calculations.innerHTML = '';

        _.append(calculations, _.h2({ class: 'page--setup__calculations__heading' }, 'Calculations'), this.renderCalculationField('Sales', this.model.demand + ' × ' + this.model.unitPrice + ' = ' + this.model.estimatedYearlySales, this.model.estimatedYearlySales + ' × 25% = ' + this.model.estimatedYearlySalesVAT), this.renderCalculationField('Cost', -this.model.unitProduction + ' × ' + -this.model.unitProductionCost + ' = ' + -this.model.estimatedYearlyProductionCost, -this.model.estimatedYearlyProductionCost + ' / 125% × 25% = ' + -this.model.estimatedYearlyProductionCostVAT), this.renderCalculationField('Income', this.model.estimatedYearlyIncome), this.renderCalculationField('B-skat', this.model.estimatedYearlyBSkat + ' (' + this.model.estimatedMonthlyBSkat + ' per month)'), this.renderCalculationField('VAT payable', this.model.estimatedYearlySalesVAT + ' - ' + this.model.estimatedYearlyProductionCostVAT + ' = ' + this.model.estimatedYearlyVAT));
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'page page--setup' }, _.div({ class: 'page--setup__numbers' }, _.div({ class: 'page--setup__user-input' }, _.h2({ class: 'page--setup__user-input__heading' }, 'Registration'), this.renderInputField('name', 'Name', 'The name of your company'), _.h2({ class: 'page--setup__user-input__heading' }, 'Business plan'), this.renderInputField('capital', 'Capital', 'How much you, as the owner, will invest for the company\'s spending'), this.renderInputField('unitPrice', 'Unit price', 'How much you want to charge for your product'), this.renderInputField('unitProduction', 'Unit production', 'How many units you plan to produce in a year'), this.renderInputField('unitProductionCost', 'Production cost', 'How much a single unit costs to make', true), this.renderInputField('demand', 'Demand estimate', 'How many units you assume people will buy in a year')), _.div({ class: 'page--setup__calculations' }, _.div({ class: 'page--setup__calculations__inner' }))), _.div({ class: 'page--setup__actions' }, _.button({ class: 'widget widget--button' }, 'Start game').click(e => {
            if (!this.sanityCheck()) {
                return;
            }

            this.model.bankBalance = this.model.capital;

            this.model.save();

            Game.Services.ConfigService.set('completedSetup', true);
            Game.Services.TimeService.startClock();

            Crisp.Router.init();
        })));
    }
}

module.exports = Setup;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const MACHINE_DELAY = 4;

let machineCounter = 0;

class Level extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;

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
        // Tick time 
        Game.Services.TimeService.tick();

        // Sell one unit every second
        this.model.company.sellUnit();

        // Automatically produce units
        machineCounter++;

        if (machineCounter >= MACHINE_DELAY) {
            for (let i = 0; i < this.model.company.machines; i++) {
                this.model.company.produceUnit();
            }

            machineCounter = 0;
        }

        // Update the VAT record drawer
        Game.Views.Drawers.VATRecordDrawer.update();

        // Update the financial record drawer
        Game.Views.Drawers.FinancialRecordDrawer.update();

        // Render the level
        this._render();

        // Save the current state
        this.model.save();
    }

    /**
     * Renders an input field
     *
     * @param {String} key
     * @param {String} label
     * @param {String} description
     * @param {Boolean} readOnly
     *
     * @returns {HTMLElement} Field element
     */
    renderInputField(key, label, description, readOnly) {
        let type = 'text';

        if (typeof this.model.company[key] === 'number') {
            type = 'number';
        }

        return _.div({ class: 'page--level__user-input__field' }, _.h4({ class: 'page--level__user-input__field__label' }, label || ''), _.div({ class: 'page--level__user-input__field__description' }, description || ''), _.input({ disabled: readOnly, type: type, class: 'widget widget--input', value: this.model.company[key] || '' }).on('change', e => {
            if (readOnly) {
                return;
            }

            this.model.company[key] = e.currentTarget.value;

            this.model.save();
            Game.Views.Widgets.PlayerInfo.update();

            this.fetch();
        }));
    }

    /**
     * Renders a button
     *
     * @param {String} key
     * @param {String} label
     * @param {String} description
     * @param {String} action
     * @param {Function} onClick
     *
     * @returns {HTMLElement} Field element
     */
    renderButton(key, label, description, action, onClick) {
        return _.div({ class: 'page--level__user-input__field' }, _.h4({ class: 'page--level__user-input__field__label' }, (label || '') + ': ' + this.model.company[key]), _.div({ class: 'page--level__user-input__field__description' }, description || ''), _.button({ class: 'widget widget--button' }, action).on('click', e => {
            onClick();

            this.model.save();
            Game.Views.Widgets.PlayerInfo.update();

            this.fetch();
        }));
    }

    /**
     * Renders a calculation field
     *
     * @param {String} label
     * @param {String} result
     */
    renderCalculationField(label, result) {
        return _.div({ class: 'page--level__calculations__field' }, _.h4({ class: 'page--level__calculations__field__label' }, label), _.div({ class: 'page--level__calculations__field__result' }, result));
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'page page--level' }, _.div({ class: 'page--level__numbers' }, _.div({ class: 'page--level__user-input' }, this.renderInputField('unitPrice', 'Unit price'), this.renderButton('machines', 'Machines', 'Price: 10000 kr.', 'Purchase', () => {
            this.model.company.purchaseMachine();
        }), this.renderButton('inventory', 'Inventory', 'Cost: ' + this.model.company.unitProductionCost + ' kr.', 'Produce', () => {
            this.model.company.produceUnit();
        })), _.div({ class: 'page--level__calculations' }, _.div({ class: 'page--level__calculations__inner' }, this.renderCalculationField('Sales', this.model.financialRecord.currentReport.sales + ' kr.'), this.renderCalculationField('Production cost', this.model.financialRecord.currentReport.productionCost + ' kr.')))));
    }
}

module.exports = Level;

/***/ }),
/* 21 */
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

        Crisp.Router.init();
    }

    /**
     * Index route
     */
    static index() {
        Crisp.View.clear(Crisp.View);

        if (!Game.Services.ConfigService.get('completedSetup')) {
            _.append(document.body, new Game.Views.Widgets.PlayerInfo(), new Game.Views.Pages.Setup());
        } else {
            _.append(document.body, new Game.Views.Widgets.DebugMenu(), new Game.Views.Widgets.PlayerInfo(), new Game.Views.Pages.Level());
            _.append(_.find('.drawers.bottom'), new Game.Views.Drawers.FinancialRecordDrawer(), new Game.Views.Drawers.VATRecordDrawer());
        }
    }
}

ViewController.init();

module.exports = ViewController;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map