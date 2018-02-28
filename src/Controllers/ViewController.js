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
    
        Crisp.Router.init();
    }

    /**
     * Index
     */
    static index() {
        Crisp.View.clear(Crisp.View);

        _.append(document.body,
            new Game.Views.Pages.Setup() 
        );
    }

    /**
     * B-skat
     */
    static bskat() {
        Crisp.View.clear(Crisp.View);

        _.append(document.body,
            new Game.Views.Pages.BSkatEstimation() 
        );
    }
}

ViewController.init();

module.exports = ViewController;
