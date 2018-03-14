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

            let year = date.getFullYear();
            let quarter = date.getQuarter() - 1;

            if(quarter < 1) {
                quarter = 4;
                year--;
            }

            // Exclude first occurence
            if(year < Game.Services.TimeService.startTime.getFullYear()) { return; }

            if(Game.Services.SessionService.getVat(year, quarter).isPaid) { return; }

            return {
                type: 'yellow',
                title: 'Pay VAT',
                message: 'VAT payment can be made, and is due on ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Pay VAT (' + Game.Services.SessionService.getVat(year, quarter).amount + ' DKK)',
                    onClick: 'onClickPayVAT'
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
            let year = date.getFullYear();
            let quarter = date.getQuarter() - 1;

            if(quarter < 1) {
                quarter = 4;
                year--;
            }
            
            // Exclude first occurence
            if(year < Game.Services.TimeService.startTime.getFullYear()) { return; }

            if(Game.Services.SessionService.getVat(year, quarter).isReported) { return; }
            
            let expiresOn = new Date(date).addMonths(1); 
            expiresOn.setDate(24);

            return {
                type: 'yellow',
                title: 'Report VAT',
                message: 'VAT can be reported, and payment can be made starting ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Report VAT',
                    onClick: 'onClickReportVAT'
                }
            };
        }

        // Able to pay B tax
        if(date.getDate() === 1) {
            let btax = Game.Services.SessionService.getBTax(date.getFullYear(), date.getMonth() + 1);

            if(btax.isPaid) { return; }

            let expiresOn = new Date(date);
            expiresOn.setDate(22);
            
            return {
                type: 'blue',
                title: 'Pay B tax',
                message: 'B tax payment can be made, and is due on ' + expiresOn.prettyPrint(),
                expiresOn: expiresOn,
                action: {
                    label: 'Pay B tax (' + btax.amount + ' DKK)',
                    onClick: 'onClickPayBTax'
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
        this.update();
    }

    /**
     * Renders the toggle
     */
    renderToggle() {
        return null;
    }

    /**
     * Event: Click pause
     */
    onClickPause() {
        Game.Services.TimeService.isPaused = true;

        this.update();
    }
    
    /**
     * Event: Click pause
     */
    onClickPlay() {
        Game.Services.TimeService.isPaused = false;

        Game.Services.TimeService.speed = 1;
        
        this.update();
    }

    /**
     * Event: Click fast forward
     *
     * @param {Number} factor
     */
    onClickFastForward(factor) {
        Game.Services.TimeService.isPaused = false;

        Game.Services.TimeService.speed = factor;

        this.update();
    }

    /**
     * Gets the state of the timeline
     *
     * @returns {String} State
     */
    get state() {
        if(Game.Services.TimeService.isPaused) {
            return 'paused';
        }

        if(Game.Services.TimeService.speed === 2) {
            return 'ffwdx2';
        }
        
        if(Game.Services.TimeService.speed === 4) {
            return 'ffwdx4';
        }
            
        return 'playing';
    }

    /**
     * Renders the content
     */
    renderContent() {
        let date = Game.Services.TimeService.currentTime;

        return _.div({class: 'drawer__preview'},
            _.div({dynamicContent: true, class: 'drawer--timeline__controls'},
                _.div({class: 'widget-group'},
                    _.button({class: 'widget widget--button small' + (this.state === 'paused' ? ' active' : ''), title: 'Pause'}, '⏸')
                        .click(() => { this.onClickPause(); }),
                    _.button({class: 'widget widget--button small' + (this.state === 'playing' ? ' active' : ''), title: 'Play'}, '▶️')
                        .click(() => { this.onClickPlay(); }),
                    _.button({class: 'widget widget--button small' + (this.state === 'ffwdx2' ? ' active' : '')}, '⏩')
                        .click(() => { this.onClickFastForward(2); }),
                    _.button({class: 'widget widget--button small' + (this.state === 'ffwdx4' ? ' active' : '')}, '⏭')
                        .click(() => { this.onClickFastForward(4); })
                )
            ),
            _.div({dynamicContent: true, class: 'drawer--timeline__scroller'},
                _.div({class: 'drawer--timeline__scroller__year'},
                    date.getFullYear()
                ),
                _.div({class: 'drawer--timeline__scroller__month'},
                    date.getMonthName()
                ),
                _.div({class: 'drawer--timeline__scroller__days'},
                    _.loop(60, (day) => {
                        let currentDate = new Date(date);

                        currentDate.addDays(day);
                        currentDate.reset();

                        let notification = this.getNotification(currentDate);
                       
                        if(notification && day === 0 && !notification.isSilent) {
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
            )
        );
    }
}

module.exports = Timeline;
