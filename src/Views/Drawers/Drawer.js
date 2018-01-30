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
     * Renders the content of the drawer
     */
    renderContent() {}

    /**
     * Updates this drawer
     */
    static update() {
        let drawer = Crisp.View.get(this.constructor);

        if(!drawer) { return; }

        drawer._render();
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'drawer drawer-' + this.name.replace('Drawer', '').replace(/([A-Z])/g, '-$1').trim().toLowerCase()},
            _.label({class: 'drawer__label'}, this.name.replace('Drawer', '').replace(/([A-Z])/g, ' $1').trim()),
            _.input({type: 'checkbox', class: 'drawer__toggle'}),
            this.renderContent()
        );
    }
}

module.exports = Drawer;
