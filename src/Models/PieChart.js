'use strict';

/**
 * A flexible pie chart
 */
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
     * Sets translation
     *
     * @param {Number} x
     * @param {Number} y
     */
    setTranslation(x, y) {
        x = x || 0;
        y = y || 0;

        this.element.setAttribute('transform', 'translate(' + x + ', ' + y + ')');
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
    static lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        
        return value1 + (value2 - value1) * amount;
    }

    /**
     * Sets the percentage and colour of a slice
     *
     * @param {String} name
     * @param {Number} percent
     * @param {Number} duration
     * @param {String} color
     */
    setSlice(name, percent, duration, color) {
        let startPercent = this.model[name] ? this.model[name].percent : 0;
        let startColor = color || (this.model[name] ? this.model[name].color : 'transparent');

        this.model[name] = {
            percent: startPercent,
            color: startColor
        };

        duration = duration || 0;

        let amount = 0;
        let time = Date.now();    

        if(duration <= 0) {
            this.model[name].percent = percent;
            this.model[name].color = color || startColor;
            _.replace(this.element, this.renderSlices());
            return;
        }

        let tick = () => {
            let delta = (Date.now() - time) / 1000;
            amount += delta / duration;

            time = Date.now();

            this.model[name].percent = PieChart.lerp(startPercent, percent, amount);

            _.replace(this.element, this.renderSlices());

            if(amount >= 1) { return; }

            requestAnimationFrame(() => { tick(); });
        };

        requestAnimationFrame(() => { tick(); });
    }
   
    /**
     * Renders the slices
     *
     * @returns {Array} Slices
     */
    renderSlices() {
        let percent = 0;
        let sliceIndex = 0;

        return _.each(this.model, (name, slice) => {
            let start = this.getCoordinate(percent);

            percent += slice.percent;
            
            let end = this.getCoordinate(percent);

            let largeArc = slice.percent > 0.5 ? 1 : 0;

            let pathData = 
                'M ' + start.x + ' ' + start.y + ' ' + 
                'A 1 1 0 ' + largeArc + ' 1 ' + end.x + ' ' + end.y + 
                'L 0 0';

            sliceIndex++;

            return _.path({d: pathData, fill: slice.color, 'data-percent': slice.percent, 'data-name': name});
        });
    }

    /**
     * Template
     */
    template() {
        return _.svg({class: 'pie-chart ' + (this.className || ''), viewBox: '-1 -1 2 2'},
            this.renderSlices()
        );
    }
}

module.exports = PieChart;
