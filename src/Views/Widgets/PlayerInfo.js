'use strict';

/**
 * The persistent player info widget
 */
class PlayerInfo extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = Game.Models.Player.current;
        
        this.notifications = {
            'company': {},
            'personal-account': {},
            'calendar': {}
        }
            
        this.fetch();

        setInterval(() => {
            if(Game.isPaused) { return; }
            
            this._render();
        }, 1000);
    }

    /**
     * Gets the time string
     */
    getTimeString() {
        let time = Game.Services.TimeService.currentTime;
        let timeString = time.getFullYear() + '-';

        if(time.getMonth() + 1 < 10) {
            timeString += '0';
        }

        timeString += (time.getMonth() + 1) + '-';
        
        if(time.getDate() < 10) {
            timeString += '0';
        }

        timeString += time.getDate();

        return timeString;
    }

    /**
     * Updates this view
     */
    static update() {
        let playerInfo = Crisp.View.get(PlayerInfo);

        if(!playerInfo) { return; }

        playerInfo.fetch();
    }

    /**
     * Gets whether or not this view is expanded
     */
    get isExpanded() {
        let toggle = this.element.querySelector('.widget--player-info__toggle');

        if(!toggle) { return false; }

        return toggle.checked;
    }

    /**
     * Sets a notification
     *
     * @param {String} area
     * @param {String} title
     * @param {String} description
     * @param {String} buttonLabel
     * @param {Function} onClick
     */
    static notify(area, title, description, buttonLabel, onClick) {
        let playerInfo = Crisp.View.get(PlayerInfo);

        if(!playerInfo) { return; }
        
        let key = btoa(title + description);

        playerInfo.notifications[area][key] = {
            title: title, 
            description: description,
            buttonLabel: buttonLabel,
            onClick: onClick
        };
    
        playerInfo._render();
    }

    /**
     * Clears a notification
     *
     * @param {String} area
     * @param {String} key
     */
    static clearNotification(area, key) {
        let playerInfo = Crisp.View.get(PlayerInfo);

        if(!playerInfo) { return; }
        
        delete playerInfo.notifications[area][key];

        playerInfo._render();
    }

    /**
     * Gets a notification string
     *
     * @param {String} area
     *
     * @returns {String} Notifications
     */
    getNotificationsString(area) {
        if(Object.keys(this.notifications[area]).length < 1) { return ''; }

        let strings = [];

        for(let key in  this.notifications[area]) {
            let notification = this.notifications[area][key];
                
            strings.push(notification.title + '\n' + notification.description);
        }

        return strings.join('\n\n');
    }
    
    /**
     * Renders notifications
     *
     * @param {String} area
     *
     * @returns {HTMLElement} Notifications
     */
    renderNotifications(area) {
        return _.ul({class: 'widget--player-info__area__notifications'},
            _.each(this.notifications[area], (key, notification) => {
                return _.li(
                    _.h4(notification.title),
                    _.if(notification.description,
                        notification.description
                    ),
                    _.if(notification.onClick,
                        _.button({class: 'widget widget--button'}, notification.buttonLabel)
                            .click(() => { notification.onClick(key); })
                    )
                );
            })    
        );
    }

    /**
     * Checks if an area has any notifications
     *
     * @param {String} area
     *
     * @param {Boolean} Has notifications
     */
    hasNotifications(area) {
        return Object.keys(this.notifications[area]).length > 0;
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'widget widget--player-info'},
            _.input({type: 'checkbox', class: 'widget widget--player-info__toggle', checked: this.isExpanded}),
            _.div({class: 'widget--player-info__area company'},
                _.h4({class: 'widget--player-info__area__heading'}, 'Company'),
                _.div({class: 'widget--player-info__area__icon' + (this.hasNotifications('company') ? ' notification' : '')}, '🏭'),
                _.div({class: 'widget--player-info__area__preview'}, this.model.company.name + ': ' + this.model.company.bankBalance + ' kr.'),
                _.div({class: 'widget--player-info__area__data'},
                    'Name: ' + this.model.company.name,
                    '<br>',
                    'Bank balance: ' + this.model.company.bankBalance + ' kr.',
                    this.renderNotifications('company')
                )
            ),
            _.div({class: 'widget--player-info__area personal-account'},
                _.h4({class: 'widget--player-info__area__heading'}, 'Personal account'),
                _.div({class: 'widget--player-info__area__icon' + (this.hasNotifications('personal-account') ? ' notification' : '')}, '💰'),
                _.div({class: 'widget--player-info__area__preview'}, this.model.personalAccount + ' kr.'),
                _.div({class: 'widget--player-info__area__data'},
                    'Balance: ' + this.model.personalAccount + ' kr.',
                    this.renderNotifications('personal-account')
                )
            ),
            _.div({class: 'widget--player-info__area calendar'},
                _.h4({class: 'widget--player-info__area__heading'}, 'Calendar'),
                _.div({class: 'widget--player-info__area__icon' + (this.hasNotifications('calendar') ? ' notification' : '')}, '🗓'),
                _.div({class: 'widget--player-info__area__preview'}, this.getTimeString()),
                _.div({class: 'widget--player-info__area__data'},
                    'Time: ' + this.getTimeString(),
                    this.renderNotifications('calendar')
                )
            )
        );
    }
}

module.exports = PlayerInfo;
