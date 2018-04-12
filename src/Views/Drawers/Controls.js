'use strict';

/**
 * Controls
 */
class Controls extends Game.Views.Drawers.Drawer {
    /**
     * Heartbeat
     */
    heartbeat() {
        this.update();
    }
    
    /**
     * Event: Changed unit price
     *
     * @param {InputEvent} e
     */
    onChangeUnitPrice(e) {
        let price = e.currentTarget.value;

        if(price < Game.MIN_UNIT_PRICE) { 
            price = Game.MIN_UNIT_PRICE;
        }
        
        if(price > Game.MAX_UNIT_PRICE) { 
            price = Game.MAX_UNIT_PRICE;
        }

        Game.Services.SessionService.setUnitPrice(price);

        if(Crisp.View.get('Message')) {
            return;
        }

        this.heartbeat();
    }

    /*
     * Event: Click buy machine
     */
    onClickBuyMachine() {
        Game.Services.SessionService.buyMachine();

        this.heartbeat();
    }
    
    /*
     * Event: Click produce
     */
    onClickProduce() {
        Game.Services.SessionService.produceUnit();

        if(Game.Services.SessionService.isQuestComplete('Efficiency')) {
            Game.Services.SessionService.produceUnit();
        }

        this.heartbeat();
    }

    /**
     * Renders the content
     */
    renderContent() {
        let year = Game.Services.TimeService.currentYear;
        let month = Game.Services.TimeService.currentMonth;

        return [
            // Unit price
            _.div({class: 'drawer--controls__heading'}, 'Pricing'),
            _.div({class: 'widget-group'},
                _.div({dynamicContent: true, class: 'widget widget--label'}, 'Unit price:'),
                _.input({dynamicAttributes: true, min: Game.MIN_UNIT_PRICE, max: Game.MAX_UNIT_PRICE, disabled: !Game.Services.SessionService.isQuestComplete('Pricing'), class: 'widget widget--input small drawer--controls__pricing__input', type: 'number', value: Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE)})
                    .on('input', (e) => { this.onChangeUnitPrice(e); }),
                _.div({class: 'widget widget--label small'}, _.span({class: 'vat'}))
            ),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Demand:'),
                _.div({dynamicContent: true, class: 'widget widget--label text-right'}, Game.Services.SessionService.getSalesPerDay() + ' ' + Game.Services.ConfigService.get('productName') + ' sold per day')
            ),

            // Machines
            _.if(Game.Services.SessionService.isQuestComplete('Machines'),
                _.div({dynamicContent: true, class: 'drawer--controls__heading'}, 'Machines: ' + Game.Services.ConfigService.get('machines', 0)),
                _.div({class: 'widget-group'},
                    _.button({dynamicAttributes: true, class: 'widget widget--button blue drawer--controls__buy-machine'}, 'Buy machine')
                        .click((e) => { this.onClickBuyMachine(); }),
                    _.div({dynamicContent: true, class: 'widget widget--label text-right vat'}, Game.Services.SessionService.getCurrentMachinePrice() + ' DKK')
                ),
                _.div({class: 'widget-group'},
                    _.div({class: 'widget widget--label'}, 'Productivity:'),
                    _.div({dynamicContent: true, class: 'widget widget--label text-right'}, (Game.Services.ConfigService.get('machines', 0) * Game.Services.SessionService.getCurrentMachineProductivity()) + ' ' + Game.Services.ConfigService.get('productName') + ' per day'),
                )
            ),

            // Inventory
            _.div({dynamicContent: true, class: 'drawer--controls__heading'}, 'Inventory: ' + Game.Services.ConfigService.get('inventory', 0)),
            _.div({class: 'widget-group'},
                _.button({class: 'widget widget--button blue drawer--controls__produce'}, 'Produce')
                    .click((e) => { this.onClickProduce(); }),
                _.div({dynamicContent: true, class: 'widget widget--label text-right vat'}, Game.Services.SessionService.getCurrentProductionCost() + ' DKK')
            ),

            // Statistics
            _.div({class: 'drawer--controls__heading'}, 'Statistics for ' + year),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Estimated profit:'),
                _.div({dynamicContent: true, class: 'widget widget--label text-right'}, Game.Services.ConfigService.get('estimatedIncome', 0) + ' DKK')
            ),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Sales:'),
                _.div({dynamicContent: true, class: 'widget widget--label text-right'}, Game.Services.SessionService.getSales(year) + ' DKK')
            ),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Cost:'),
                _.div({dynamicContent: true, class: 'widget widget--label text-right'}, '(' + Game.Services.SessionService.getCost(year) + ' DKK)')
            ),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Actual profit:'),
                _.div({dynamicContent: true, class: 'widget widget--label text-right drawer--controls__actual-profit'}, (Game.Services.SessionService.getSales(year) - Game.Services.SessionService.getCost(year)) + ' DKK')
            )
        ];
    }
}

module.exports = Controls;
