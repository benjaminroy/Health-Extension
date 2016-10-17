var settingsBackground = (function(document, window, chrome) {
    "use strict";

    var _settings = {};

    function init(_callback) {
        _addSettingsChangedListener();
        _loadSettings();
        _callback();
    }

    function getSettings() {
        return _settings;
    }

    function getRedShiftEnabled() {
        return _settings.redShiftEnable;
    }

    function getEyesBreakEnabled() {
        return _settings.eyesBreakEnable;
    }

    function getHeartBreakEnabled() {
        return _settings.standupBreakEnable;
    }

    function _loadSettings() {
        chrome.storage.sync.get("settings", function(items) {
            _settings = items.settings;
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
        getRedShiftEnabled: getRedShiftEnabled,
        getEyesBreakEnabled: getEyesBreakEnabled,
        getHeartBreakEnabled: getHeartBreakEnabled
    };
})(document, window, chrome);
