'use strict';

/**
 * A message modal
 */
class Message extends Game.Views.Modals.Modal {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);
    }

    /**
     * Pre render
     */
    prerender() {
        this.size = this.size || 'small';
    }

    /**
     * Renders the header
     */
    renderHeader() {
        return _.div({class: 'modal--message__title'}, this.title);
    }
    
    /**
     * Renders the body
     */
    renderBody() {
        return _.div({class: 'modal--message__message'}, this.message);
    }

    /**
     * Renders the footer
     */
    renderFooter() {
        return _.button({class: 'widget widget--button align-right'}, 'OK')
            .click(() => { this.close(); })
    }
}

module.exports = Message;
