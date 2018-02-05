'use strict';

/**
 * A modal
 */
class Modal extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.fetch();

        for(let modal of Crisp.View.getAll(Modal)) {
            if(modal === this) { continue; }
            
            modal.remove();
        }

        _.append(document.body, this);
    }

    /**
     * Renders the header
     */
    renderHeader() {}

    /**
     * Renders the body
     */
    renderBody() {}

    /**
     * Renders the footer
     */
    renderFooter() {}

    /**
     * Closes this modal
     */
    close() {
        this.remove();
    }

    /**
     * Gets the class name
     */
    get className() {
        return this.name.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'modal modal--' + this.className},
            _.div({class: 'modal__dialog'},
                _.button({class: 'modal__close widget widget--button'})
                    .click(() => {
                        this.close();
                    }),
                _.div({class: 'modal__header'},
                    this.renderHeader()
                ),
                _.div({class: 'modal__body'},
                    this.renderBody(),
                ),
                _.div({class: 'modal__footer'},
                    this.renderFooter()  
                )
            )
        );
    }
}

module.exports = Modal;
