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
        Crisp.Router.route('/b-skat-estimation', this.bskat);
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
     * B-skat
     */
    static bskat() {
        _.replace(document.body,
            new Game.Views.Pages.BSkatEstimation() 
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
