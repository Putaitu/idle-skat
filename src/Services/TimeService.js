'use strict';

const TIME_SPEED = 6000;

/**
 * The service for managing time
 */
class TimeService {
    /**
     * Gets the start time
     */
    static get startTime() {
        return new Date(Game.Services.ConfigService.get('startTime') || Date.now()); 
    }

    /**
     * Starts the clock
     */
    static startClock() {
        Game.Services.ConfigService.set('startTime', Date.now());
    }

    /**
     * Gets the current time
     */
    static get currentTime() {
        return new Date(new Date().getTime() + (new Date().getTime() - this.startTime.getTime()) * TIME_SPEED);
    }
}

module.exports = TimeService;
