class PieChart extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.model = this.model || {};

        this.fetch();
    }

    /**
     * Gets a coordinate based on percent
     *
     * @param {Number} percent
     *
     * @param {Object} Coordinate
     */
    getCoordinate(percent) {
        return {
            x: Math.cos(2 * Math.PI * percent),
            y: Math.sin(2 * Math.PI * percent)
        };
    }

    /**
     * Gets the mean of a list of numbers
     *
     * @param {Array} numbers
     *
     * @returns {Number} Mean
     */
    getMean(...numbers) {
        let mean = 0;

        for(let number of numbers) {
            mean += number;
        }

        mean /= numbers.length;

        return mean;
    }

    /**
     * Interpolates between 2 values
     *
     * @param {Number} value1
     * @param {Number} value2
     * @param {Number} amount
     */
    lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        
        return value1 + (value2 - value1) * amount;
    }

    /**
     * Animates all model from 0 to their configured values
     *
     * @param {Number} speed
     */
    animate(speed) {
        let finalModel = JSON.parse(JSON.stringify(this.model));
        let amount = 0;
        let time = Date.now();

        speed = speed || 1;
        
        let tick = () => {
            amount += (Date.now() - time) * 0.001 * speed;
            time = Date.now();

            for(let name in this.model) {
                this.model[name].percent = this.lerp(0, finalModel[name].percent, amount);
            }

            this._render();

            if(amount >= 1) { return; }

            requestAnimationFrame(() => { tick(); });
        };

        requestAnimationFrame(() => { tick(); });
    }

    /**
     * Sets the percentage and colour of a slice
     *
     * @param {String} name
     * @param {Number} percent
     * @param {String} color
     */
    setSlice(name, percent, color) {
        this.model[name] = {
            percent: percent,
            color: color
        };

        this._render();
    }

    /**
     * Template
     */
    template() {
        let percent = 0;
        let sliceIndex = 0;

        return _.div({class: 'pie-chart'},
            _.svg({viewBox: '-1 -1 2 2'},
                _.each(this.model, (key, slice) => {
                    let start = this.getCoordinate(percent);

                    percent += slice.percent;
                    
                    let end = this.getCoordinate(percent);

                    let largeArc = slice.percent > 0.5 ? 1 : 0;

                    let pathData = 
                        'M ' + start.x + ' ' + start.y + ' ' + 
                        'A 1 1 0 ' + largeArc + ' 1 ' + end.x + ' ' + end.y + 
                        'L 0 0';

                    sliceIndex++;

                    return _.path({d: pathData, fill: slice.color});
                })
            ),
            _.div({class: 'pie-chart__labels'},
                _.each(this.model, (key, slice) => {
                    if(!slice.label) { return; }

                    return _.div({class: 'pie-chart__label'}, slice.label + ': ' + Math.round(slice.value * percent) + ' kr.');
                })
            )
        );
    }
}

module.exports = PieChart;
