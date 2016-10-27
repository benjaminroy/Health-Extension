var notification = (function(document, window, chrome) {
    'use strict';

    var _title, _options;

    function _spawnNotification() {
        var notification = new Notification(_title, _options);
        setTimeout(notification.close.bind(notification), 5000);
    }

    function sendNotification(type) {
        if (type === ID.IS_EYE) {
            var isEyesBreakEnabled = settingsBackground.isEyesBreakEnabled();
            if (isEyesBreakEnabled !== undefined && !isEyesBreakEnabled) {
                return;
            }
            _title = "Eyes Break!";
            _options = {
                body: "Look at 20 meters for 20 seconds.",
                icon: "notification/eye.png"
            };
        } else if (type === ID.IS_HEART) {
            var isHeartBreakEnabled = settingsBackground.isHeartBreakEnabled();
            if(isHeartBreakEnabled !== undefined && !isHeartBreakEnabled) {
                return;
            }
            _title = "Stand up Break!";
            _options = {
                body: "Move for 5 minutes and come back.",
                icon: "notification/heart.png"
            };
        } else if (type === ID.IS_REDSHIFT) {
            _title = type;
            _options = {
                body: "Redshift have been activated.",
                icon: "/icons/heartbeat128.png"
            };
        } else {
            _title = type;
            _options = {
                icon: "/icons/heartbeat128.png"
            };
        }

        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            _spawnNotification();
        } else {
            console.log("The extension requires the 'notifications' permission, so this should never print.");
        }
    }

    return {
        sendNotification: sendNotification
    };
})(document, window, chrome);

//chrome.notifications.getPermissionLevel
