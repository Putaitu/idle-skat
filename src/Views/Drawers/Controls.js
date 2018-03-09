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
     * Renders the preview
     */
    renderPreview() {
        let year = Game.Services.TimeService.currentYear;
        let month = Game.Services.TimeService.currentMonth;

        return [
            _.div({class: 'drawer--controls__heading'}, 'Unit price'),
            _.div({class: 'widget-group'},
                _.input({class: 'widget widget--input', type: 'number', value: Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE)})
                    .on('input', (e) => { this.onChangeUnitPrice(e.currentTarget.value); }),
                _.div({dynamicContent: true, class: 'widget widget--label text-right'}, '+' + (Game.Services.ConfigService.get('unitPrice', Game.DEFAULT_UNIT_PRICE) * 0.25) + ' DKK VAT')
            ),
            _.div({dynamicContent: true, class: 'drawer--controls__heading'}, 'Machines: ' + Game.Services.ConfigService.get('machines', 0)),
            _.div({class: 'widget-group'},
                _.button({class: 'widget widget--button'}, 'Buy machine')
                    .click((e) => { this.onClickBuyMachine(); }),
                _.div({class: 'widget widget--label text-right vat'}, Game.MACHINE_PRICE + ' DKK')
            ),
            _.div({dynamicContent: true, class: 'drawer--controls__heading'}, 'Inventory: ' + Game.Services.ConfigService.get('inventory', 0)),
            _.div({class: 'widget-group'},
                _.button({class: 'widget widget--button'}, 'Produce')
                    .click((e) => { this.onClickProduce(); }),
                _.div({class: 'widget widget--label text-right vat'}, Game.PRODUCTION_COST + ' DKK')
            ),
            _.div({class: 'drawer--controls__heading'}, 'Statistics for ' + year),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Est. sales:'),
                _.div({dynamicContent: true, class: 'widget widget--label text-right'}, Game.Services.ConfigService.get('estimatedIncome', 0) + ' DKK')
            ),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Actual sales:'),
                _.div({dynamicContent: true, class: 'widget widget--label text-right'}, Game.Services.SessionService.getSales(year) + ' DKK')
            ),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Cost:'),
                _.div({dynamicContent: true, class: 'widget widget--label text-right'}, Game.Services.SessionService.getCost(year) + ' DKK')
            ),
            _.div({class: 'widget-group'},
                _.div({class: 'widget widget--label'}, 'Sales per day:'),
                _.div({dynamicContent: true, class: 'widget widget--label text-right'}, Game.Services.SessionService.getSalesPerSecond())
            )
        ];
    }

    /**
     * Renders the toggle
     */
    renderToggle() { return null; }
}

module.exports = Controls;
