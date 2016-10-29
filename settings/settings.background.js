var settingsBackground = (function(document, window, chrome, ID) {
    "use strict";

    var _settings = {};

    function init(_callback) {
        _loadSettings(_callback);
        _addSettingsChangedListener();
        _isHeartBreakEnabledListener();
        _isEyesBreakEnabledListener();
        _heartSessionTimeChanged();
        _eyesSessionTimeChanged();
    }

    function getSettings()              {return _settings;}
    function isEyesBreakEnabled()       {return _settings.eyesBreakEnable;}
    function isEyesNotifEnabled()       {return _settings.eyesNotifEnable;}
    function isEyesTextMsgEnabled()     {return _settings.EyesTextMsgEnabled;}
    function isHeartBreakEnabled()      {return _settings.standupBreakEnable;}
    function isHeartNotifEnabled()      {return _settings.standupNotifEnable;}
    function isHeartTextMsgEnabled()    {return _settings.standupTextMsgEnable}
    function isRedShiftEnabled()        {return _settings.redShiftEnable;}
    function getHeartSessionTime()      {return _settings.standupSessionTime;}
    function getEyesSessionTime()       {return _settings.eyesSessionTime;}

    function _loadSettings(_callback) {
        chrome.storage.sync.get("settings", function(items) {
            _settings = items.settings;
            _callback()
        });
    }

    function _isHeartBreakEnabledListener() {
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

    function _isRedShiftEnabledListener() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === ID.REDSHIFT) {
                port.onMessage.addListener(
                    //
                );
            }
        });
    }

    function _heartSessionTimeChanged() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === 'heartTimePort') {
                port.onMessage.addListener(function(time) {
                    trackers.heartSessionTimeChanged(time);
                });
            }
        })
    }

    function _eyesSessionTimeChanged() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === 'eyesTimePort') {
                port.onMessage.addListener(function(time) {
                    trackers.eyesSessionTimeChanged(time);
                });
            };
        })
    }

    function _addSettingsChangedListener() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === "settingsPort") {
                port.onMessage.addListener(function(settingsImport) {
                    _settings = settingsImport;
                });
            }
        });
    }

    return {
        init: init,
        getSettings: getSettings,
        getHeartSessionTime: getHeartSessionTime,
        getEyesSessionTime: getEyesSessionTime,
        isEyesBreakEnabled: isEyesBreakEnabled,
        isEyesNotifEnabled: isEyesNotifEnabled,
        isEyesTextMsgEnabled: isEyesTextMsgEnabled,
        isHeartBreakEnabled: isHeartBreakEnabled,
        isHeartNotifEnabled: isHeartNotifEnabled,
        isHeartTextMsgEnabled: isHeartTextMsgEnabled,
        isRedShiftEnabled: isRedShiftEnabled
    };
})(document, window, chrome, ID);
