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
	Game.Services.ConfigService = __webpack_require__(3);

	Game.Views = {};
	Game.Views.Pages = {};
	Game.Views.Pages.Setup = __webpack_require__(1);

	Game.Controllers = {};
	Game.Controllers.ViewController = __webpack_require__(2);

/***/ }),
/* 1 */
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

	        _this.model = Game.Services.ConfigService.get('setup') || {};

	        _this.fetch();
	        return _this;
	    }

	    /**
	     * Renders a field
	     *
	     * @param {String} key
	     * @param {String} label
	     * @param {String} description
	     *
	     * @returns {HTMLElement} Field element
	     */


	    _createClass(Setup, [{
	        key: 'renderField',
	        value: function renderField(key, label, description) {
	            return _.div({ class: 'page--setup__user-input__field' }, _.div({ class: 'page--setup__user-input__field__label' }, label), _.input({ class: 'page--setup__user-input__field__input', value: this.model[key] }), _.div({ class: 'page--setup__user-input__field__description' }, description));
	        }

	        /**
	         * Template
	         */

	    }, {
	        key: 'template',
	        value: function template() {
	            return _.div({ class: 'page page--setup' }, _.div({ class: 'page--setup__user-input' }, this.renderField('capital', 'Capital', 'How much you, as the owner, invest for the company\'s spending'), this.renderField('unitPrice', 'Unit price', 'How much you want to charge for your product')), _.div({ class: 'page--setup__output' }));
	        }
	    }]);

	    return Setup;
	}(Crisp.View);

	module.exports = Setup;

/***/ }),
/* 2 */
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

/***/ }),
/* 3 */
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

/***/ })
/******/ ]);