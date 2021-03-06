'use strict';

require('./Style/index.scss');

window._ = Crisp.Elements;

// -------------------
// Constants
// -------------------
window.Game = {
    // Standard constants
    MACHINE_PRICE: 1000,
    MACHINE_PRODUCTIVITY: 1,
    PRODUCTION_COST: 10,
    DEFAULT_UNIT_PRICE: 40,
    MIN_UNIT_PRICE: 1,
    MAX_UNIT_PRICE: 500,
    
    // Quest goal constants
    MACHINE_PERSONAL_ACCOUNT_MINIMUM: 5000,
    PRICING_PERSONAL_ACCOUNT_MINIMUM: 7500,
    INCREASED_DEMAND_1_PERSONAL_ACCOUNT_MINIMUM: 10000,
    INCREASED_EFFICIENCY_PERSONAL_ACCOUNT_MINIMUM: 12500,
    INCREASED_PRODUCTIVITY_PERSONAL_ACCOUNT_MINIMUM: 15000,
    INCREASED_DEMAND_2_PERSONAL_ACCOUNT_MINIMUM: 17500,
    REDUCED_PRODUCTION_COST_PERSONAL_ACCOUNT_MINIMUM: 20000
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
Game.Views.Modals.FinancialReportingTool = require('./Views/Modals/FinancialReportingTool');

Game.Views.Drawers = {};
Game.Views.Drawers.Drawer = require('./Views/Drawers/Drawer');
Game.Views.Drawers.Timeline = require('./Views/Drawers/Timeline');
Game.Views.Drawers.QuestLog = require('./Views/Drawers/QuestLog');
Game.Views.Drawers.Stats = require('./Views/Drawers/Stats');
Game.Views.Drawers.Notifications = require('./Views/Drawers/Notifications');
Game.Views.Drawers.Controls = require('./Views/Drawers/Controls');

Game.Views.Charts = {};
Game.Views.Charts.PieChart = require('./Views/Charts/PieChart');
Game.Views.Charts.CoinStack = require('./Views/Charts/CoinStack');

Game.Views.Pages = {};
Game.Views.Pages.Setup = require('./Views/Pages/Setup');
Game.Views.Pages.BTaxEstimation = require('./Views/Pages/BTaxEstimation');
Game.Views.Pages.Session = require('./Views/Pages/Session');

// -------------------
// Controllers
// -------------------
Game.Controllers = {};
Game.Controllers.ViewController = require('./Controllers/ViewController');
