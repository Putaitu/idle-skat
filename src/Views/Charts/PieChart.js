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
     * @param {Number} duration
     * @param {Object} slice
     */
    setSlice(name, duration, slice) {
        if(!this.model[name]) {
            this.model[name] = {
                percent: 0,
                value: 0,
                color: 'transparent'
            };
        }

        let startPercent = this.model[name].percent || 0;
        let startColor = this.model[name].color || slice.color;
        let startValue = this.model[name].value || slice.value || 0;

        this.model[name].percent = startPercent;
        this.model[name].color = startColor;
        this.model[name].value = startValue;

        duration = duration || 0;

        let amount = 0;
        let time = Date.now();    

        if(duration <= 0) {
            this.model[name].percent = slice.percent || 0;
            this.model[name].color = slice.color;
            this.model[name].value = slice.value || 0;
            
            _.replace(this.svg, this.renderSlices());
            return;
        }

        let tick = () => {
            let delta = (Date.now() - time) / 1000;
            amount += delta / duration;

            time = Date.now();

            this.model[name].percent = PieChart.lerp(startPercent, slice.percent, amount) || 0;
            this.model[name].value = PieChart.lerp(startValue, slice.value, amount) || 0;

            _.replace(this.svg, this.renderSlices());
            _.replace(this.labels, this.renderLabels());

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
     * Renders the labels
     *
     * @returns {Array} Array of labels
     */
    renderLabels() {
        return _.each(this.model, (name, slice) => {
            if(!slice.label) { return; }

            return _.label({class: 'widget widget--label pie-chart__label', style: 'border-left: 2em solid ' + slice.color},
                _.if(slice.showPercentage,
                    _.span({class: 'pie-chart__label__percent'}, Math.round(slice.percent * 100) + '%')
                ),
                slice.label + ' (' + Math.round(slice.value) + 'kr.)'
            );
        });
    }

    /**
     * Template
     */
    template() {
        return _.div({class: 'pie-chart ' + (this.className || '')},
            this.svg = _.svg({class: 'pie-chart__svg', viewBox: '-1 -1 2 2'},
                this.renderSlices()
            ),
            this.labels = _.div({class: 'pie-chart__labels'},
                this.renderLabels()
            )
        );
    }
}

module.exports = PieChart;
