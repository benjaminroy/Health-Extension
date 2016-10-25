var notification = (function(document, window, chrome) {
    'use strict';

    var _title, _options;

    function init() {
        _addNotificationSentListener();
    }

    // Will be deleted
    function _addNotificationSentListener() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === "notification") {
                port.onMessage.addListener(function(type) {
                    _sendNotification(type);
                });
            }
        });
    }

    function _spawnNotification() {
        var notification = new Notification(_title, _options);
        setTimeout(notification.close.bind(notification), 5000);
    }

    function _sendNotification(type) {
        if (type === "eye") {
            var isEyesBreakEnabled = settingsBackground.getEyesBreakEnabled();
            if (isEyesBreakEnabled !== undefined && !isEyesBreakEnabled) {
                return;
            }
            _title = "Eyes Break!";
            _options = {
                body: "Look at 20 meters for 20 seconds.",
                icon: "notification/eye.png"
            };
        } else if (type === "heart") {
            var isHeartBreakEnabled = settingsBackground.getHeartBreakEnabled();
            if(isHeartBreakEnabled !== undefined && !isHeartBreakEnabled) {
                return;
            }
            _title = "Stand up Break!";
            _options = {
                body: "Move for 5 minutes and come back.",
                icon: "notification/heart.png"
            };
        } else if (type === "redshift") {
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
        init: init
    };
})(document, window, chrome);

//chrome.notifications.getPermissionLevel
