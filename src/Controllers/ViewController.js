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
        Crisp.Router.route('/b-tax-estimation', this.btax);
        Crisp.Router.route('/session', this.session);
    
        Crisp.Router.init();
    }

    /**
     * Index
     */
    static index() {
        _.replace(document.body,
            new Game.Views.Pages.Setup() 
        );
    }

    /**
     * B tax
     */
    static btax() {
        _.replace(document.body,
            new Game.Views.Pages.BTaxEstimation() 
        );
    }

    /**
     * Session
     */
    static session() {
        _.replace(document.body,
            new Game.Views.Pages.Session() 
        );
    }
}

ViewController.init();

module.exports = ViewController;
