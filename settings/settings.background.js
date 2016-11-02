var settingsBackground = (function(document, window, chrome, ID, DEFAULTS) {
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
    function isHeartBreakEnabled()      {return _settings.heart;}
    function isHeartNotifEnabled()      {return _settings.standupNotifEnable;}
    function isEyesBreakEnabled()       {return _settings.eyes;}
    function isEyesNotifEnabled()       {return _settings.eyesNotifEnable;}
    function isRedShiftEnabled()        {return _settings.redShift;}
    function getHeartSessionTime()      {return _settings.heartTime;}
    function getEyesSessionTime()       {return _settings.eyesTime;}

    function setDefault(_callback) {
        _settings = DEFAULTS.SETTINGS;
        chrome.storage.sync.set({
            'settings': _settings
        }, _callback());
    }

    function _loadSettings(_callback) {
        chrome.storage.sync.get("settings", function(items) {
            if(items.settings === undefined) {
                setDefault(_callback);
            } else {
                _settings = items.settings;
                _callback()
            }
        });
    }

    function _addSettingsChangedListener() {
        chrome.storage.onChanged.addListener(function(changes, namespace) {
            _settings = changes.settings.newValue;
        });
    }

    function _isHeartBreakEnabledListener() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === ID.HEART) {
                port.onMessage.addListener(trackers.initializeHeartCountdown);
            }
        });
    }

    function _isEyesBreakEnabledListener() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === ID.EYE) {
                port.onMessage.addListener(trackers.initializeEyesCountdown);
            }
        });
    }

    function _heartSessionTimeChanged() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === ID.HEART_TIME) {
                port.onMessage.addListener(function() {
                    var time = _settings.heartTime;
                    trackers.heartSessionTimeChanged(time);
                });
            }
        })
    }

    function _eyesSessionTimeChanged() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === ID.EYES_TIME) {
                port.onMessage.addListener(function() {
                    var time = _settings.eyesTime;
                    trackers.eyesSessionTimeChanged(time);
                });
            };
        })
    }


    return {
        init: init
        ,getSettings: getSettings
        ,getHeartSessionTime: getHeartSessionTime
        ,getEyesSessionTime: getEyesSessionTime
        ,isEyesBreakEnabled: isEyesBreakEnabled
        ,isEyesNotifEnabled: isEyesNotifEnabled
        ,isHeartBreakEnabled: isHeartBreakEnabled
        ,isHeartNotifEnabled: isHeartNotifEnabled
        ,isRedShiftEnabled: isRedShiftEnabled
        ,setDefault: setDefault
    };
})(document, window, chrome, ID, DEFAULTS);
