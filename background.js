/***** Dev Mode Settings *****/
var isDevMode = chrome.runtime.getManifest().update_url === undefined;
var acceleration = 1;
if (isDevMode) {
    acceleration = 1;
}

/***** Initialisation *****/
 settingsBackground.init(function() {
     redshiftBackground.init();
     trackers.init();
     chrome.browserAction.onClicked.addListener(trackers.switchMode);
});
