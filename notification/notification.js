var sendNotification = (function(type) {

    var _settings = chrome.extension.getBackgroundPage().settings;
    console.log(_settings.eyesNotifEnable);
    var _title, _options;
    var _spawnNotification = function() {
        var notification = new Notification(_title, _options);
        setTimeout(notification.close.bind(notification), 5000);
    };

    if (type === "eye") {
        if (!_settings.eyesNotifEnable) {
            return;
        }
        _title = "Eyes Break!";
        _options = {
            body: "Look at 20 meters for 20 seconds.",
            icon: "notification/eye.png"
        };
    } else if (type === "heart"){
        if(!_settings.standupNotifEnable) {
            return;
        }
        _title = "Stand up Break!";
        _options = {
            body: "Move for 5 minutes and come back.",
            icon: "notification/heart.png"
        };
    } else {
        _title = type;
        _options = {
            icon: "heartbeat128.png"
        };
    }

    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        _spawnNotification();
    } else {
        console.log("The extension requires the 'notifications' permission, so this should never print.");
    }
});


//chrome.notifications.getPermissionLevel
