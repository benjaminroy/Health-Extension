var settingsBackground = (function(document, window, chrome, ID) {
    "use strict";

    var _settings = {};

    function init(_callback) {
        firstTime();
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
        console.log("_addSettingsChangedListener");
        chrome.storage.onChanged.addListener(function(changes, namespace) {
            _settings = changes.settings.newValue;
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
                port.onMessage.addListener(function(message) {
                    trackers.initializeEyesCountdown()
                });
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

    function _heartSessionTimeChanged() {
        chrome.extension.onConnect.addListener(function(port) {
            if (port.name === ID.HEART_TIME) {
                port.onMessage.addListener(function() {
                    var time = _settings.heartTime;
					console.log("time");
					console.log(_settings);
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
					console.log("time");
					console.log(_settings);
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
        ,firstTime: firstTime
    };
})(document, window, chrome, ID);
