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
            'Reach ' + Game.MACHINE_PERSONAL_ACCOUNT_MINIMUM + ' DKK to get machines',
            () => { return this.personalAccount >= Game.MACHINE_PERSONAL_ACCOUNT_MINIMUM; }
        );
        
        this.setQuest(
            'Overdraft',
            'Reach ' + Game.OVERDRAFT_PERSONAL_ACCOUNT_MINIMUM + ' DKK to get an overdraft allowance',
            () => { return this.personalAccount >= Game.OVERDRAFT_PERSONAL_ACCOUNT_MINIMUM; }
        );
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
