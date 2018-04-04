'use strict';

/**
 * The service for user config stored in localStorage
 */
class ConfigService {
    /**
     * Sets a value
     *
     * @param {String} key
     * @param {Object} value
     */
    static set(key, value) {
        if(!this.cache) { this.cache = {}; }

        if(!!parseFloat(value)) {
            value = parseFloat(value);
            value = Math.round(value * 100) / 100;
        }

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch(e) {
            localStorage.setItem(key, value);
        }
        
        this.cache[key] = value;
    }

    /**
     * Gets a value
     *
     * @param {String} key
     * @param {Object} defaultValue
     *
     * @returns {Object} Value
     */
    static get(key, defaultValue) {
        if(!this.cache) { this.cache = {}; }

        if(this.cache[key]) { return this.cache[key]; }

        let value;

        // Parse object
        try {
            value = JSON.parse(localStorage.getItem(key)) || defaultValue;

        } catch(e) {
            value = localStorage.getItem(key) || defaultValue;
        }
        
        // Parse number
        if(!!parseFloat(value)) {
            value = parseFloat(value);    
            value = Math.round(value * 100) / 100;
        }

        this.cache[key] = value;

        return value;
    }

    /**
     * Applies a test year
     */
    static applyTestYear() {
        this.set('btax', {"2018":{"1":{"isPaid":true,"amount":950},"2":{"isPaid":true,"amount":950},"3":{"isPaid":true,"amount":950},"4":{"isPaid":true,"amount":950},"5":{"isPaid":true,"amount":950},"6":{"isPaid":true,"amount":950},"7":{"isPaid":true,"amount":950},"8":{"isPaid":true,"amount":950},"9":{"isPaid":true,"amount":950},"10":{"isPaid":true,"amount":950},"11":{"isPaid":true,"amount":950},"12":{"isPaid":true,"amount":950}},"2019":{"1":{"isPaid":false,"amount":950},"2":{"isPaid":false,"amount":950}}});
        this.set('cost', {"2018":{"1":1273.5,"2":1104.5,"3":844.5,"4":1013.5,"5":1234.5,"6":1182.5,"7":805.5,"8":779.5,"9":740.5,"10":779.5,"11":610.5,"12":701.5}});
        this.set('sales', {"2018":{"1":2462.5,"2":3500,"3":3687.5,"4":2925,"5":3562.5,"6":3512.5,"7":3875,"8":3750,"9":3562.5,"10":3750,"11":2937.5,"12":3375}});
        this.set('vat', {"2018":{"1":{"amount":1285.2,"isPaid":false,"isReported":true},"2":{"amount":1313.6,"isPaid":false,"isReported":true},"3":{"amount":1772.1,"isPaid":false,"isReported":true}}});

        let time = new Date(this.get('startTime'));

        time.setMonth(11);
        time.setDate(31);

        this.set('time', time.getTime());

        location.reload();
    }
}

module.exports = ConfigService;
