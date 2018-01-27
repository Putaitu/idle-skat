/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	window._ = Crisp.Elements;

	window.Game = {};

	Game.Services = {};
	Game.Services.ConfigService = __webpack_require__(1);

	Game.Models = {};
	Game.Models.Entity = __webpack_require__(2);
	Game.Models.Player = __webpack_require__(3);
	Game.Models.Company = __webpack_require__(4);

	Game.Views = {};
	Game.Views.Pages = {};
	Game.Views.Pages.Setup = __webpack_require__(5);

	Game.Controllers = {};
	Game.Controllers.ViewController = __webpack_require__(6);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The service for user config stored in localStorage
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ConfigService = function () {
	    function ConfigService() {
	        _classCallCheck(this, ConfigService);
	    }

	    _createClass(ConfigService, null, [{
	        key: 'set',

	        /**
	         * Sets a value
	         *
	         * @param {String} key
	         * @param {Object} value
	         */
	        value: function set(key, value) {
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

	    }, {
	        key: 'get',
	        value: function get(key) {
	            try {
	                return JSON.parse(localStorage.getItem(key));
	            } catch (e) {
	                return localStorage.getItem(key);
	            }
	        }
	    }]);

	    return ConfigService;
	}();

	module.exports = ConfigService;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The base model for everything
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Entity = function () {
	    /**
	     * Constructor
	     *
	     * @param {Object} params
	     */
	    function Entity(params) {
	        _classCallCheck(this, Entity);

	        this.structure();

	        if (params && params instanceof Object === false && Array.isArray(params)) {
	            for (var k in params) {
	                this[k] = params[k];
	            }
	        }

	        Object.seal(this);
	    }

	    /**
	     * Defines the structure of this model
	     */


	    _createClass(Entity, [{
	        key: 'structure',
	        value: function structure() {}
	    }]);

	    return Entity;
	}();

	module.exports = Entity;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The player model
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Player = function (_Game$Models$Entity) {
	  _inherits(Player, _Game$Models$Entity);

	  _createClass(Player, [{
	    key: 'structure',

	    /**
	     * Structure
	     */
	    value: function structure() {
	      this.personalAccount = 0;
	      this.company = new Game.Models.Company();
	    }

	    /**
	     * Constructor
	     */

	  }]);

	  function Player(params) {
	    _classCallCheck(this, Player);

	    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, params));

	    _this.company = new Game.Models.Company(_this.company);
	    return _this;
	  }

	  /**
	   * Loads the player data
	   *
	   * @returns {Player} Player
	   */


	  _createClass(Player, null, [{
	    key: 'load',
	    value: function load() {
	      return new Player(Game.Services.ConfigService.get('player'));
	    }
	  }]);

	  return Player;
	}(Game.Models.Entity);

	module.exports = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The main company model
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Company = function (_Game$Models$Entity) {
	  _inherits(Company, _Game$Models$Entity);

	  function Company() {
	    _classCallCheck(this, Company);

	    return _possibleConstructorReturn(this, (Company.__proto__ || Object.getPrototypeOf(Company)).apply(this, arguments));
	  }

	  _createClass(Company, [{
	    key: 'structure',

	    /**
	     * Structure
	     */
	    value: function structure() {
	      this.name = '';
	      this.capital = 0;
	      this.unitPrice = 0;
	      this.unitProduction = 0;
	    }

	    /**
	     * Gets the estimated demand
	     */

	  }, {
	    key: 'save',


	    /**
	     * Saves this company
	     */
	    value: function save() {
	      Game.Services.ConfigService.set('company', this);
	    }
	  }, {
	    key: 'estimatedDemand',
	    get: function get() {
	      return this.unitPrice * 500;
	    }

	    /**
	     * Gets the estimated total sales
	     */

	  }, {
	    key: 'estimatedTotalSales',
	    get: function get() {
	      return this.estimatedDemand * this.unitPrice;
	    }

	    /**
	     * Gets the estimated total cost
	     */

	  }, {
	    key: 'estimatedTotalCost',
	    get: function get() {
	      return this.unitProduction * this.productionCost;
	    }

	    /**
	     * Gets the estimated income
	     */

	  }, {
	    key: 'estimatedIncome',
	    get: function get() {
	      return this.estimatedTotalSales - this.estimatedTotalCost;
	    }

	    /**
	     * Gets the production cost
	     */

	  }, {
	    key: 'productionCost',
	    get: function get() {
	      return 10;
	    }
	  }]);

	  return Company;
	}(Game.Models.Entity);

	module.exports = Company;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Setup = function (_Crisp$View) {
	    _inherits(Setup, _Crisp$View);

	    /**
	     * Constrcutor
	     */
	    function Setup(params) {
	        _classCallCheck(this, Setup);

	        var _this = _possibleConstructorReturn(this, (Setup.__proto__ || Object.getPrototypeOf(Setup)).call(this, params));

	        _this.model = Game.Models.Player.load().company;

	        _this.fetch();

	        _this.renderEstimates();
	        return _this;
	    }

	    /**
	     * Renders a field
	     *
	     * @param {String} key
	     * @param {String} label
	     * @param {String} description
	     * @param {Boolean} readOnly
	     * @param {Function} calculation
	     *
	     * @returns {HTMLElement} Field element
	     */


	    _createClass(Setup, [{
	        key: 'renderField',
	        value: function renderField(key, label, description, readOnly, calculation) {
	            var _this2 = this;

	            if (typeof calculation !== 'function') {
	                calculation = function calculation(value) {
	                    return '';
	                };
	            }

	            var calculationField = void 0;

	            return _.div({ class: 'page--setup__user-input__field' }, _.h4({ class: 'page--setup__user-input__field__label' }, label || ''), _.input({ disabled: readOnly, class: 'page--setup__user-input__field__input', value: this.model[key] || '' }).on('input', function (e) {
	                if (readOnly) {
	                    return;
	                }

	                _this2.model[key] = e.currentTarget.value;

	                calculationField.innerHTML = calculation(_this2.model[key]);

	                _this2.renderEstimates();
	            }), calculationField = _.div({ class: 'page--setup__user-input__field__calculation' }, calculation(this.model[key])), _.div({ class: 'page--setup__user-input__field__description' }, description || ''));
	        }

	        /**
	         * Renders the estimates
	         */

	    }, {
	        key: 'renderEstimates',
	        value: function renderEstimates() {
	            var estimates = this.element.querySelector('.page--setup__estimates');

	            if (!estimates) {
	                return;
	            }

	            estimates.innerHTML = '';

	            _.append(estimates, _.h2({ class: 'page--setup__estimates__heading' }, 'Estimates'), _.div({ class: 'page--setup__estimates__field' }, _.h4({ class: 'page--setup__estimates__field__label' }, 'Total sales'), _.div({ class: 'page--setup__estimates__field__calculation' }, this.model.estimatedDemand + ' × ' + this.model.unitPrice), _.div({ class: 'page--setup__estimates__field__result' }, this.model.estimatedTotalSales), _.div({ class: 'page--setup__estimates__field__vat' }, 'VAT: ' + this.model.estimatedTotalSales + ' × 25% = ' + this.model.estimatedTotalSales * 0.25)), _.div({ class: 'page--setup__estimates__field' }, _.h4({ class: 'page--setup__estimates__field__label' }, 'Total cost'), _.div({ class: 'page--setup__estimates__field__calculation' }, this.model.unitProduction + ' × ' + this.model.productionCost), _.div({ class: 'page--setup__estimates__field__result' }, this.model.estimatedTotalCost), _.div({ class: 'page--setup__estimates__field__vat' }, 'VAT: ' + this.model.estimatedTotalCost + ' / 125% * 25% = ' + this.model.estimatedTotalCost / 1.25 * 0.25)), _.div({ class: 'page--setup__estimates__field' }, _.h4({ class: 'page--setup__estimates__field__label' }, 'Estimated income'), _.div({ class: 'page--setup__estimates__field__result' }, this.model.estimatedIncome)));
	        }

	        /**
	         * Template
	         */

	    }, {
	        key: 'template',
	        value: function template() {
	            return _.div({ class: 'page page--setup' }, _.div({ class: 'page--setup__user-input' }, this.renderField('name', 'Name'), this.renderField('capital', 'Capital', 'How much you, as the owner, invest for the company\'s spending'), this.renderField('unitPrice', 'Unit price', 'How much you want to charge for your product'), this.renderField('unitProduction', 'Unit production', 'How many units you plan to produce in a year'), this.renderField('estimatedDemand', 'Estimated demand', 'How many units people will buy, based on the set price', true), this.renderField('productionCost', 'Production cost', 'How much a single unit costs to make', true)), _.div({ class: 'page--setup__estimates' }));
	        }
	    }]);

	    return Setup;
	}(Crisp.View);

	module.exports = Setup;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * The view controller
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ViewController = function () {
	    function ViewController() {
	        _classCallCheck(this, ViewController);
	    }

	    _createClass(ViewController, null, [{
	        key: 'init',

	        /**
	         * Initialise routes
	         */
	        value: function init() {
	            Crisp.Router.route('/', this.index);

	            Crisp.Router.init();
	        }

	        /**
	         * Index route
	         */

	    }, {
	        key: 'index',
	        value: function index() {
	            Crisp.View.clear(Crisp.View);

	            _.append(document.body, new Game.Views.Pages.Setup());
	        }
	    }]);

	    return ViewController;
	}();

	ViewController.init();

	module.exports = ViewController;

/***/ })
/******/ ]);