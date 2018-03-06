'use strict';

class Session extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;
            
        this.stats = new Game.Views.Drawers.Stats();
        this.notifications = new Game.Views.Drawers.Notifications();
        this.timeline = new Game.Views.Drawers.Timeline();
        this.coinStack = new Game.Views.Charts.CoinStack({
            amount: Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000)
        });

        this.fetch();
        
        setInterval(() => {
            if(Game.isPaused) { return; }

            this.heartbeat();
        }, 1000);
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.element.classList.toggle('paused', !document.hasFocus());
        
        if(!document.hasFocus() || Game.Services.TimeService.isPaused) { return; }

        // Tick time 
        Game.Services.TimeService.tick();
       
        this.timeline.heartbeat();
        this.notifications.heartbeat();
        this.stats.heartbeat();

        // Update coin stack
        let stackAmount = Math.round(Game.Services.ConfigService.get('personalAccount', 0) / 1000);
        
        if(stackAmount !== this.coinStack.amount) {
            this.coinStack.amount = stackAmount;
        }

        // Sell one unit every second
        Game.Services.SessionService.sellUnit();

        // Automatically produce units
        Game.Services.SessionService.autoProduceUnits();
        
        // Update the view
        this.update();
    }

    /**
     * Event: Changed unit price
     *
     * @param {Number} price
     */
    onChangeUnitPrice(price) {
        Game.Services.SessionService.setUnitPrice(price);

        this.update();
    }

    /*
     * Event: Click buy machine
     */
    onClickBuyMachine() {
        Game.Services.SessionService.buyMachine();

        this.update();
    }
    
    /*
     * Event: Click produce
     */
    onClickProduce() {
        Game.Services.SessionService.produceUnit();

        this.update();
    }

    /**
     * Template
     */
    template() {
        let year = Game.Services.TimeService.currentYear;
        let month = Game.Services.TimeService.currentMonth;

        return _.div({class: 'page page--session'},
            _.div({class: 'page--session__user-input'},
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'Unit price'),
                    _.input({class: 'widget widget--input text-center', type: 'number', value: Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE)})
                        .on('input', (e) => { this.onChangeUnitPrice(e.currentTarget.value); }),
                    _.div({dynamicContent: true, class: 'widget widget--label text-right vat'}, (Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE) * 1.25) + ' DKK')
                ),
                _.div({class: 'widget-group'},
                    _.div({dynamicContent: true, class: 'widget widget--label'}, 'Machines: ' + Game.Services.ConfigService.get('machines', 0)),
                    _.button({class: 'widget widget--button'}, 'Buy machine (' + Game.MACHINE_PRICE + ' DKK)')
                        .click((e) => { this.onClickBuyMachine(); }),
                    _.div({class: 'widget widget--label text-right vat'}, (Game.MACHINE_PRICE * 1.25) + ' DKK')
                ),
                _.div({class: 'widget-group'},
                    _.div({dynamicContent: true, class: 'widget widget--label'}, 'Inventory: ' + Game.Services.ConfigService.get('inventory', 0)),
                    _.button({class: 'widget widget--button'}, 'Produce (' + Game.PRODUCTION_COST + ' DKK)')
                        .click((e) => { this.onClickProduce(); }),
                    _.div({class: 'widget widget--label text-right vat'}, (Game.PRODUCTION_COST * 1.25) + ' DKK')
                ),
                _.div({class: 'widget-group'},
                    _.div({class: 'class: widget widget--label'}, 'Sales this year (estimated ' + Game.Services.ConfigService.get('estimatedIncome', 0).toString() + '):'),
                    _.div({dynamicContent: true, class: 'class: widget widget--label'}, Game.Services.SessionService.getSales(year).toString())
                ),
                _.div({class: 'widget-group'},
                    _.div({class: 'class: widget widget--label'}, 'Cost this year:'),
                    _.div({dynamicContent: true, class: 'class: widget widget--label'}, Game.Services.SessionService.getCost(year).toString())
                )
            )
        );
    }

    /**
     * Post render
     */
    postrender() {
        _.append(this.element, 
            this.stats.element,
            this.notifications.element,
            this.timeline.element,
            this.coinStack.element
        );
    }
}

module.exports = Session;
