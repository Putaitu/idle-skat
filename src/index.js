'use strict';

require('./Style/index.scss');

/**
 * Resets the game
 */
window.reset = function reset() {
    localStorage.clear();
    
    location.reload();
}

/**
 * Pauses the game
 */
window.pause = function pause() {
    Game.isPaused = true; 
}

/**
 * Plays the game
 */
window.play = function play() {
    Game.isPaused = false; 
}

/**
 * Adds hours to a date
 */
Date.prototype.addHours = function(h) {    
    this.setTime(this.getTime() + (h*60*60*1000)); 
    return this;   
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
Game.Models.Summary = require('./Models/Summary');
Game.Models.VATRecord = require('./Models/VATRecord');

Game.Views = {};
Game.Views.Widgets = {};
Game.Views.Widgets.PlayerInfo = require('./Views/Widgets/PlayerInfo');
Game.Views.Pages = {};
Game.Views.Pages.Setup = require('./Views/Pages/Setup');
Game.Views.Pages.Level = require('./Views/Pages/Level');

Game.Controllers = {};
Game.Controllers.ViewController = require('./Controllers/ViewController');
