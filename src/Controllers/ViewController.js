'use strict';

/**
 * The view controller
 */
class ViewController {
    /**
     * Initialise routes
     */
    static init() {
        Crisp.Router.route('/', this.index);
    
        Crisp.Router.init();
    }

    /**
     * Index route
     */
    static index() {
        Crisp.View.clear(Crisp.View);

        if(!Game.Services.ConfigService.get('completedSetup')) {
            _.append(document.body,
                new Game.Views.Widgets.PlayerInfo(),
                new Game.Views.Pages.Setup() 
            );
        } else {
            _.append(document.body,
                new Game.Views.Widgets.DebugMenu(),
                new Game.Views.Widgets.PlayerInfo(),
                new Game.Views.Pages.Level() 
            );
            _.append(_.find('.drawers.bottom'), 
                new Game.Views.Drawers.FinancialRecordDrawer(),
                new Game.Views.Drawers.VATRecordDrawer()
            );
        }
    }
}

ViewController.init();

module.exports = ViewController;
