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

        this.fetch();
    }
    
    /**
     * Gets whether or not this view is expanded
     */
    get isExpanded() {
        let toggle = this.element.querySelector('.drawer__toggle');

        if(!toggle) { return false; }

        return toggle.checked;
    }

    /**
     * Renders the content of the drawer
     */
    renderContent() {}
    
    /**
     * Renders the preview of the drawer
     */
    renderPreview() {
        return _.div({class: 'drawer__preview'},
            _.label({class: 'drawer__preview__label'},
                this.name
                    .replace('Drawer', '')
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
            )
        );
    }

    /**
     * Updates this drawer (static)
     */
    static update() {
        let drawer = Crisp.View.get(this);

        if(!drawer) { return; }

        drawer.update();
    }

    /**
     * Updates this drawer
     */
    update() {}

    /**
     * Template
     */
    template() {
        return _.div({class: 'drawer drawer-' + this.name.replace('Drawer', '').replace(/([A-Z])/g, '-$1').trim().toLowerCase()},
            _.input({type: 'checkbox', class: 'drawer__toggle', checked: this.isExpanded}),
            this.renderPreview(),
            this.renderContent()
        );
    }
}

module.exports = Drawer;
