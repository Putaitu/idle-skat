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

        this.model = Game.Models.Player.load();

        this.fetch();
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'widget widget--player-info'},
            _.div({class: 'widget--player-info__personal-account'},
                _.h2({class: 'widget--player-info__personal-account__heading'}, 'Personal account'),
                _.div({class: 'widget--player-info__personal-account__amount'}, this.model.personalAccount.toString())
            )
        );
    }
}

module.exports = PlayerInfo;
