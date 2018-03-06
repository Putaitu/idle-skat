'use strict';

class CoinStack extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.currentAmount = this.amount;
        this.coinHeight = this.coinHeight || 10;
        this.label = this.label || '';
        this.color = this.color || '#000000';

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
        if(this.amount > this.currentAmount) {
            this.currentAmount++;

            let targetAmount = this.currentAmount;

            let coin = _.div({class: 'coin-stack__coin in', style: 'bottom: ' + ((this.currentAmount - 1) * this.coinHeight) + 'px'});

            setTimeout(() => {
                this.update();
            }, 50);

            setTimeout(() => {
                this.stackElement.setAttribute('style', this.getAmountStyle(targetAmount));
                coin.remove();
            }, 400);

            _.append(this.stackElement, coin);

        } else if(this.amount < this.currentAmount) {
            this.currentAmount--;
            
            let targetAmount = this.currentAmount;
                
            this.stackElement.setAttribute('style', this.getAmountStyle(targetAmount));

            let coin = _.div({class: 'coin-stack__coin out', style: 'bottom: ' + (this.currentAmount * this.coinHeight) + 'px'});

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

        this._amount = amount;

        this.update();
    }

    /**
     * Gets the coin amount
     *
     * @returns {Number} Amount
     */
    get amount() {
        return this._amount || 0;
    }

    /**
     * Gets the amount style
     *
     * @param {Number} amount
     *
     * @returns {String} Amount style
     */
    getAmountStyle(amount) {
        return 'height: calc(' + (amount || this.amount) + ' * ' + this.coinHeight + 'px);'; 
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'coin-stack'},
            _.div({class: 'coin-stack__stack', style: this.getAmountStyle()}),
            _.div({class: 'coin-stack__label', style: 'color: ' + this.color}, this.label)
        );
    }
}

module.exports = CoinStack;
