var notification = (function(document, window, chrome) {
    'use strict';

    var _title, _options;

    function _spawn() {
        var notification = new Notification(_title, _options);
        setTimeout(notification.close.bind(notification), 5000);
    }

    function send(type) {
        if (type === ID.EYE) {
            var isEyesBreakEnabled = settingsBackground.isEyesBreakEnabled();
            var isEyesNotifEnabled = settingsBackground.isEyesNotifEnabled();
            if (!isEyesBreakEnabled || !isEyesNotifEnabled) {
                return;
            }
            _title = "Eyes Break!";
            _options = {
                body: "Look at 20 meters for 20 seconds.",
                icon: "notification/eye.png"
            };
        } else if (type === ID.HEART) {
            var isHeartBreakEnabled = settingsBackground.isHeartBreakEnabled();
            var isHeartNotifEnabled = settingsBackground.isHeartNotifEnabled();
            var heartBreakTime = settingsBackground.getHeartBreakTime();
            if(!isHeartBreakEnabled || !isHeartNotifEnabled) {
                return;
            }
            _title = "Stand up Break!";
            _options = {
                body: chrome.i18n.getMessage("heartBreakNotifMessage", String(heartBreakTime)),
                icon: "notification/heart.png"
            };
        } else if (type === ID.REDSHIFT) {
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
            _spawn();
        } else {
            console.log("The extension requires the 'notifications' permission, so this should never print.");
        }
    }

    return {
        send: send
    };
})(document, window, chrome);

//chrome.notifications.getPermissionLevel
