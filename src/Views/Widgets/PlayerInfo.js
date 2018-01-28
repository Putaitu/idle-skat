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

        setInterval(() => { this.updateCalendar(); }, 1000);

        this.updateCalendar();
    }

    /**
     * Updates the calendar
     */
    updateCalendar() {
        let calendarDiv = this.element.querySelector('.calendar .widget--player-info__area__value');
    
        if(!calendarDiv) { return; }
        
        let time = Game.Services.TimeService.currentTime;
        let timeString = time.getFullYear() + '-';

        if(time.getMonth() + 1 < 10) {
            timeString += '0';
        }

        timeString += (time.getMonth() + 1) + '-';
        
        if(time.getDate() < 10) {
            timeString += '0';
        }

        timeString += time.getDate() + ' ';

        if(time.getHours() < 10) {
            timeString += '0';
        }
        
        timeString += time.getHours() + ':';
        
        if(time.getMinutes() < 10) {
            timeString += '0';
        }
        
        timeString += time.getMinutes();

        calendarDiv.innerHTML = timeString;
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
     * Template
     */
    template() {
        return _.div({class: 'widget widget--player-info'},
            _.input({type: 'checkbox', class: 'widget widget--player-info__toggle'}),
            _.div({class: 'widget--player-info__area personal-account'},
                _.h4({class: 'widget--player-info__area__heading'}, 'Personal account'),
                _.div({class: 'widget--player-info__area__icon'}, '💰'),
                _.div({class: 'widget--player-info__area__value'}, this.model.personalAccount.toString())
            ),
            _.div({class: 'widget--player-info__area calendar'},
                _.h4({class: 'widget--player-info__area__heading'}, 'Calendar'),
                _.div({class: 'widget--player-info__area__icon'}, '🗓'),
                _.div({class: 'widget--player-info__area__value'})
            )
        );
    }
}

module.exports = PlayerInfo;
