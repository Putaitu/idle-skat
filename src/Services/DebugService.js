'use strict';

let autoReloadInterval;

/**
 * A service for debugging
 */
class DebugService {
    /**
     * Sets auto reload on/off
     *
     * @param {Boolean} isActive
     */
    static setAutoReload(isActive) {
        if(!isActive && autoReloadInterval) {
            clearInterval(autoReloadInterval);
        }

        if(isActive && !autoReloadInterval) {
            autoReloadInterval = setInterval(() => {
                this.reloadStyle();
                this.reloadScript();
            }, 500);
        }
    }

    /**
     * Reloads styles
     */
    static reloadStyle() {
        let styleTags = document.querySelectorAll('link');

        if(!styleTags) { return; }

        for(let i = 0; i < styleTags.length; i++) {
            if(styleTags[i].getAttribute('href').indexOf('css/app.css') === 0) {
                styleTags[i].setAttribute('href', 'css/app.css?' + Date.now());
                return;
            }
        }
    }

    /**
     * Reloads scripts
     */
    static reloadScript() {
        let scriptTags = document.querySelectorAll('script');

        if(!scriptTags) { return; }

        for(let i = 0; i < scriptTags.length; i++) {
            if(scriptTags[i].getAttribute('src').indexOf('js/app.js') === 0) {
                scriptTags[i].setAttribute('src', 'js/app.js?' + Date.now());
                return;
            }
        }
    }
}

module.exports = DebugService;
