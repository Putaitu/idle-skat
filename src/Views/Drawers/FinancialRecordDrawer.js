'use strict';

/**
 * A drawer for the financial record
 */
class FinancialRecordDrawer extends Game.Views.Drawers.Drawer {
    /**
     * Gets the drawer position
     */
    get position() {
        return 'bottom';
    }
    
    /**
     * Renders this drawer
     */
    renderContent() {
        return _.div({class: 'drawer__content'},
            _.each(Game.Models.Player.current.financialRecord.reports, (year, months) => {
                return [
                    _.h4(year),
                    _.each(months, (month, report) => {
                        return _.button({class: 'widget widget--button'}, month);
                    })
                ];
            })
        );
    }
}

module.exports = FinancialRecordDrawer;
