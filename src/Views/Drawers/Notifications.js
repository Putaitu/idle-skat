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

        notification.createdOn = Game.Services.TimeService.currentTime.reset();

        let key = notification.createdOn.getTime().toString();

        if(instance.model[key]) { return; }

        if(typeof instance[notification.action] === 'function') {
            return instance[notification.action](notification);
        }

        instance.model[key] = notification;

        instance.save();

        instance.fetch();

    }

    /**
     * Gets expired notification
     *
     * @returns {Object} Notification
     */
    getExpiredNotification() {
        for(let key in this.model) {
            if(this.model[key].isExpired) {
                return this.model[key];
            }
        }

        return null;
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
        this.update();
    }

    /**
     * Renders the content
     */
    renderContent() {
        let currentDate = Game.Services.TimeService.currentTime;

        return _.div({dynamicChildren: true, class: 'drawer__preview drawer--notifications__entries'},
            _.each(this.model, (key, notification) => {
                let entry = _.div({dynamicAttributes: true, class: 'drawer--notifications__entry' + (notification.isExpired ? ' expired' : '')},
                    _.do(() => {
                        if(!notification.expiresOn) { return; }

                        let percent = ((currentDate.getTime() - notification.createdOn.getTime()) / (notification.expiresOn.getTime() - notification.createdOn.getTime())) * 100;

                        if(percent >= 100) {
                            notification.isExpired = true;
                            percent = 100;
                        }

                        return _.div({dynamicAttributes: true, class: 'drawer--notifications__entry__progress', style: 'width: ' + percent + '%'});
                    }),
                    _.if(notification.title,
                        _.div({class: 'drawer--notifications__entry__title'}, notification.title)
                    ),
                    _.if(notification.message,
                        _.div({class: 'drawer--notifications__entry__message'}, notification.message)
                    ),
                    _.do(() => {
                        if(!notification.action) { return; }

                        return _.button({dynamicAttributes: true, class: 'drawer--notifications__entry__action widget widget--button ' + notification.type || ''}, notification.action.label)
                            .click((e) => { 
                                if(typeof this[notification.action.onClick] !== 'function') { return; }

                                this[notification.action.onClick](notification)
                                .then((message) => {
                                    entry.classList.toggle('out', true);
                                    entry.dataset.crDynamicAttributes = false;
                                   
                                    setTimeout(() => {
                                        delete this.model[key];
                                        this.save();
                                        this.fetch();
                                    }, 500);

                                    if(message) {
                                        new Game.Views.Modals.Message({
                                            title: 'Success',
                                            message: message
                                        });
                                    }
                                })
                                .catch((e) => {
                                    if(!e) { return; }

                                    console.log(e);

                                    new Game.Views.Modals.Message({
                                        title: 'Error',
                                        message: e.message || e
                                    });
                                });
                            })
                    })
                );

                return entry;
            })
        );
    }

    /**
     * Event: Click pay B tax
     *
     * @param {Object} notification
     */
    onClickPayBTax(notification) {
        return Game.Services.SessionService.payBTax(notification.createdOn);
    }
    
    /**
     * Event: Click pay VAT
     *
     * @param {Object} notification
     */
    onClickPayVAT(notification) {
        return Game.Services.SessionService.payVat(notification.createdOn);
    }
   
    /**
     * Event: Click report VAT
     *
     * @param {Object} notification
     */
    onClickReportVAT(notification) {
        return Game.Services.SessionService.reportVat(notification.createdOn);
    }

    /**
     * Event: Reached financial report
     *
     * @param {Object} notification
     */
    onReachFinancialReport(notification) {
        return Game.Services.SessionService.financialReport(Game.Services.TimeService.currentTime);
    }
}

module.exports = Notifications;
