'use strict';

let current;

/**
 * The player model
 */
class Player extends Game.Models.Entity {
    /**
     * Structure
     */
    structure() {
        this.personalAccount = 50000;
        this.company = new Game.Models.Company();
        this.vatRecord = new Game.Models.VATRecord();
    }

    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        this.company = new Game.Models.Company(this.company);
        this.vatRecord = new Game.Models.VATRecord(this.vatRecord);
    }

    /**
     * Loads the player data
     *
     * @returns {Player} Player
     */
    static load() {
        return new Player(Game.Services.ConfigService.get('player'));
    }

    /**
     * Get the current player
     */
    static get current() {
        if(!current) {
            current = this.load();
        }

        return current;
    }

    /**
     * Saves the player data
     */
    save() {
        Game.Services.ConfigService.set('player', this);
    }
}

module.exports = Player;
