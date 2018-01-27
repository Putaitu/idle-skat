'use strict';

require('./Style/index.scss');

window._ = Crisp.Elements;

window.Game = {};

Game.Services = {};
Game.Services.ConfigService = require('./Services/ConfigService');
Game.Services.DebugService = require('./Services/DebugService');

Game.Models = {};
Game.Models.Entity = require('./Models/Entity');
Game.Models.Player = require('./Models/Player');
Game.Models.Company = require('./Models/Company');

Game.Views = {};
Game.Views.Widgets = {};
Game.Views.Widgets.PlayerInfo = require('./Views/Widgets/PlayerInfo');
Game.Views.Pages = {};
Game.Views.Pages.Setup = require('./Views/Pages/Setup');

Game.Controllers = {};
Game.Controllers.ViewController = require('./Controllers/ViewController');
