'use strict';

window._ = Crisp.Elements;

window.Game = {};

Game.Services = {};
Game.Services.ConfigService = require('./Services/ConfigService');

Game.Views = {};
Game.Views.Pages = {};
Game.Views.Pages.Setup = require('./Views/Pages/Setup');

Game.Controllers = {};
Game.Controllers.ViewController = require('./Controllers/ViewController');
