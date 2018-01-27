'use strict';

/**
 * The base model for everything
 */
class Entity {
    /**
     * Constructor
     *
     * @param {Object} params
     */
    constructor(params) {
        this.structure();

        if(params && params instanceof Object && !Array.isArray(params)) {
            for(let k in params) {
                switch(typeof this[k]) {
                    case 'number':
                        this[k] = parseFloat(params[k] || 0);
                        break;

                    case 'string':
                        this[k] = (params[k] || '').toString();
                        break;

                    default:
                        this[k] = params[k];
                        break;
                }
            }
        }

        Object.seal(this);
    }

    /**
     * Defines the structure of this model
     */
    structure() {}
}

module.exports = Entity;
