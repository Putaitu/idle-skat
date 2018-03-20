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

        wait(0.1)
        .then(() => {
            this.element.classList.toggle('in');
        });
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
        this.trigger('close');

        this.element.classList.remove('in');

        wait(0.5)
        .then(() => {
            this.remove(); 
            
            this.trigger('closed');
        });
    }

    /**
     * Gets the class name
     */
    get className() {
        return this.name.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
    }

    /**
     * Check is is open
     *
     * @returns {Boolean} Is open
     */
    get isOpen() {
        return this.element.classList.contains('in');
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'modal ' + (this.isOpen ? 'in' : '') + ' modal--' + this.className + ' ' + (this.size || 'large')},
            _.div({class: 'modal__dialog'},
                _.if(this.canCancel !== false,
                    _.button({class: 'modal__close widget widget--button'})
                        .click(() => {
                            this.trigger('cancel');
                            
                            this.close();
                        })
                ),
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
