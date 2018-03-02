'use strict'

/**
 * The pervasive timeline
 */
class Timeline extends Game.Views.Drawers.Drawer {
    /**
     * Gets the notification for a date
     *
     * @param {Date} date
     *
     * @returns {Object} Notification
     */
    getNotification(date) {
        // Pay VAT due date
        if(
            date.getDate() === 1 && // The first day of...
            (
                date.getMonth() === 2 || // ...march or...
                date.getMonth() === 5 || // ...june or...
                date.getMonth() === 8 || // ...september or...
                date.getMonth() === 11   // ...december
            )
        ) {
            return {
                type: 'alert',
                title: 'VAT payment due',
                message: 'VAT payment was due on ' + date.prettyPrint() + ', but was not paid',
                action: {
                    label: 'Pay VAT',
                    onClick: () => {}
                }
            };
        }
        
        // Able to pay VAT
        if(
            date.getDate() === 24 && // The 24th day of...
            (
                date.getMonth() === 1 || // ...february or...
                date.getMonth() === 4 || // ...may or...
                date.getMonth() === 7 || // ...august or...
                date.getMonth() === 10   // ...november
            )
        ) {
            let expiresOn = new Date(date).addMonths(1);
            expiresOn.setDate(1); 

            return {
                type: 'warning',
                title: 'VAT payment available',
                message: 'VAT payment can be made, and is due on ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Pay VAT',
                    onClick: () => {}
                }
            };
        }

        // Report VAT
        if(
            date.getDate() === 4 && // The first day of...
            (
                date.getMonth() === 0 || // ...january or...
                date.getMonth() === 3 || // ...april or...
                date.getMonth() === 6 || // ...july or...
                date.getMonth() === 9    // ...october
            )
        ) {
            let expiresOn = new Date(date).addMonths(1); 
            expiresOn.setDate(24);

            return {
                type: 'warning',
                title: 'VAT report',
                message: 'VAT can be reported, and payment can be made starting ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Report VAT',
                    onClick: () => {}
                }
            };
        }

        // Able to pay B-skat
        if(date.getDate() === 1) {
            let expiresOn = new Date(date);
            expiresOn.setDate(22);
            
            return {
                type: 'warning',
                title: 'B-skat payment available',
                message: 'B-skat payment can be made, and is due on ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Pay B-skat',
                    onClick: () => {}
                }
            };
        }
        
        // B-skat payment due
        if(date.getDate() === 22) {
            return {
                type: 'alert',
                title: 'B-skat payment due',
                message: 'B-skat payment was due on ' + date.prettyPrint() + ', but was not paid',
                action: {
                    label: 'Pay B-skat',
                    onClick: () => {}
                }
            };
        }
    }

    /**
     * Event: Click notification
     *
     * @param {Object} notification
     */
    onClickNotification(notification) {
        alert(notification.message);
    }

    /**
     * Heartbeat
     */
    heartbeat() {
        let currentDate = Game.Services.TimeService.currentDate;
        
        if(this.lastDate !== currentDate) {
            this._render();  
        }
        
        this.lastDate = currentDate; 
    }

    /**
     * Renders the toggle
     */
    renderToggle() {
        return null;
    }

    /**
     * Renders the preview
     */
    renderPreview() {
        let date = Game.Services.TimeService.currentTime;

        return _.div({class: 'drawer__preview drawer--timeline__scroller'},
            _.div({class: 'drawer--timeline__scroller__year'},
                date.getFullYear()
            ),
            _.div({class: 'drawer--timeline__scroller__month'},
                date.getMonthName()
            ),
            _.div({class: 'drawer--timeline__scroller__days'},
                _.loop(30, (day) => {
                    let currentDate = new Date(date);

                    currentDate.addDays(day);
                    currentDate.reset();

                    let notification = this.getNotification(currentDate);
                   
                    if(notification && day === 0) {
                        Game.Views.Drawers.Notifications.set(notification);
                    }

                    return _.div({class: 'drawer--timeline__scroller__day ' + (currentDate.getDate() % 2 === 0 ? 'even' : 'odd')},
                        _.if(currentDate.getDate() === 1 && day > 0,
                            _.div({class: 'drawer--timeline__scroller__day__month'}, currentDate.getMonthName())
                        ),
                        _.div({class: 'drawer--timeline__scroller__day__number', 'data-number': currentDate.getDate()},
                            currentDate.getDate(),
                        ),
                        _.do(() => { 
                            if(!notification) { return; }

                            return _.div({class: 'drawer--timeline__scroller__day__notification ' + (notification.type || '')}, notification.title);
                        })
                    );
                })
            )
        );
    }

    /**
     * Renders the main content
     */
    renderContent() {
        return _.div({class: 'drawer__content drawer--timeline__days'},

        );
    }
}

module.exports = Timeline;
