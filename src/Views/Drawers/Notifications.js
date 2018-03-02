'use strict';

/**
 * Notification drawer
 */
class Notifications extends Game.Views.Drawers.Drawer {
    /**
     * Sets a notification
     *
     * @param {Object} notification
     */
    static set(notification) {
        let instance = Crisp.View.get(Notifications);

        if(!instance) { return; }

        let key = btoa(JSON.stringify(notification));

        notification.createdOn = Game.Services.TimeService.currentTime;

        instance.model[key] = notification;

        instance.fetch();
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.fetch();
    }

    /**
     * Renders the preview
     */
    renderPreview() {
        let currentDate = Game.Services.TimeService.currentTime;

        return _.div({class: 'drawer__preview drawer--notifications__entries'},
            _.each(this.model, (key, notification) => {
                return _.div({class: 'drawer--notifications__entry'},
                    _.do(() => {
                        if(!notification.expiresOn) { return; }

                        let percent = ((currentDate.getTime() - notification.createdOn.getTime()) / (notification.expiresOn.getTime() - notification.createdOn.getTime())) * 100;

                        if(percent > 100) {
                            percent = 100;
                        }

                        return _.div({class: 'drawer--notifications__entry__progress', style: 'width: ' + percent + '%'});
                    }),
                    _.if(notification.title,
                        _.div({class: 'drawer--notifications__entry__title'}, notification.title)
                    ),
                    _.if(notification.message,
                        _.div({class: 'drawer--notifications__entry__message'}, notification.message)
                    )
                );
            })
        );
    }

    /**
     * Renders the toggle
     */
    renderToggle() {
        return null;
    }
}

module.exports = Notifications;
