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
Game.Views.Widgets.ProgressBar = __webpack_require__(14);

Game.Views.Modals = {};
Game.Views.Modals.Modal = __webpack_require__(15);
Game.Views.Modals.VATReportingTool = __webpack_require__(16);

Game.Views.Drawers = {};
Game.Views.Drawers.Drawer = __webpack_require__(17);
Game.Views.Drawers.FinancialRecordDrawer = __webpack_require__(18);
Game.Views.Drawers.VATRecordDrawer = __webpack_require__(19);
Game.Views.Drawers.Timeline = __webpack_require__(20);
Game.Views.Drawers.Notifications = __webpack_require__(21);

Game.Views.Charts = {};
Game.Views.Charts.PieChart = __webpack_require__(22);

Game.Views.Pages = {};
Game.Views.Pages.Setup = __webpack_require__(23);
Game.Views.Pages.BSkatEstimation = __webpack_require__(24);
Game.Views.Pages.Session = __webpack_require__(25);

// -------------------
// Controllers
// -------------------
Game.Controllers = {};
Game.Controllers.ViewController = __webpack_require__(26);

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

        if (message) {
            this.message += '<br>' + message;
        }

        this._render();
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'widget widget--progress-bar' }, _.progress({ class: 'widget--progress-bar__progress', value: this.value, max: this.max }), _.if(this.message, _.div({ class: 'widget--progress-bar__message' }, this.message)));
    }
}

module.exports = ProgressBar;

