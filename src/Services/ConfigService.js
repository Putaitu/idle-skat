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
        }

        this.cache[key] = value;

        return value;
    }
}

module.exports = ConfigService;
