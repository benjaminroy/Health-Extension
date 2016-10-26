var settingsBackground = (function(document, window, chrome) {
    "use strict";

    var _settings = {};

    function init(_callback) {
        _addSettingsChangedListener();
        _loadSettings(function() {
            _callback();
        });
    }

    function getSettings() {
        return _settings;
    }

    function getEyesBreakEnabled() {
        return _settings.eyesBreakEnable;
    }

    function getEyesNotifEnabled() {
        return _settings.eyesNotifEnable;
    }

    function getEyesTextMsgEnabled() {
        return _settings.EyesTextMsgEnabled;
    }

    function getHeartBreakEnabled() {
        return _settings.standupBreakEnable;
    }

    function getHeartNotifEnabled() {
        return _settings.standupNotifEnable;
    }

    function getHeartTextMsgEnabled() {
        return _settings.standupTextMsgEnable
    }

    function getRedShiftEnabled() {
        return _settings.redShiftEnable;
    }

    function _loadSettings(_callback) {
        chrome.storage.sync.get("settings", function(items) {
            _settings = items.settings;
            _callback()
        });
    }

    function _addSettingsChangedListener() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === "settingsUpdate") {
                port.onMessage.addListener(function(settingsImport) {
                    _settings = settingsImport;
                });
            }
        });
    }

    return {
        init: init,
        getSettings: getSettings,
        getEyesBreakEnabled: getEyesBreakEnabled,
        getEyesNotifEnabled: getEyesNotifEnabled,
        getEyesTextMsgEnabled: getEyesTextMsgEnabled,
        getHeartBreakEnabled: getHeartBreakEnabled,
        getHeartNotifEnabled: getHeartNotifEnabled,
        getHeartTextMsgEnabled: getHeartTextMsgEnabled,
        getRedShiftEnabled: getRedShiftEnabled
    };
})(document, window, chrome);
