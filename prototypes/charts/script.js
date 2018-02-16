class PieChart extends Crisp.View {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.slices = this.slices || {};

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
     * Template
     */
    template() {
        let percent = 0;

        return _.svg({class: 'pie-chart', viewBox: '-1 -1 2 2', style: 'transform: rotate(-90deg);'},
            _.each(this.slices, (key, slice) => {
                let start = this.getCoordinate(percent);

                percent += slice.percent;
                
                let end = this.getCoordinate(percent);

                let largeArc = slice.percent > 0.5 ? 1 : 0;

                let pathData = 
                    'M ' + start.x + ' ' + start.y + ' ' + 
                    'A 1 1 0 ' + largeArc + ' 1 ' + end.x + ' ' + end.y + 
                    'L 0 0';

                return _.path({d: pathData, fill: slice.color});
            })
        );
    }
}

window._ = Crisp.Elements;

_.replace(document.body, new PieChart({
    slices: {
        slice1: { percent: 0.1, color: 'Coral' },
        slice2: { percent: 0.65, color: 'CornflowerBlue' },
        slice3: { percent: 0.2, color: '#00ab6b' },
    }
}));
