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
 * Resets the game
 */
window.reset = function reset() {
    localStorage.clear();

    location.reload();
};

window._ = Crisp.Elements;

window.Game = {};

Game.Services = {};
Game.Services.ConfigService = __webpack_require__(2);
Game.Services.TimeService = __webpack_require__(14);
Game.Services.DebugService = __webpack_require__(3);

Game.Models = {};
Game.Models.Entity = __webpack_require__(4);
Game.Models.Player = __webpack_require__(5);
Game.Models.Company = __webpack_require__(6);
Game.Models.Summary = __webpack_require__(16);

Game.Views = {};
Game.Views.Widgets = {};
Game.Views.Widgets.PlayerInfo = __webpack_require__(7);
Game.Views.Pages = {};
Game.Views.Pages.Setup = __webpack_require__(8);
Game.Views.Pages.Level = __webpack_require__(15);

Game.Controllers = {};
Game.Controllers.ViewController = __webpack_require__(9);

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
}

module.exports = DebugService;

/***/ }),
/* 4 */
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
/* 5 */
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
    }

    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.company = new Game.Models.Company(this.company);
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
}

module.exports = Player;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const MACHINE_PRICE = 200;
const MACHINE_CAPACITY = 10;

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
        this.unitPrice = 20;
        this.unitProduction = 5000;
        this.unitProductionCost = 10;
        this.demand = 10000;

        this.inventory = 0;
        this.machines = 0;
        this.summaries = {};
    }

    /**
     * Rounds a number by 2 decimal places
     */
    round(num) {
        return Math.round(num * 100) / 100;
    }

    /**
     * Gets the current summary
     */
    get currentSummary() {
        let time = Game.Services.TimeService.currentTime;

        if (!this.summaries[time.getFullYear()]) {
            this.summaries[time.getFullYear()] = {};
        }

        if (!this.summaries[time.getFullYear()][time.getMonth() + 1]) {
            this.summaries[time.getFullYear()][time.getMonth() + 1] = new Game.Models.Summary();
        }

        return this.summaries[time.getFullYear()][time.getMonth() + 1];
    }

    /**
     * Gets the production capacity
     */
    get productionCapacity() {
        return this.machines * MACHINE_CAPACITY;
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

        this.capital += this.unitPrice;
        this.currentSummary.sales += this.unitPrice;
    }

    /**
     * Produces a number of units
     */
    produceUnits() {
        if (this.capital < this.unitProductionCost * this.productionCapacity) {
            return alert('You do not have enough capital to produce more units');
        }

        this.inventory += this.productionCapacity;

        this.capital -= this.unitProductionCost * this.productionCapacity;
        this.currentSummary.productionCost += this.unitProductionCost * this.productionCapacity;
    }

    /**
     * Purchases a machine
     */
    purchaseMachine() {
        if (this.capital < MACHINE_PRICE) {
            return alert('You do not have enough capital to purchase more machines');
        }

        this.machines++;

        this.capital -= MACHINE_PRICE;
        this.currentSummary.productionCost += MACHINE_PRICE;
    }
}

module.exports = Company;

