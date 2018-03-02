'use strict';

/**
 * Notification drawer
 */
class Notifications extends Game.Views.Drawers.Drawer {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Services.ConfigService.get('notifications') || {};

        for(let key in this.model) {
            let entry = this.model[key];

            if(entry.createdOn) {
                entry.createdOn = new Date(entry.createdOn);
            }
            
            if(entry.expiresOn) {
                entry.expiresOn = new Date(entry.expiresOn);
            }
        }
    }

    /**
     * Sets a notification
     *
     * @param {Object} notification
     */
    static set(notification) {
        let instance = Crisp.View.get(Notifications);

        if(!instance) { return; }

        notification.createdOn = Game.Services.TimeService.currentTime;

        let key = notification.createdOn.getTime().toString();

        instance.model[key] = notification;

        Game.Services.ConfigService.set('notifications', instance.model);

        instance.fetch();
    }

    /**
     * Cleans up expired notifications
     */
    cleanExpired() {
        let date = Game.Services.TimeService.currentTime;

        for(let key in this.model) {
            let entry = this.model[key];

            if(entry.expiresOn && entry.expiresOn.getTime() <= date.getTime()) {
                delete this.model[key];
            }
        }
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.cleanExpired();
        this.fetch();
    }

    /**
     * Renders the preview
     */
    renderPreview() {
        let currentDate = Game.Services.TimeService.currentTime;

        return _.div({class: 'drawer__preview drawer--notifications__entries'},
            _.each(this.model, (key, notification) => {
                return _.div({class: 'drawer--notifications__entry ' + (notification.type || '')},
                    _.do(() => {
                        if(!notification.expiresOn) { return; }

                        let percent = ((currentDate.getTime() - notification.createdOn.getTime()) / (notification.expiresOn.getTime() - notification.createdOn.getTime())) * 100;

                        if(percent >= 100) { percent = 100; }

                        return _.div({class: 'drawer--notifications__entry__progress', style: 'width: ' + percent + '%'});
                    }),
                    _.if(notification.title,
                        _.div({class: 'drawer--notifications__entry__title'}, notification.title)
                    ),
                    _.if(notification.message,
                        _.div({class: 'drawer--notifications__entry__message'}, notification.message)
                    ),
                    _.do(() => {
                        if(!notification.action) { return; }

                        return _.button({class: 'widget widget--button ' + (notification.type || '')}, notification.action.label)
                            .click(() => { notification.action.onClick(); })
                    })
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
