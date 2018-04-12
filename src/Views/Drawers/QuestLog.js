'use strict';

/**
 * A visual representation of quests
 */
class QuestLog extends Game.Views.Drawers.Drawer {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);
        
        this.setQuest(
            'Machines',
            'Reach 💰 ' + Game.MACHINE_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to get machines that automate production!',
            () => { return this.personalAccount >= Game.MACHINE_PERSONAL_ACCOUNT_MINIMUM; }
        );
        
        this.setQuest(
            'Pricing',
            'Reach 💰 ' + Game.PRICING_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to set the price of your ' + Game.Services.ConfigService.get('productName') + '!',
            () => { return this.personalAccount >= Game.PRICING_PERSONAL_ACCOUNT_MINIMUM; }
        );

        this.setQuest(
            'Demand 1',
            'Reach 💰 ' + Game.INCREASED_DEMAND_1_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to increase the demand for ' + Game.Services.ConfigService.get('productName') + '!',
            () => { return this.personalAccount >= Game.INCREASED_DEMAND_1_PERSONAL_ACCOUNT_MINIMUM; }
        );
        
        this.setQuest(
            'Efficiency',
            'Reach 💰 ' + Game.INCREASED_EFFICIENCY_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to produce 2 ' + Game.Services.ConfigService.get('productName') + ' per click!',
            () => { return this.personalAccount >= Game.INCREASED_EFFICIENCY_PERSONAL_ACCOUNT_MINIMUM; }
        );
        
        this.setQuest(
            'Productivity',
            'Reach 💰 ' + Game.INCREASED_PRODUCTIVITY_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to increase machine productivity!',
            () => { return this.personalAccount >= Game.INCREASED_PRODUCTIVITY_PERSONAL_ACCOUNT_MINIMUM; }
        );
        
        this.setQuest(
            'Demand 2',
            'Reach 💰 ' + Game.INCREASED_DEMAND_2_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to increase the demand for ' + Game.Services.ConfigService.get('productName') + '!',
            () => { return this.personalAccount >= Game.INCREASED_DEMAND_2_PERSONAL_ACCOUNT_MINIMUM; }
        );
        
        this.setQuest(
            'Cost',
            'Reach 💰 ' + Game.REDUCED_PRODUCTION_COST_PERSONAL_ACCOUNT_MINIMUM + ' DKK in your personal account to lower the production cost of your ' + Game.Services.ConfigService.get('productName') + '!',
            () => { return this.personalAccount >= Game.REDUCED_PRODUCTION_COST_PERSONAL_ACCOUNT_MINIMUM; }
        );

        this.fetch();
    }

    /**
     * Gets the current amount in the personal account
     *
     * @returns {Number} Amount
     */
    get personalAccount() {
        return Game.Services.ConfigService.get('personalAccount', 0);
    }

    /**
     * Defines a quest
     *
     * @param {String} title
     * @param {String} message
     * @param {Function} isComplete
     */
    setQuest(title, message, isComplete) {
        if(!this.quests) { this.quests = []; }

        this.quests.push({
            title: title,
            message: message,
            isComplete: isComplete
        });
    }

    /**
     * Gets the current quest
     * NOTE: Side effect, stores completed quests in cache
     */
    get currentQuest() {
        let currentQuest;
        let completedQuests = Game.Services.ConfigService.get('completedQuests', []);

        for(let quest of this.quests || []) {
            if(!currentQuest && !quest.isComplete()) {
                currentQuest = quest;
            }

            if(quest.isComplete() && completedQuests.indexOf(quest.title) < 0) {
                completedQuests.push(quest.title);
            }
        }

        Game.Services.ConfigService.set('completedQuests', completedQuests);

        return currentQuest;
    }

    /**
     * Hearbeat
     */
    heartbeat() {
        this.fetch();
    }

    /**
     * Renders the content
     */
    renderContent() {
        let quest = this.currentQuest;

        if(!quest) { return; }

        return _.div({class: this.className + '__quest'},
            _.div({class: this.className + '__quest__title'}, quest.title),
            _.div({class: this.className + '__quest__message'}, quest.message)
        );
    }
}

module.exports = QuestLog;
