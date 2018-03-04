'use strict';

require('./Style/index.scss');

window._ = Crisp.Elements;

// -------------------
// Constants
// -------------------
window.Game = {
    MACHINE_PRICE: 10000,
    MACHINE_CAPACITY: 1,
    PRODUCTION_COST: 10,
    DEFAULT_UNIT_PRICE: 10
};

// -------------------
// Services
// -------------------
Game.Services = {};
Game.Services.ConfigService = require('./Services/ConfigService');
Game.Services.TimeService = require('./Services/TimeService');
Game.Services.DebugService = require('./Services/DebugService');
Game.Services.SessionService = require('./Services/SessionService');

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
Game.Views.Modals.Message = require('./Views/Modals/Message');
Game.Views.Modals.Transfer = require('./Views/Modals/Transfer');
Game.Views.Modals.VATReportingTool = require('./Views/Modals/VATReportingTool');

Game.Views.Drawers = {};
Game.Views.Drawers.Drawer = require('./Views/Drawers/Drawer');
Game.Views.Drawers.Timeline = require('./Views/Drawers/Timeline');
Game.Views.Drawers.Stats = require('./Views/Drawers/Stats');
Game.Views.Drawers.Notifications = require('./Views/Drawers/Notifications');

Game.Views.Charts = {};
Game.Views.Charts.PieChart = require('./Views/Charts/PieChart');

Game.Views.Pages = {};
Game.Views.Pages.Setup = require('./Views/Pages/Setup');
Game.Views.Pages.BTaxEstimation = require('./Views/Pages/BTaxEstimation');
Game.Views.Pages.Session = require('./Views/Pages/Session');

// -------------------
// Controllers
// -------------------
Game.Controllers = {};
Game.Controllers.ViewController = require('./Controllers/ViewController');
