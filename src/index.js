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

Game.Services = {};
Game.Services.ConfigService = require('./Services/ConfigService');
Game.Services.TimeService = require('./Services/TimeService');
Game.Services.DebugService = require('./Services/DebugService');

Game.Models = {};
Game.Models.Entity = require('./Models/Entity');
Game.Models.Player = require('./Models/Player');
Game.Models.Company = require('./Models/Company');
Game.Models.Report = require('./Models/Report');
Game.Models.VATRecord = require('./Models/VATRecord');
Game.Models.VATPayment = require('./Models/VATPayment');
Game.Models.FinancialRecord = require('./Models/FinancialRecord');

Game.Views = {};
Game.Views.Widgets = {};
Game.Views.Widgets.PlayerInfo = require('./Views/Widgets/PlayerInfo');
Game.Views.Widgets.DebugMenu = require('./Views/Widgets/DebugMenu');
Game.Views.Drawers = {};
Game.Views.Drawers.Drawer = require('./Views/Drawers/Drawer.js');
Game.Views.Drawers.FinancialRecordDrawer = require('./Views/Drawers/FinancialRecordDrawer.js');
Game.Views.Pages = {};
Game.Views.Pages.Setup = require('./Views/Pages/Setup');
Game.Views.Pages.Level = require('./Views/Pages/Level');

Game.Controllers = {};
Game.Controllers.ViewController = require('./Controllers/ViewController');
