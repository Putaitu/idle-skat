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
     * Gets the focus element
     *
     * @returns {HTMLElement} Element
     */
    get focusElement() {
        if(!this.focus || !this.focus.element) { return null; }

        return document.querySelector(this.focus.element);
    }

    /**
     * Toggles focused element's elevation
     *
     * @param {Boolean} isElevated
     * @param {HTMLElement} element
     */
    elevateFocusElement(isElevated, element) {
        if(!element) { element = this.focusElement; }
        if(!element) { return; }
        if(!isElevated) { return element.removeAttribute('style'); }

        element.style.position = 'relative';
        element.style.zIndex = 99999;
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
        if(this.canSubmit === false) { return; }

        return _.button({class: 'widget widget--button align-right'}, 'OK')
            .click(() => {
                this.trigger('ok');

                this.close();
            })
    }
}

module.exports = Message;
