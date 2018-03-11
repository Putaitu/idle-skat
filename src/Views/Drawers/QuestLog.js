'use strict';

class QuestLog extends Game.Views.Drawers.Drawer {
    /**
     * Constructor
     */
    constructor(params) {
        super(params);

        // Test quest
        this.setQuest(
            'Test',
            'Reach 10000 DKK to get this quest',
            () => {
                return this.personalAccount >= 10000;
            }
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
     */
    get currentQuest() {
        for(let quest of this.quests || []) {
            if(!quest.isComplete()) { return quest; }
        }
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
