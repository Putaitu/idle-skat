'use strict';

class CoinStack extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = this.model || {};
        this.model.amount = this.model.amount || 0;
        this.model.currentAmount = this.model.amount;
        this.model.coinHeight = this.model.coinHeight || 0;
        this.model.label = this.model.label || '';
        this.model.color = this.model.color || '#000000';

        this.fetch();
    }

    /**
     * Transfers an amount from one stack to another
     *
     * @param {CoinStack} from
     * @param {CoinStack} to
     * @param {Number} amount
     */
    static transfer(from, to, amount) {
        if(from.amount < amount) { throw new Error('The coin stack does not have enough coins to transfer ' + amount + ' coins'); }

        from.amount -= amount;

        setTimeout(() => {
            to.amount += amount;
        }, 500);
    }

    /**
     * Gets the stack element
     *
     * @returns {HTMLElement} Stack element
     */
    get stackElement() {
        return this.element.querySelector('.coin-stack__stack');
    }

    /**
     * Updates the stack height
     */
    update() {
        if(this.model.amount > this.model.currentAmount) {
            this.model.currentAmount++;

            let targetAmount = this.model.currentAmount;

            let coin = _.div({class: 'coin-stack__coin in', style: 'bottom: ' + ((this.model.currentAmount - 1) * this.model.coinHeight) + 'px'});

            setTimeout(() => {
                this.update();
            }, 50);

            setTimeout(() => {
                this.stackElement.setAttribute('style', this.getAmountStyle(targetAmount));
                coin.remove();
            }, 400);

            _.append(this.stackElement, coin);

        } else if(this.model.amount < this.model.currentAmount) {
            this.model.currentAmount--;
            
            let targetAmount = this.model.currentAmount;
                
            this.stackElement.setAttribute('style', this.getAmountStyle(targetAmount));

            let coin = _.div({class: 'coin-stack__coin out', style: 'bottom: ' + (this.model.currentAmount * this.model.coinHeight) + 'px'});

            setTimeout(() => {
                this.update();
            }, 50);

            setTimeout(() => {
                coin.remove();
            }, 400);

            _.append(this.stackElement, coin);
        }
    }

    /**
     * Sets the coin amount
     *
     * @param {Number} amount
     */
    set amount(amount) {
        if(amount < 0) { amount = 0; }

        amount = Math.round(amount);

        this.model.amount = amount;

        this.update();
    }

    /**
     * Gets the coin amount
     *
     * @returns {Number} Amount
     */
    get amount() {
        return this.model.amount;
    }

    /**
     * Gets the amount style
     *
     * @param {Number} amount
     *
     * @returns {String} Amount style
     */
    getAmountStyle(amount) {
        return 'height: calc(' + (amount || this.model.amount) + ' * ' + this.model.coinHeight + 'px);'; 
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'coin-stack'},
            _.div({class: 'coin-stack__stack', style: this.getAmountStyle()}),
            _.div({class: 'coin-stack__label', style: 'color: ' + this.model.color}, this.model.label)
        );
    }
}

module.exports = CoinStack;
