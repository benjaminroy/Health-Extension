var settingsBackground = (function(document, window, chrome, ID) {
    "use strict";

    var _settings = {};

    function init(_callback) {
        firstTime();
        _loadSettings(_callback);
        _addSettingsChangedListener();
        _isHeartBreakEnabledListener();
        _isEyesBreakEnabledListener();
    }

    function getSettings()              {return _settings;}
    function isHeartBreakEnabled()      {return _settings.heart;}
    function isHeartNotifEnabled()      {return _settings.standupNotifEnable;}
    function isHeartTextMsgEnabled()    {return _settings.standupTextMsgEnable}
    function isEyesBreakEnabled()       {return _settings.eyes;}
    function isEyesNotifEnabled()       {return _settings.eyesNotifEnable;}
    function isEyesTextMsgEnabled()     {return _settings.EyesTextMsgEnabled;}
    function isRedShiftEnabled()        {return _settings.redShift;}

    function firstTime() {
        chrome.storage.sync.get("settings", function(items) {
            if(items.settings === undefined) {
                _settings = {
                    heart: 	                true
                    ,standupNotifEnable: 	true
                    //,standupTextMsgEnable:$('#standupTextMsgEnable').is(':checked')
                    ,standupSessionTime: 	55
                    ,eyes: 		            true
                    ,eyesNotifEnable:		true
                    //,eyesTextMsgEnable: 	false
                    ,eyesSessionTime: 		20
                    ,redShift:       		true
                };

                chrome.storage.sync.set({
                    'settings': _settings
                }, console.log("Health Extension: default settings loaded"));
            }
        });
    }

    function _loadSettings(_callback) {
        chrome.storage.sync.get("settings", function(items) {
            _settings = items.settings;
            _callback()
        });
    }

    function _addSettingsChangedListener() {
        chrome.storage.onChanged.addListener(function(changes, namespace) {
            for (key in changes) {
                var storageChange = changes[key];
                console.log('Storage key "%s" in namespace "%s" changed. '
                    + 'Old value was "%s", new value is "%s".',
                    key,
                    namespace,
                    storageChange.oldValue,
                    storageChange.newValue);
            }
        });
    }

    function _isHeartBreakEnabledListener() {
        console.log("OK");
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === ID.HEART) {
                port.onMessage.addListener(
                    trackers.initializeHeartCountdown
                );
            }
        });
    }

    function _isEyesBreakEnabledListener() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === ID.EYE) {
                port.onMessage.addListener(
                    trackers.initializeEyesCountdown
                );
            }
        });
    }

    // function _isRedShiftEnabledListener() {
    //     chrome.extension.onConnect.addListener(function(port) {
    //         if (port.name === ID.REDSHIFT) {
    //             port.onMessage.addListener(
    //                 //
    //             );
    //         }
    //     });
    // }

    return {
        init: init
        ,getSettings: getSettings
        ,isEyesBreakEnabled: isEyesBreakEnabled
        ,isEyesNotifEnabled: isEyesNotifEnabled
        ,isEyesTextMsgEnabled: isEyesTextMsgEnabled
        ,isHeartBreakEnabled: isHeartBreakEnabled
        ,isHeartNotifEnabled: isHeartNotifEnabled
        ,isHeartTextMsgEnabled: isHeartTextMsgEnabled
        ,isRedShiftEnabled: isRedShiftEnabled
        ,firstTime: firstTime
    };
})(document, window, chrome, ID);
