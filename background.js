/***** Dev Mode Settings *****/
var isDevMode = chrome.runtime.getManifest().update_url === undefined;
var acceleration = 1;
if (isDevMode) acceleration = 20;

/***** Initialisation *****/
 settingsBackground.init(function(){
     sendNotification("The app has started");
     redshiftBackground.init();
     trackers.init();
     chrome.browserAction.onClicked.addListener(trackers.switchMode);
});