/***/ }),
/* 7 */
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

        this.fetch();

        setInterval(() => {
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
     * Template
     */
    template() {
        return _.div({ class: 'widget widget--player-info' }, _.input({ type: 'checkbox', class: 'widget widget--player-info__toggle', checked: this.isExpanded }), _.div({ class: 'widget--player-info__area company' }, _.h4({ class: 'widget--player-info__area__heading' }, 'Company'), _.div({ class: 'widget--player-info__area__icon' }, '🏭'), _.div({ class: 'widget--player-info__area__preview' }, this.model.company.name + ': ' + this.model.company.capital), _.div({ class: 'widget--player-info__area__data' }, 'Name: ' + this.model.company.name, '<br>', 'Capital: ' + this.model.company.capital)), _.div({ class: 'widget--player-info__area personal-account' }, _.h4({ class: 'widget--player-info__area__heading' }, 'Personal account'), _.div({ class: 'widget--player-info__area__icon' }, '💰'), _.div({ class: 'widget--player-info__area__preview' }, this.model.personalAccount.toString()), _.div({ class: 'widget--player-info__area__data' }, 'Balance: ' + this.model.personalAccount)), _.div({ class: 'widget--player-info__area calendar' }, _.h4({ class: 'widget--player-info__area__heading' }, 'Calendar'), _.div({ class: 'widget--player-info__area__icon' }, '🗓'), _.div({ class: 'widget--player-info__area__preview' }, this.getTimeString()), _.div({ class: 'widget--player-info__area__data' }, 'Time: ' + this.getTimeString())));
    }
}

module.exports = PlayerInfo;

/***/ }),
/* 8 */
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

        _.append(calculations, _.h2({ class: 'page--setup__calculations__heading' }, 'Calculations'), this.renderCalculationField('Sales', this.model.demand + ' × ' + this.model.unitPrice + ' = ' + this.model.estimatedYearlySales, this.model.estimatedYearlySales + ' × 25% = ' + this.model.estimatedYearlySalesVAT), this.renderCalculationField('Cost', this.model.unitProduction + ' × ' + this.model.unitProductionCost + ' = ' + this.model.estimatedYearlyProductionCost, this.model.estimatedYearlyProductionCost + ' / 125% × 25% = ' + this.model.estimatedYearlyProductionCostVAT), this.renderCalculationField('Income', this.model.estimatedYearlyIncome), this.renderCalculationField('B-skat', this.model.estimatedYearlyBSkat + ' (' + this.model.estimatedMonthlyBSkat + ' per month)'), this.renderCalculationField('VAT', this.model.estimatedYearlySalesVAT + ' - ' + this.model.estimatedYearlyProductionCostVAT + ' = ' + this.model.estimatedYearlyVAT));
    }

    /**
     * Template
     */
    template() {
        return _.div({ class: 'page page--setup' }, _.div({ class: 'page--setup__numbers' }, _.div({ class: 'page--setup__user-input' }, _.h2({ class: 'page--setup__user-input__heading' }, 'Registration'), this.renderInputField('name', 'Name', 'The name of your company'), _.h2({ class: 'page--setup__user-input__heading' }, 'Business plan'), this.renderInputField('capital', 'Capital', 'How much you, as the owner, will invest for the company\'s spending'), this.renderInputField('unitPrice', 'Unit price', 'How much you want to charge for your product'), this.renderInputField('unitProduction', 'Unit production', 'How many units you plan to produce in a year'), this.renderInputField('unitProductionCost', 'Production cost', 'How much a single unit costs to make'), this.renderInputField('demand', 'Demand', 'How many units people will buy')), _.div({ class: 'page--setup__calculations' }, _.div({ class: 'page--setup__calculations__inner' }))), _.div({ class: 'page--setup__actions' }, _.button({ class: 'widget widget--button' }, 'Start game').click(e => {
            if (!this.sanityCheck()) {
                return;
            }

            this.model.save();

            Game.Services.ConfigService.set('completedSetup', true);
            Game.Services.TimeService.startClock();

            Crisp.Router.init();
        })));
    }
}

module.exports = Setup;

/***/ }),
/* 9 */
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
            _.append(document.body, new Game.Views.Widgets.PlayerInfo(), new Game.Views.Pages.Level());
        }
    }
}

ViewController.init();

module.exports = ViewController;

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const TIME_SPEED = 6000;

/**
 * The service for managing time
 */
class TimeService {
  /**
   * Gets the start time
   */
  static get startTime() {
    return new Date(Game.Services.ConfigService.get('startTime') || Date.now());
  }

  /**
   * Starts the clock
   */
  static startClock() {
    Game.Services.ConfigService.set('startTime', Date.now());
  }

  /**
   * Gets the current time
   */
  static get currentTime() {
    return new Date(new Date().getTime() + (new Date().getTime() - this.startTime.getTime()) * TIME_SPEED);
  }
}

module.exports = TimeService;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Level extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current.company;

        this.fetch();

        setInterval(() => {
            this.heartbeat();
        }, 1000);
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.model.sellUnit();

        this._render();

        Game.Models.Player.current.save();
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

        return _.div({ class: 'page--level__user-input__field' }, _.h4({ class: 'page--level__user-input__field__label' }, label || ''), _.div({ class: 'page--level__user-input__field__description' }, description || ''), _.input({ disabled: readOnly, type: type, class: 'widget widget--input', value: this.model[key] || '' }).on('change', e => {
            if (readOnly) {
                return;
            }

            this.model[key] = e.currentTarget.value;

            Game.Models.Player.current.save();
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
        return _.div({ class: 'page--level__user-input__field' }, _.h4({ class: 'page--level__user-input__field__label' }, (label || '') + ': ' + this.model[key]), _.div({ class: 'page--level__user-input__field__description' }, description || ''), _.button({ class: 'widget widget--button' }, action).on('click', e => {
            onClick();

            Game.Models.Player.current.save();
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
        return _.div({ class: 'page page--level' }, _.div({ class: 'page--level__numbers' }, _.div({ class: 'page--level__user-input' }, this.renderInputField('unitPrice', 'Unit price'), this.renderButton('machines', 'Machines', 'Price: 200', 'Purchase', () => {
            this.model.purchaseMachine();
        }), this.renderButton('inventory', 'Inventory', 'Capacity: ' + this.model.productionCapacity + ' / Cost: ' + this.model.productionCapacity * this.model.unitProductionCost, 'Produce', () => {
            this.model.produceUnits();
        })), _.div({ class: 'page--level__calculations' }, _.div({ class: 'page--level__calculations__inner' }, this.renderCalculationField('Sales', this.model.currentSummary.sales || '0'), this.renderCalculationField('Production cost', this.model.currentSummary.productionCost || '0')))));
    }
}

module.exports = Level;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A monthly summary
 */

class Summary extends Game.Models.Entity {
  /**
   * Structure
   */
  structure() {
    this.sales = 0;
    this.productionCost = 0;
  }
}

module.exports = Summary;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map