'use strict';

/**
 * A modal for transffering funds
 */
class Transfer extends Game.Views.Modals.Modal {
    /**
     * Pre render
     */
    prerender() {
        this.size = this.size || 'small';
        this.amount = 0;
        this.canCancel = false;
    }   

    /**
     * Render header
     */
    renderHeader() {
        return 'Transfer funds';
    }

    /**
     * Sets the max amount
     *
     * @param {Number} max
     */
    set max(max) {
        this.element.querySelector('input').max = max;
        this.element.querySelector('.text-center:last-child').innerHTML = max;
        this.element.querySelector('input').value = max;
        this.amount = max;

        this.update();
    }

    /**
     * Render body
     */
    renderBody() {
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);

        return _.div({class: 'widget-group'},
            _.div({class: 'widget widget--label text-center'}, 0),
            _.input({class: 'widget widget--range', type: 'range', min: 0, max: companyAccount})
                .on('input', (e) => { this.onChangeAmount(e.currentTarget.value); }),
            _.div({class: 'widget widget--label text-center'}, companyAccount)
        );
    }

    /**
     * Event: Change amount
     *
     * @param {Number} amount
     */
    onChangeAmount(amount) {
        this.amount = parseFloat(amount);

        this.update();
    }

    /**
     * Event: Click transfer
     */
    onClickTransfer() {
        let companyAccount = Game.Services.ConfigService.get('companyAccount', 0);
        let personalAccount = Game.Services.ConfigService.get('personalAccount', 0);

        if(companyAccount < this.amount) { return; }

        Game.Services.ConfigService.set('companyAccount', companyAccount - this.amount);
        Game.Services.ConfigService.set('personalAccount', personalAccount + this.amount);

        this.trigger('submit');

        this.close();
    }

    /**
     * Render footer
     */
    renderFooter() {
        return _.button({dynamicContent: true, class: 'widget widget--button blue align-right'}, 'Transfer ' + this.amount + ' DKK')
            .click(() => { this.onClickTransfer(); });
    }
}

module.exports = Transfer;
