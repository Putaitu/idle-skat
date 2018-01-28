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

        this.fetch();

        setInterval(() => { this._render(); }, 1000);
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
     * Template
     */
    template() {
        return _.div({class: 'widget widget--player-info'},
            _.input({type: 'checkbox', class: 'widget widget--player-info__toggle', checked: this.isExpanded}),
            _.div({class: 'widget--player-info__area company'},
                _.h4({class: 'widget--player-info__area__heading'}, 'Company'),
                _.div({class: 'widget--player-info__area__icon'}, '🏭'),
                _.div({class: 'widget--player-info__area__value'}, this.model.company.name + ': ' + this.model.company.capital)
            ),
            _.div({class: 'widget--player-info__area personal-account'},
                _.h4({class: 'widget--player-info__area__heading'}, 'Personal account'),
                _.div({class: 'widget--player-info__area__icon'}, '💰'),
                _.div({class: 'widget--player-info__area__value'}, this.model.personalAccount.toString())
            ),
            _.div({class: 'widget--player-info__area calendar'},
                _.h4({class: 'widget--player-info__area__heading'}, 'Calendar'),
                _.div({class: 'widget--player-info__area__icon'}, '🗓'),
                _.div({class: 'widget--player-info__area__value'}, this.getTimeString())
            )
        );
    }
}

module.exports = PlayerInfo;
