window._ = Crisp.Elements;

let sales = new PieChart({
    model: {
        sales: { percent: 0.75, color: 'Coral', label: 'Sales', value: 100 },
        vat: { percent: 0.25, color: 'CornflowerBlue', label: 'VAT', value: 25 }
    }
});

sales.animate();

let cost = new PieChart({
    model: {
        cost: { percent: 0.85, color: 'Coral', label: 'Cost', value: 100 },
        vat: { percent: 0.15, color: 'CornflowerBlue', label: 'VAT', value: 15 },
    }
});

cost.animate();

_.replace(document.body, 
    sales,
    cost
);
