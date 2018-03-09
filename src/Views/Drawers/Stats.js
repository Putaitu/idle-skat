'use strict';

/**
 * Player statistics
 */
class Stats extends Game.Views.Drawers.Drawer {
    /**
     * Renders the toggle
     */
    renderToggle() {
        return null;
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.update();
    }

    /**
     * Renders the preview
     */
    renderPreview() {
        return _.div({class: 'drawer__preview drawer--stats__preview'},
            _.div({class: 'drawer--stats__preview__company'},
                _.div({dynamicContent: true, class: 'widget widget--label text-center'}, '🏭 ' + Game.Services.ConfigService.get('companyAccount', 0) + ' DKK')
            ),
            _.div({class: 'drawer--stats__preview__transactions'},
                _.button({class: 'widget widget--button align-center'}, 'Transfer ➜')
                    .click(() => {
                        new Game.Views.Modals.Transfer();
                    })
            ),
            _.div({class: 'drawer--stats__preview__personal'},
                _.div({dynamicContent: true, class: 'widget widget--label text-center'}, '💰 ' + Game.Services.ConfigService.get('personalAccount', 0) + ' DKK')
            )
        );
    }
}

module.exports = Stats;
