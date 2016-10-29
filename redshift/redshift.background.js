var redshiftBackground = (function (document, window, chrome, EVENTS) {
	"use strict";

	var REFRESH_INTERVAL = 5 * 1000;
	var _sunsetTime = null;
	var _sunriseTime = null;

	function init() {
		_initializeLocation(_initializeSunsetAndSunriseTime);
		_addIsNightListener();
		window.setInterval(
			_sendSunsetOrSunriseEventMessage,
			REFRESH_INTERVAL);
	}

	function _addIsNightListener() {
		chrome.runtime.onMessage.addListener(function (requestMessage, sender, sendResponse) {
			if (requestMessage.type === EVENTS.IS_NIGHT) {
				var isRedShiftEnabled = settingsBackground.isRedShiftEnabled();
				var isNight = _isSunriseAndSunsetInitialized() && !_isCurrentDatetimeDay() && isRedShiftEnabled;

				sendResponse({
					isNight: isNight
				});
			}
		});
	}

	function _sendSunsetOrSunriseEventMessage() {
		var isRedShiftEnabled = settingsBackground.isRedShiftEnabled();
		var message = {
			type: null
		};

		if (_isCurrentDatetimeDay() || !isRedShiftEnabled) {
			message.type = EVENTS.SUNRISE;
		} else {
			message.type = EVENTS.SUNSET;
		}

		_sendMessageToAllTabs(message);
	}

	function _sendMessageToAllTabs(message) {
		chrome.tabs.query({}, function (tabs) {
			tabs.map((tab) => {
				chrome.tabs.sendMessage(tab.id, message);
			});
		});
	}

	function _isCurrentDatetimeDay() {
		var currentDatetime = new Date();
		return currentDatetime >= _sunriseTime && currentDatetime <= _sunsetTime;
	}

	function _initializeLocation(callback) {
		navigator.geolocation.getCurrentPosition(callback);
	}

	function _isSunriseAndSunsetInitialized() {
		return _sunsetTime !== null && _sunriseTime !== null;
	}

	function _initializeSunsetAndSunriseTime(position) {
		var firstTimeOfDay = new Date();
		firstTimeOfDay.setHours(0, 0, 0);

		_sunriseTime = firstTimeOfDay.sunrise(position.coords.latitude, position.coords.longitude);
		_sunsetTime = firstTimeOfDay.sunset(position.coords.latitude, position.coords.longitude);
	}

	return {
		init: init
	};
})(document, window, chrome, EVENTS);
