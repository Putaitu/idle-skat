'use strict';

/**
 * Resets hours, minutes and seconds of a date
 */
Date.prototype.reset = function() {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);

    return this;
};

/**
 * Adds hours to a date
 */
Date.prototype.addHours = function(h) {    
    this.setTime(this.getTime() + (h*60*60*1000)); 
    return this;   
}

/**
 * Adds days to a date
 */
Date.prototype.addDays = function(d) {
    this.setDate(this.getDate() + d); 
    return this;   
}

/**
 * Adds months to a date
 */
Date.prototype.addMonths = function(m) {
    this.setMonth(this.getMonth() + m); 
    return this;   
}

/**
 * Adds years to a date
 */
Date.prototype.addYears = function(y) {
    this.setYear(this.getFullYear() + y); 
    return this;   
}

/**
 * Gets the actual month
 */
Date.prototype.getMonthName = function() {
    const names = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    return names[this.getMonth()];
}

/**
 * Gets quarter from a date
 */
Date.prototype.getQuarter = function() {
    let month = this.getMonth() + 1;

    if(month <= 3) { return 1; }
    if(month <= 6) { return 2; }
    if(month <= 9) { return 3; }
    return 4;
}

/**
 * Pretty prints a date
 */
Date.prototype.prettyPrint = function() {
    let string = this.getFullYear() + '-';

    if(this.getMonth() + 1 < 10) {
        string += '0';
    }

    string += (this.getMonth() + 1) + '-';
    
    if(this.getDate() < 10) {
        string += '0';
    }

    string += this.getDate();

    return string;
}

/**
 * A global helper function for wrapping setTimeout in a promise
 *
 * @param {Number} timeout
 *
 * @returns {Promise} Callback
 */
window.wait = (timeout) => {
    timeout = timeout || 0;
    timeout *= 1000;

    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, timeout);
    });
};

/**
 * The service for managing time
 */
class TimeService {
    /**
     * Starts the clock
     */
    static startClock() {
        let startDate = new Date();
        startDate.reset();
        startDate.setMonth(0);
        startDate.setDate(1);

        Game.Services.ConfigService.set('time', startDate.getTime());
        Game.Services.ConfigService.set('startTime', startDate.getTime());
    }

    /**
     * Sets paused time
     *
     * @param {Boolean} isPaused
     */
    static set isPaused(isPaused) {
        this._isPaused = isPaused;
    }

    /**
     * Gets paused time
     *
     * @returns {Boolean} Is paused
     */
    static get isPaused() {
        return !!document.querySelector('.modal') || !!this._isPaused;
    }

    /**
     * Ticks the time
     */
    static tick() {
        let time = this.currentTime;

        time.addHours(this.hoursPerSecond);

        this.isNewDay = this.lastDate !== time.getDate();

        this.lastDate = time.getDate();

        Game.Services.ConfigService.set('time', time.getTime());
    }

    /**
     * Gets hours per second
     *
     * @returns {Number} Hours per second
     */
    static get hoursPerSecond() {
        return 6 * (this.speed || 1);
    }

    /**
     * Adds days to the current time
     *
     * @param {Number} amount
     */
    static addDays(amount) {
        let time = this.currentTime;

        time.addHours(amount * 24);

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
     * Sets the current time
     */
    static set currentTime(time) {
        Game.Services.ConfigService.set('time', time.getTime());
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
     * Gets the current date
     */
    static get currentDate() {
        return this.currentTime.getDate()
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
     * Gets a quarter from a month
     *
     * @param {Number} month
     *
     * @returns {Number} Quarter
     */
    static getQuarterFromMonth(month) {
        if(month > 9) {
            return 4;
        } else if(month > 6) {
            return 3;
        } else if(month > 3) {
            return 2;
        } else {
            return 1;
        }
    }

    /**
     * Gets the current quarter
     */
    static get currentQuarter() {
        return this.getQuarterFromMonth(this.currentTime.getMonth() + 1)
    }

    /**
     * Goes to the next year
     */
    static goToNextYear() {
        let time = this.currentTime;

        time.setYear(time.getFullYear() + 1);
        time.setMonth(0);
        time.setDate(1);

        this.currentTime = time;
    }
}

module.exports = TimeService;
