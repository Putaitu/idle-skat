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
     * @param {Number} price
     */
    onChangeUnitPrice(price) {
        Game.Services.SessionService.setUnitPrice(price);

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
            _.if(Game.Services.SessionService.isQuestComplete('Pricing'),
                _.div({class: 'drawer--controls__heading'}, 'Pricing'),
                _.div({class: 'widget-group'},
                    _.div({dynamicContent: true, class: 'widget widget--label'}, 'Unit price'),
                    _.input({class: 'widget widget--input small drawer--controls__pricing__input', type: 'number', value: Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE)})
                        .on('input', (e) => { this.onChangeUnitPrice(e.currentTarget.value); }),
                    _.div({class: 'widget widget--label small'}, _.span({class: 'vat'}))
                ),
                _.div({dynamicContent: true}, 'Demand (sales per day): ' + Game.Services.SessionService.getSalesPerDay() + ' units')
            ),

            // Machines
            _.if(Game.Services.SessionService.isQuestComplete('Machines'),
                _.div({dynamicContent: true, class: 'drawer--controls__heading'}, 'Machines: ' + Game.Services.ConfigService.get('machines', 0)),
                _.div({class: 'widget-group'},
                    _.button({dynamicAttributes: true, class: 'widget widget--button drawer--controls__buy-machine'}, 'Buy machine')
                        .click((e) => { this.onClickBuyMachine(); }),
                    _.div({class: 'widget widget--label text-right vat'}, Game.MACHINE_PRICE + ' DKK')
                )
            ),

            // Inventory
            _.div({dynamicContent: true, class: 'drawer--controls__heading'}, 'Inventory: ' + Game.Services.ConfigService.get('inventory', 0)),
            _.div({class: 'widget-group'},
                _.button({class: 'widget widget--button drawer--controls__produce'}, 'Produce')
                    .click((e) => { this.onClickProduce(); }),
                _.div({class: 'widget widget--label text-right vat'}, Game.PRODUCTION_COST + ' DKK')
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
