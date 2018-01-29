'use strict';

const HOURS_PER_SECOND = 2; 

/**
 * The service for managing time
 */
class TimeService {
    /**
     * Starts the clock
     */
    static startClock() {
        Game.Services.ConfigService.set('time', Date.now());
        Game.Services.ConfigService.set('startTime', Date.now());
    }

    /**
     * Ticks the time
     */
    static tick() {
        let time = this.currentTime;

        time.addHours(HOURS_PER_SECOND);

        Game.Services.ConfigService.set('time', time.getTime());
    }

    /**
     * Adds days to the current time
     *
     * @param {Number} amount
     */
    static addDays(amount) {
        if(amount < 1) { return; }

        let time = this.currentTime;

        time.addDays(amount);

        Game.Services.ConfigService.set('time', time.getTime());
    }
    
    /**
     * Gets the start time
     */
    static get startTime() {
        let unix = Game.Services.ConfigService.get('startTime');

        if(!unix) { return new Date(); }

        return new Date(unix);
    }

    /**
     * Gets the current time
     */
    static get currentTime() {
        let unix = Game.Services.ConfigService.get('time');

        if(!unix) { return new Date(); }

        return new Date(unix);
    }
    
    /**
     * Gets the current year
     */
    static get currentYear() {
        return this.currentTime.getFullYear();
    }
    
    /**
     * Gets the current month
     */
    static get currentMonth() {
        return this.currentTime.getMonth() + 1;
    }

    /**
     * Gets the previous quarter
     */
    static get previousQuarter() {
        let quarter = this.currentQuarter - 1;

        if(quarter <= 0) {
            quarter = 4;
        }

        return quarter;
    }

    /**
     * Gets the current quarter
     */
    static get currentQuarter() {
        let month = this.currentTime.getMonth() + 1;
        
        if(month >= 9) {
            return 4;
        } else if(month >= 6) {
            return 3;
        } else if(month >= 3) {
            return 2;
        } else {
            return 1;
        }
    }
}

module.exports = TimeService;
