'use strict';

/**
 * A class for keeping track of VAT payments
 */
class VATPayment extends Game.Models.Entity {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        if(this.dueAt) {
            this.dueAt = new Date(this.dueAt);
        } else {
            this.dueAt = Game.Services.TimeService.currentTime;
            this.dueAt.setMonth(this.dueAt.getMonth() + 3);
        }
    }
    
    /**
     * Structure
     */
    structure() {
        this.isPaid = false;
        this.isReported = false;
        this.dueAt = null;
        this.fine = 0;
        this.amount = 0;
    }

    /**
     * Update fine
     */
    updateFine() {
        if(this.isPaid || !this.dueAt) { return; }

        let diffDays = Math.ceil((Game.Services.TimeService.currentTime.getTime() - this.dueAt.getTime()) / (1000 * 3600 * 24)); 

        this.fine = Math.floor(diffDays * 100); 
    }
}

module.exports = VATPayment;
