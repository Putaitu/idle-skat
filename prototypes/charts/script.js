window._ = Crisp.Elements;

class Page extends Crisp.View {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.fetch();
    }

    /**
     * Pre render
     */
    prerender() {
        this.sales = new PieChart({
            className: 'sales'
        });

        this.sales.setSlice('total', 0.75, 1, 'Coral');
        this.sales.setSlice('vat', 0.25, 1, 'CornflowerBlue');

        this.salesVat = new PieChart({
            className: 'sales-vat',
            model: {
                empty: { percent: 0.75, color: 'transparent' },
                vat: { percent: 0.25, color: 'red', label: 'VAT', value: 25 }
            }
        });

        this.cost = new PieChart({
            className: 'cost'
        });
        
        this.cost.setSlice('total', 0.75, 1, 'Coral');
        this.cost.setSlice('vat', 0.25, 1, 'CornflowerBlue');

        this.costVat = new PieChart({
            className: 'cost-vat',
            model: {
                empty: { percent: 0.75, color: 'transparent' },
                vat: { percent: 0.25, color: 'green', label: 'VAT', value: 15 },
            }
        });
        
        setTimeout(() => {
            this.salesVat.element.classList.toggle('animating', true);
            this.costVat.element.classList.toggle('animating', true);
        
            setTimeout(() => {
                this.salesVat.setSlice('vat', this.salesVat.model.vat.percent - this.costVat.model.vat.percent, 0);
                this.costVat.setSlice('empty', 1 - this.salesVat.model.vat.percent, 0.5);
                this.costVat.setSlice('vat', 0, 0.5);
            }, 2000);
        }, 1000);
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'page'}, 
            _.div({class: 'row'},
                this.sales,
                this.salesVat
            ),
            _.div({class: 'row'},
                this.cost,
                this.costVat
            )
        )
    }
}


_.replace(document.body, new Page());
