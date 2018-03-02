'use strict';

/**
 * A progress bar
 */
class ProgressBar extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.max = this.max || 100;
        this.value = this.value || 0;
        this.message = '';

        this.fetch();

        for(let progressBar of Crisp.View.getAll(ProgressBar)) {
            if(progressBar !== this) {
                progressBar.remove();
            }
        }

        _.append(document.body, this.element);
    }

    /**
     * Sets the progress
     *
     * @param {Number} value
     * @param {Number} max
     * @param {String} message
     */
    setProgress(value, max, message) {
        this.value = value;
        this.max = max;

        if(message) {
            this.message += '<br>' + message;
        }

        this._render();
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'widget widget--progress-bar'},
            _.progress({class: 'widget--progress-bar__progress', value: this.value, max: this.max}),
            _.if(this.message,
                _.div({class: 'widget--progress-bar__message'},
                    this.message
                )
            )
        );
    }
}

module.exports = ProgressBar;
