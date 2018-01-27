'use strict';

window._ = Crisp.Elements;

window.Game = {};

Game.Services = {};
Game.Services.ConfigService = require('./Services/ConfigService');

Game.Models = {};
Game.Models.Entity = require('./Models/Entity');
Game.Models.Player = require('./Models/Player');
Game.Models.Company = require('./Models/Company');

Game.Views = {};
Game.Views.Pages = {};
Game.Views.Pages.Setup = require('./Views/Pages/Setup');

Game.Controllers = {};
Game.Controllers.ViewController = require('./Controllers/ViewController');
