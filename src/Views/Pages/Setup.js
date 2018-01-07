'use strict';

class Setup extends Crisp.View {
    /**
     * Constrcutor
     */
    constructor(params) {
        super(params);

        this.model = Game.Services.ConfigService.get('setup') || {};
            
        this.fetch();
    }

    /**
     * Renders a field
     *
     * @param {String} key
     * @param {String} label
     * @param {String} description
     *
     * @returns {HTMLElement} Field element
     */
    renderField(key, label, description) {
        return _.div({class: 'page--setup__user-input__field'},
            _.div({class: 'page--setup__user-input__field__label'}, label),
            _.input({class: 'page--setup__user-input__field__input', value: this.model[key]}),
            _.div({class: 'page--setup__user-input__field__description'}, description)
        );
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page page--setup'},
            _.div({class: 'page--setup__user-input'},
                this.renderField('capital', 'Capital', 'How much you, as the owner, invest for the company\'s spending'),
                this.renderField('unitPrice', 'Unit price', 'How much you want to charge for your product'),
            ),
            _.div({class: 'page--setup__output'},

            )
        );
    }
}

module.exports = Setup;
