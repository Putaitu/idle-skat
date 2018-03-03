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

        this.fetch();
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

        instance.save();

        instance.fetch();
    }

    /**
     * Cleans up expired notifications
     */
    cleanExpired() {
        let date = Game.Services.TimeService.currentTime;
        let hasChanged = false;

        for(let key in this.model) {
            let entry = this.model[key];

            if(entry.expiresOn && entry.expiresOn.getTime() <= date.getTime()) {
                delete this.model[key];
                hasChanged = true;
            }
        }

        if(hasChanged) {
            this.save();
        }
    }

    /**
     * Save changes
     */
    save() {
        Game.Services.ConfigService.set('notifications', this.model);
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        this.cleanExpired();
        this.update();
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

                        if(percent >= 100) { percent = 100; }

                        return _.div({'data-cr-dynamic': true, class: 'drawer--notifications__entry__progress', style: 'width: ' + percent + '%'});
                    }),
                    _.if(notification.title,
                        _.div({class: 'drawer--notifications__entry__title'}, notification.title)
                    ),
                    _.if(notification.message,
                        _.div({class: 'drawer--notifications__entry__message'}, notification.message)
                    ),
                    _.do(() => {
                        if(!notification.action) { return; }

                        return _.button({class: 'drawer--notifications__entry__action widget widget--button ' + (notification.type || '')}, notification.action.label)
                            .click((e) => { 
                                e.currentTarget.parentElement.classList.toggle('out', true);
                               
                                setTimeout(() => {
                                    delete this.model[key];
                                    this.save();
                                }, 500);

                                if(typeof this[notification.action.onClick] !== 'function') { return; }

                                this[notification.action.onClick](key);
                            })
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

    /**
     * Event: Click pay B tax
     *
     * @param {String} key
     */
    onClickPayBTax() {
        alert('Pay B tax'); 
    }
    
    /**
     * Event: Click pay VAT
     *
     * @param {String} key
     */
    onClickPayVAT() {
        alert('Pay VAT'); 
    }
   
    /**
     * Event: Click report VAT
     *
     * @param {String} key
     */
    onClickReportVAT() {
        alert('Report VAT'); 
    }
}

module.exports = Notifications;
