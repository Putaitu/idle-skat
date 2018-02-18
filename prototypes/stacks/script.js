window._ = Crisp.Elements;

let sales = new CoinStack({
    model: {
        amount: 10,
        coinHeight: 10,
        label: 'Sales',
        color: 'green'
    }
});

let salesVat = new CoinStack({
    model: {
        amount: 0,
        coinHeight: 10,
        label: 'Sales VAT',
        color: 'green'
    }
});

let cost = new CoinStack({
    model: {
        amount: 4,
        coinHeight: 10,
        label: 'Cost',
        color: 'red'
    }
});

let costRefund = new CoinStack({
    model: {
        amount: 0,
        coinHeight: 10,
        label: 'Cost refund',
        color: 'green'
    }
});

let vat = new CoinStack({
    model: {
        amount: 0,
        coinHeight: 10,
        label: 'VAT',
        color: 'blue'
    }
});

let button = _.button('Next step').click(() => { nextStep(); });

_.replace(document.body,
    sales,
    cost,
    costRefund,
    vat,
    button
);

let step = 1;

function initStep() {
    switch(step) {
        case 1:
            button.innerHTML = 'Step 1: Take 25% of sales as VAT';
            break;

        case 2:
            button.innerHTML = 'Step 2: The cost VAT (25%) is refundable';
            break;

        case 3:
            button.innerHTML = 'Step 3: Withdraw 25% of the remaining cost from VAT';
            break;
    }
}

function nextStep() {
    switch(step) {
        case 1:
            CoinStack.transfer(sales, vat, sales.amount * 0.25);
            setTimeout(() => {
                initStep();
            }, 1000);
            break;

        case 2:
            CoinStack.transfer(cost, costRefund, cost.amount * 0.25);
            setTimeout(() => {
                initStep();
            }, 1000);
            break;
        
        case 3:
            vat.amount -= cost.amount * 0.25;
            setTimeout(() => {
                initStep();
            }, 1000);
            break;
    }
    
    step++;
}

initStep();
