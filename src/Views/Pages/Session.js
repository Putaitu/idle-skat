'use strict';

class Session extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;
            
        this.fetch();
        
        setInterval(() => {
            this.heartbeat();
        }, 1000);

        setTimeout(() => {
            this.sellUnit();
        }, Game.Services.SessionService.getDemandFactor() * 1000 * (Game.Services.TimeService.hoursPerSecond / 24));
    }

    /**
     * Sells a unit
     */
    sellUnit() {
        setTimeout(() => {
            this.sellUnit();
        }, Game.Services.SessionService.getDemandFactor() * 1000 * (Game.Services.TimeService.hoursPerSecond / 24));
        
        if(!document.hasFocus() || Game.Services.TimeService.isPaused) { return; }

        Game.Services.SessionService.sellUnit();
    }

    /**
     * Heartbeat (once per second)
     */
    heartbeat() {
        this.element.classList.toggle('paused', !document.hasFocus());
        
        if(!document.hasFocus() || Game.Services.TimeService.isPaused) { return; }

        // Tick time 
        Game.Services.TimeService.tick();
       
        this.controls.heartbeat();
        this.timeline.heartbeat();
        this.notifications.heartbeat();
        this.stats.heartbeat();

        // Update coin stack
        let stackAmount = Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000);
        
        if(stackAmount !== this.coinStack.amount) {
            this.coinStack.amount = stackAmount;
        }

        // Sells units
        Game.Services.SessionService.sellUnit();

        // Automatically produce units, if applicable
        Game.Services.SessionService.autoProduceUnits();
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--session'},
            _.div({class: 'page--session__panel top'},
                this.stats = new Game.Views.Drawers.Stats()
            ),
            _.div({class: 'page--session__panel middle'},
                _.div({class: 'page--session__panel left'},
                    this.controls = new Game.Views.Drawers.Controls()
                ),
                _.div({class: 'page--session__panel center'},
                    this.coinStack = new Game.Views.Charts.CoinStack({
                        amount: Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000)
                    })
                ),
                _.div({class: 'page--session__panel right'},
                    this.notifications = new Game.Views.Drawers.Notifications()
                )
            ),
            _.div({class: 'page--session__panel bottom'},
                this.timeline = new Game.Views.Drawers.Timeline()
            )
        );
    }
}

module.exports = Session;
