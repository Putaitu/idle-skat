'use strict';

/**
 * A drawer for information that should be tucked away
 */
class Drawer extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = this.model || {};

        this.fetch();
    }
   
    /**
     * Gets the class name
     *
     * @returns {String} Class name
     */
    get className() {
        return 'drawer-' + this.name.replace('Drawer', '').replace(/([A-Z])/g, '-$1').trim().toLowerCase();
    }

    /**
     * Renders this content
     *
     * @returns {HTMLElement} Element
     */
    renderContent() {}

    /**
     * Template
     */
    template() {
        return _.div({class: 'drawer ' + this.className},
            this.renderContent()
        );
    }
}

module.exports = Drawer;
