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

        _.append(document.body,
            new Game.Views.Pages.Setup() 
        );
    }
}

ViewController.init();

module.exports = ViewController;
