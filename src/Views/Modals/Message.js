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
     * Post render
     */
    postrender() {
        this.applyFocus();
    }

    /**
     * Focuses this modal, if a focus has been set
     */
    applyFocus() {
        if(!this.focus) { return; }

        let focus = document.querySelector(this.focus.element);

        if(!focus) {
            throw new Error('Modal couldn\'t find element "' + this.focus.element + '"');
        }

        focus = focus.getBoundingClientRect();

        let dialog = this.element.querySelector('.modal__dialog');

        if(!this.focus.side) { this.focus.side = 'right'; }
        if(!this.focus.align) { this.focus.align = 'top'; }

        dialog.classList.add('focused');
        dialog.classList.add(this.focus.side);
        dialog.classList.add('align-' + this.focus.align);

        switch(this.focus.side) {
            case 'right':
                dialog.style.top = (focus.top + focus.height / 2) + 'px';
                dialog.style.left = (focus.left + focus.width) + 'px';
                break;
            
            case 'left':
                dialog.style.top = (focus.top + focus.height / 2) + 'px';
                dialog.style.right = (window.innerWidth - focus.right + focus.width) + 'px';
                console.log(window.innerWidth, focus);
                break;
            
            case 'top':
                dialog.style.bottom = (window.innerHeight - focus.top) + 'px';
                dialog.style.left = (focus.left + focus.width / 2 ) + 'px';
                break;
            
            case 'bottom':
                dialog.style.top = focus.bottom + 'px';
                dialog.style.left = (focus.left + focus.width / 2) + 'px';
                break;
        }
    }
        
    /**
     * Renders the footer
     */
    renderFooter() {
        return _.button({class: 'widget widget--button align-right'}, 'OK')
            .click(() => {
                this.trigger('ok');

                this.close();
            })
    }
}

module.exports = Message;
