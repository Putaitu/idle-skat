'use strict';

/**
 * A canvas of charts
 */
class ChartCanvas {
    /**
     * Constructor
     *
     * @param {Array} charts
     */
    constructor(...charts) {
        this.charts = charts;
        this.element = _.svg({class: 'chart-canvas', viewBox: '-1 -1 2 2'});

        for(let i = 0; i < this.charts.length; i++) {
            this.charts[i].element = _.g({class: 'pie-chart'}, Array.from(this.charts[i].element.children));

            _.append(this.element, this.charts[i]);
        }
    }

    /**
     * Updates viewBox dimensions to accommodate the charts inside
     */
    update() {
        let box = this.element.getBBox();

        this.element.setAttribute('viewBox', box.x + ' ' + box.y + ' ' + box.width + ' ' + box.height);
    }
}

module.exports = ChartCanvas;
