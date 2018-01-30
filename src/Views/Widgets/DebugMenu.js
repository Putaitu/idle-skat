'use strict';

class DebugMenu extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.fetch();
    }

    /**
     * Renders a button
     *
     * @param {String} label
     * @param {Function} onClick
     */
    renderButton(label, onClick) {
        return _.button({class: 'widget widget--button widget--debug-menu__button'}, label)
            .click(() => { onClick(); });
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'widget widget--debug-menu'},
            _.input({type: 'checkbox', class: 'widget--debug-menu__toggle'}),
            this.renderButton('Reset', Game.Services.DebugService.reset),
            this.renderButton('Pause', Game.Services.DebugService.pause),
            this.renderButton('Play', Game.Services.DebugService.play),
            this.renderButton('Skip 30 days', () => { Game.Services.TimeService.addDays(30); })
        );
    }
}

module.exports = DebugMenu;
