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

        if(params && params instanceof Object === false && Array.isArray(params)) {
            for(let k in params) {
                this[k] = params[k];
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
