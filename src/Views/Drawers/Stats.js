'use strict';

/**
 * Player statistics
 */
class Stats extends Game.Views.Drawers.Drawer {
    /**
     * Heartbeat
     */
    heartbeat() {
        this.update();
    }

    /**
     * Renders the preview
     */
    renderContent() {
        return _.div({class: 'drawer__preview drawer--stats__preview'},
            _.div({class: 'drawer--stats__preview__company'},
                _.div({dynamicContent: true, class: 'widget widget--label text-center drawer--stats__company-account'}, '🏭 ' + Game.Services.ConfigService.get('companyAccount', 0) + ' DKK')
            ),
            _.div({class: 'drawer--stats__preview__transactions'},
                _.button({class: 'widget widget--button blue align-center'}, 'Transfer ➜')
                    .click(() => {
                        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

                        if(companyAccount <= 0) {
                            return new Game.Views.Modals.Message({
                                title: 'Not enough cash!',
                                message: 'You don\'t have any money in your company account',
                            });
                        }

                        let expired = Crisp.View.get('Notifications').getExpiredNotification();

                        if(expired) {
                            let title = expired.title;

                            title = title.charAt(0).toLowerCase() + title.slice(1);

                            return new Game.Views.Modals.Message({
                                title: 'You need to ' + title,
                                message: 'You need to ' + title + ' before you can transfer money',
                            });
                        }

                        new Game.Views.Modals.Transfer();
                    })
            ),
            _.div({class: 'drawer--stats__preview__personal'},
                _.div({dynamicContent: true, class: 'widget widget--label text-center drawer--stats__personal-account'}, '💰 ' + Game.Services.ConfigService.get('personalAccount', 0) + ' DKK')
            )
        );
    }
}

module.exports = Stats;
