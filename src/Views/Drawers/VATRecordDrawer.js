'use strict';

/**
 * The drawer for VAT reminders and calculations
 */
class VATRecordDrawer extends Game.Views.Drawers.Drawer {
    /**
     * Constructor
     */
    constructor(params) {
        params = params || {};
        
        params.dueReports = [];
        params.duePayments = [];

        params.model = Game.Models.Player.current.vatRecord;
        
        super(params);
    }

    /**
     * Gets the drawer position
     */
    get position() {
        return 'bottom';
    }

    /**
     * Renders the preview of this drawer
     */
    renderPreview() {
        return _.div({class: 'drawer__preview'},
            _.label({class: 'drawer__preview__label'},
                'VAT Record'
            ),
            _.if(this.dueReports.length > 0 || this.duePayments.length > 0, 
                _.div({class: 'drawer__preview__notification'}, this.dueReports.length + this.duePayments.length)
            )
        );
    }

    /**
     * Updates this drawer
     */
    update() { 
        this.model.generatePayments();

        this.checkPayments();

        this.fetch();
    }

    /**
     * Checks a payment for any due dates
     *
     * @param {Number} year
     * @param {Number} quarter
     * @param {VATPayment} payment
     */
    checkPayment(year, quarter, payment) {
    }
       
    /**
     * Checks all payments
     */
    checkPayments() {
        this.duePayments = [];

        let previousQuarter = Game.Services.TimeService.previousQuarter;
        let currentYear = Game.Services.TimeService.currentYear;
        
        for(let year in this.model.payments) {
            let paymentYear = this.model.payments[year];
        
            for(let quarter in paymentYear) {
                if(
                    (quarter <= previousQuarter && year == currentYear) ||
                    year < currentYear
                ) {
                    let payment = paymentYear[quarter];

                    payment.updateFine();

                    if(!payment.isReported || !payment.isPaid) {
                        this.duePayments.push(payment);
                    }
                }
            }
        }
    }

    /**
     * Renders this drawer
     */
    renderContent() {
        return _.div({class: 'drawer__content'},
            _.each(this.model.payments, (year, quarters) => {
                return [
                    _.h4(year),
                    _.each(quarters, (quarter, payment) => {
                        if(payment.isPaid || !payment.dueAt) { return; }

                        return _.button({class: 'widget widget--button'}, quarter)
                            .click(() => {
                                if(!payment.isReported) {
                                    new Game.Views.Modals.VATReportingTool({
                                        year: year,
                                        quarter: quarter
                                    });

                                } else {
                                    Game.Models.Player.current.payQuarterlyVAT(year, quarter);

                                }
                            });
                    })
                ]
            })
        );
    }
}

module.exports = VATRecordDrawer;
