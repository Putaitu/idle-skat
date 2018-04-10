'use strict';

class CoinStack extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.currentAmount = this.amount;
        this.coinHeight = this.coinHeight || 10;
        this.color = this.color || '#000000';

        this.coins = _.div({class: 'coin-stack__coins'});

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

            let coin = _.div({class: 'coin-stack__coin in', style: 'bottom: ' + ((this.getStackAmount(1) + 0.5) * this.coinHeight) + 'px'});

            setTimeout(() => {
                coin.remove();
                this.update();
            }, 400);

            _.append(this.coins, coin);

        } else if(this.amount < this.currentAmount) {
            this.currentAmount--;
            
            let coin = _.div({class: 'coin-stack__coin out', style: 'bottom: ' + ((this.getStackAmount(1) + 0.5) * this.coinHeight) + 'px'});

            setTimeout(() => {
                coin.remove();
                this.update();
            }, 400);

            _.append(this.coins, coin);

        } else if(this.element) {
            this.fetch();
        
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
     * @param {Number} index
     *
     * @returns {String} Amount style
     */
    getAmountStyle(index) {
        let amount = this.getStackAmount(index);

        if(index === 1) {
            amount -= this.coins.children.length;
        }

        return 'height: calc(' + amount + ' * ' + this.coinHeight + 'px); '; 
    }

    /**
     * Gets the position style
     *
     * @param {Number} index
     *
     * @return {String} Position style
     */
    getPositionStyle(index) {
        let zIndex = 100 - index;
        let opacity = 1 - (index * 0.1);

        if(opacity < 0) {
            opacity = 0;
        }

        let style =  'z-index: ' + zIndex + '; opacity: ' + opacity + '; ';

        if(index > 1) {
            let translateX = index * 10;

            if(index % 2) {
                translateX *= -1;
            }

            style += 'transform: translateX(' + translateX + 'px); ';
        }

        return style;
    }

    /**
     * Gets the amount of coins in a stack
     *
     * @param {Number} index
     *
     * @returns {Number} Amount
     */
    getStackAmount(index) {
        let maxCoinsPerStack = 10;

        if(index === 1) {
            return this.currentAmount % maxCoinsPerStack;
        }

        return maxCoinsPerStack;
    }
       
    /**
     * Gets total amount of coin stacks
     *
     * @returns {Number} Stacks
     */
    getTotalStacks() {
        let stacks = 0;
        let totalAmount = this.currentAmount;
        
        while(totalAmount > 0) {
            let i = stacks + 1;
            let thisAmount = this.getStackAmount(i);

            totalAmount -= thisAmount;
            stacks++;
        }

        return stacks;
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'coin-stack', 'data-amount': this.currentAmount},
            _.for(0, this.getTotalStacks(), (i) => {
                i++;
                
                let thisAmount = this.getStackAmount(i);

                return _.div({class: 'coin-stack__stack', 'data-index': i, 'data-amount': thisAmount, style: this.getAmountStyle(i) + this.getPositionStyle(i)});
            })
        );
    }

    /**
     * Post render
     */
    postrender() {
        _.append(this.element, this.coins);
    }
}

module.exports = CoinStack;
