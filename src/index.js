'use strict';

require('./Style/index.scss');

/**
 * Adds hours to a date
 */
Date.prototype.addHours = function(h) {    
    this.setTime(this.getTime() + (h*60*60*1000)); 
    return this;   
}

/**
 * Gets quarter from a date
 */
Date.prototype.getQuarter = function() {
    let month = this.getMonth() + 1;

    if(month <= 3) { return 1; }
    if(month <= 6) { return 2; }
    if(month <= 9) { return 3; }
    return 4;
}

/**
 * Pretty prints a date
 */
Date.prototype.prettyPrint = function() {
    let string = this.getFullYear() + '-';

    if(this.getMonth() + 1 < 10) {
        string += '0';
    }

    string += (this.getMonth() + 1) + '-';
    
    if(this.getDate() < 10) {
        string += '0';
    }

    string += this.getDate();

    return string;
}

window._ = Crisp.Elements;

window.Game = {};

// -------------------
// Services
// -------------------
Game.Services = {};
Game.Services.ConfigService = require('./Services/ConfigService');
Game.Services.TimeService = require('./Services/TimeService');
Game.Services.DebugService = require('./Services/DebugService');

// -------------------
// Models
// -------------------
Game.Models = {};
Game.Models.Entity = require('./Models/Entity');
Game.Models.Player = require('./Models/Player');
Game.Models.Company = require('./Models/Company');
Game.Models.Report = require('./Models/Report');
Game.Models.VATRecord = require('./Models/VATRecord');
Game.Models.VATPayment = require('./Models/VATPayment');
Game.Models.FinancialRecord = require('./Models/FinancialRecord');

// -------------------
// Views
// -------------------
Game.Views = {};

Game.Views.Widgets = {};
Game.Views.Widgets.PlayerInfo = require('./Views/Widgets/PlayerInfo');
Game.Views.Widgets.DebugMenu = require('./Views/Widgets/DebugMenu');
Game.Views.Widgets.ProgressBar = require('./Views/Widgets/ProgressBar');

Game.Views.Modals = {};
Game.Views.Modals.Modal = require('./Views/Modals/Modal');
Game.Views.Modals.VATReportingTool = require('./Views/Modals/VATReportingTool');

Game.Views.Drawers = {};
Game.Views.Drawers.Drawer = require('./Views/Drawers/Drawer');
Game.Views.Drawers.FinancialRecordDrawer = require('./Views/Drawers/FinancialRecordDrawer');
Game.Views.Drawers.VATRecordDrawer = require('./Views/Drawers/VATRecordDrawer');

Game.Views.Charts = {};
Game.Views.Charts.PieChart = require('./Views/Charts/PieChart');

Game.Views.Pages = {};
Game.Views.Pages.Setup = require('./Views/Pages/Setup');
Game.Views.Pages.BSkatEstimation = require('./Views/Pages/BSkatEstimation');
Game.Views.Pages.Level = require('./Views/Pages/Level');

// -------------------
// Controllers
// -------------------
Game.Controllers = {};
Game.Controllers.ViewController = require('./Controllers/ViewController');
