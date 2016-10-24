/***** Initialize *****/
notification.init();
settingsBackground.init(function() {
    redshiftBackground.init();
    trackers.init();
});


// Notes:
// the redshift should be the first function to be executed
// in order to minimize the time the screen is white