/***/ }),
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
                message: 'VAT payment was due on ' + date.prettyPrint() + ', but was not paid',
                action: {
                    label: 'Pay VAT',
                    onClick: 'onClickPayVAT'
                }
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
                    label: 'Pay VAT',
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
                    label: 'Pay B tax',
                    onClick: 'onClickPayBTax'
                }
            };
        }

        // B tax payment due
        if (date.getDate() === 22) {
            return {
                type: 'alert',
                title: 'B tax due',
                message: 'B tax payment was due on ' + date.prettyPrint() + ', but was not paid',
                action: {
                    label: 'Pay B-skat',
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
        let currentDate = Game.Services.TimeService.currentDate;

        if (this.lastDate !== currentDate) {
            this._render();
        }

        this.lastDate = currentDate;
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

        return _.div({ class: 'drawer__preview drawer--timeline__scroller' }, _.div({ class: 'drawer--timeline__scroller__year' }, date.getFullYear()), _.div({ class: 'drawer--timeline__scroller__month' }, date.getMonthName()), _.div({ class: 'drawer--timeline__scroller__days' }, _.loop(30, day => {
            let currentDate = new Date(date);

            currentDate.addDays(day);
            currentDate.reset();

            let notification = this.getNotification(currentDate);

            if (notification && day === 0) {
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
/* 21 */
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
     * Cleans up expired notifications
     */
    cleanExpired() {
        let date = Game.Services.TimeService.currentTime;
        let hasChanged = false;

        for (let key in this.model) {
            let entry = this.model[key];

            if (entry.expiresOn && entry.expiresOn.getTime() <= date.getTime()) {
                delete this.model[key];
                hasChanged = true;
            }
        }

        if (hasChanged) {
            this.save();
        }
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
        this.cleanExpired();
        this.update();
    }

    /**
     * Renders the preview
     */
    renderPreview() {
        let currentDate = Game.Services.TimeService.currentTime;

        return _.div({ class: 'drawer__preview drawer--notifications__entries' }, _.each(this.model, (key, notification) => {
            return _.div({ class: 'drawer--notifications__entry' }, _.do(() => {
                if (!notification.expiresOn) {
                    return;
                }

                let percent = (currentDate.getTime() - notification.createdOn.getTime()) / (notification.expiresOn.getTime() - notification.createdOn.getTime()) * 100;

                if (percent >= 100) {
                    percent = 100;
                }

                return _.div({ 'data-cr-dynamic': true, class: 'drawer--notifications__entry__progress', style: 'width: ' + percent + '%' });
            }), _.if(notification.title, _.div({ class: 'drawer--notifications__entry__title' }, notification.title)), _.if(notification.message, _.div({ class: 'drawer--notifications__entry__message' }, notification.message)), _.do(() => {
                if (!notification.action) {
                    return;
                }

                return _.button({ class: 'drawer--notifications__entry__action widget widget--button ' + (notification.type || '') }, notification.action.label).click(e => {
                    e.currentTarget.parentElement.classList.toggle('out', true);

                    setTimeout(() => {
                        delete this.model[key];
                        this.save();
                    }, 500);

                    if (typeof this[notification.action.onClick] !== 'function') {
                        return;
                    }

                    this[notification.action.onClick](key);
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
     * @param {String} key
     */
    onClickPayBTax() {
        alert('Pay B tax');
    }

    /**
     * Event: Click pay VAT
     *
     * @param {String} key
     */
    onClickPayVAT() {
        alert('Pay VAT');
    }

    /**
     * Event: Click report VAT
     *
     * @param {String} key
     */
    onClickReportVAT() {
        alert('Report VAT');
    }
}

module.exports = Notifications;

/***/ }),
/* 22 */
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
/* 23 */
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
            total: 30000,
            capital: 3000
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
        Game.Services.ConfigService.set('personalAccount', this.model.total - this.model.capital);
        Game.Services.ConfigService.set('companyAccount', this.model.capital);
        Game.Services.ConfigService.set('companyName', this.model.name);

        Crisp.Router.go('/b-skat-estimation');
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The B-skat estimation page
 */

class BSkatEstimation extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = {
            income: 96000,
            bskat: 0
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
        this.model.bskat = 0;
        this.finalBSkat.innerHTML = '';

        this.updatePieChart();
    }

    /**
     * Updates the pie chart
     */
    updatePieChart() {
        if (!this.pieChart) {
            return;
        }

        this.pieChart.setSlice('bskat', 0.33, {
            percent: this.model.bskat / this.model.income,
            value: this.model.bskat
        });

        this.pieChart.setSlice('income', 0.33, {
            percent: 1 - this.model.bskat / this.model.income,
            value: this.model.income
        });
    }

    /**
     * Wraps setTimeout in a promise
     *
     * @param {Number} timeout
     *
     * @returns {Promise} Callback
     */
    wait(timeout) {
        timeout = timeout || 0;
        timeout *= 1000;

        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }

    /**
     * Event: Click calculate
     *
     * @param {InputEvent} e
     */
    onClickCalculate(e) {
        let progressBar = new Game.Views.Widgets.ProgressBar();

        progressBar.setProgress(0, 100, 'Municipality tax...');

        this.wait(1).then(() => {
            progressBar.setProgress(20, 100, 'Labour contribution...');

            return this.wait(1);
        }).then(() => {
            progressBar.setProgress(30, 100, 'Step 3...');

            return this.wait(1);
        }).then(() => {
            progressBar.setProgress(40, 100, 'Step 4...');

            return this.wait(1);
        }).then(() => {
            progressBar.setProgress(50, 100, 'Step 5...');

            return this.wait(1);
        }).then(() => {
            progressBar.setProgress(60, 100, 'Step 6...');

            return this.wait(1);
        }).then(() => {
            progressBar.setProgress(70, 100, 'Step 7...');

            return this.wait(1);
        }).then(() => {
            progressBar.setProgress(80, 100, 'Step 8...');

            return this.wait(1);
        }).then(() => {
            progressBar.setProgress(90, 100, 'Step 9...');

            return this.wait(1);
        }).then(() => {
            progressBar.setProgress(100, 100, 'Done!');

            return this.wait(1);
        }).then(() => {
            this.model.bskat = this.model.income * 0.38;

            progressBar.remove();

            this.updatePieChart();

            this.finalBSkat.innerHTML = this.model.bskat + ' / 12 = <span>' + Math.round(this.model.bskat / 12) + 'kr. per month</span>';
        });
    }

    /**
     * Event: Click done
     *
     * @param {InputEvent} e
     */
    onClickDone(e) {
        if (this.model.bskat <= 0) {
            return alert('Please calculate your B-skat first');
        }

        location.hash = '/session';
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'page page--b-skat-estimation' }, _.h1({ class: 'page__title' }, 'B-skat estimation'), _.div({ class: 'page--b-skat-estimation__input' }, _.div({ class: 'widget-group align-center' }, _.label({ class: 'widget widget--label' }, 'Target income for ' + Game.Services.TimeService.currentYear), _.input({ class: 'widget widget--input', type: 'number', step: 1000, min: 0, value: this.model.income }).on('input', e => {
            this.onChangeIncome(e);
        })), _.button({ class: 'widget widget--button align-center' }, 'Calculate').click(e => {
            this.onClickCalculate(e);
        })), this.pieChart = new Game.Views.Charts.PieChart({
            className: 'page--b-skat-estimation__pie-chart',
            showPercentage: true,
            model: {
                bskat: { showPercentage: true, percent: this.model.bskat / this.model.income, label: 'B-skat', value: this.model.bskat, color: 'blue' },
                income: { percent: 1 - this.model.bskat / this.model.income, label: 'Target income', color: 'green', value: this.model.income }
            }
        }), this.finalBSkat = _.div({ class: 'page--b-skat-estimation__final' }), _.button({ class: 'widget widget--button align-right' }, 'Done').click(e => {
            this.onClickDone(e);
        }));
    }
}

module.exports = BSkatEstimation;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const MACHINE_DELAY = 4;

let machineCounter = 0;

class Session extends Crisp.View {
    /**
     * Constructor
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
        if (!document.hasFocus()) {
            return;
        }

        // Tick time 
        Game.Services.TimeService.tick();

        this.timeline.heartbeat();
        this.notifications.heartbeat();

        /*
        // Sell one unit every second
        this.model.company.sellUnit();
         // Automatically produce units
        machineCounter++;
        
        if(machineCounter >= MACHINE_DELAY) {
            for(let i = 0; i < this.model.company.machines; i++) {
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
        */

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
        })) /*,
            _.div({class: 'page--level__calculations'},
               _.div({class: 'page--level__calculations__inner'},
                   this.renderCalculationField('Sales', this.model.financialRecord.currentReport.sales + ' kr.'),
                   this.renderCalculationField('Production cost', this.model.financialRecord.currentReport.productionCost + ' kr.') 
               )
            )*/
        ), this.notifications = new Game.Views.Drawers.Notifications(), this.timeline = new Game.Views.Drawers.Timeline());
    }
}

module.exports = Session;

/***/ }),
/* 26 */
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
        Crisp.Router.route('/b-skat-estimation', this.bskat);
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
     * B-skat
     */
    static bskat() {
        _.replace(document.body, new Game.Views.Pages.BSkatEstimation());
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