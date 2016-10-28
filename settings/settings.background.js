var settingsBackground = (function(document, window, chrome) {
    "use strict";

    var _settings = {};

    function init(_callback) {
        _addSettingsChangedListener();
        _isHeartBreakEnabledListener();
        _isEyesBreakEnabledListener();
        _loadSettings(function() {
            _callback();
        });
    }

    function getSettings() {
        return _settings;
    }

    function isEyesBreakEnabled() {
        return _settings.eyesBreakEnable;
    }

    function isEyesNotifEnabled() {
        return _settings.eyesNotifEnable;
    }

    function isEyesTextMsgEnabled() {
        return _settings.EyesTextMsgEnabled;
    }

    function isHeartBreakEnabled() {
        return _settings.standupBreakEnable;
    }

    function isHeartNotifEnabled() {
        return _settings.standupNotifEnable;
    }

    function isHeartTextMsgEnabled() {
        return _settings.standupTextMsgEnable
    }

    function isRedShiftEnabled() {
        return _settings.redShiftEnable;
    }

    function _loadSettings(_callback) {
        chrome.storage.sync.get("settings", function(items) {
            _settings = items.settings;
            _callback()
        });
    }

    function _isHeartBreakEnabledListener() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === "heartPort") {
                port.onMessage.addListener(function() {
                    trackers.initializeHeartCountdown();
                });
            }
        });
    }

    function _isEyesBreakEnabledListener() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === "eyesPort") {
                port.onMessage.addListener(function() {
                    trackers.initializeEyesCountdown();
                });
            }
        });
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
        isEyesBreakEnabled: isEyesBreakEnabled,
        isEyesNotifEnabled: isEyesNotifEnabled,
        isEyesTextMsgEnabled: isEyesTextMsgEnabled,
        isHeartBreakEnabled: isHeartBreakEnabled,
        isHeartNotifEnabled: isHeartNotifEnabled,
        isHeartTextMsgEnabled: isHeartTextMsgEnabled,
        isRedShiftEnabled: isRedShiftEnabled
    };
})(document, window, chrome);
