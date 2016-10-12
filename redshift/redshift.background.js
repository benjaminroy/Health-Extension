var redshiftBackground = (function (document, window, chrome, EVENTS) {
	"use strict";

	var REFRESH_INTERVAL = 5 * 1000;
	var _location = null;
	var _sunsetTime = null;
	var _sunriseTime = null;

	function init() {
		_initializeLocation(function () {
			_initializeSunsetAndSunriseTime();
		});

		_addIsNightListener();

		window.setInterval(function () {
			_sendSunsetOrSunriseEventMessage();
		}, REFRESH_INTERVAL);
	}

	function _addIsNightListener() {
		chrome.runtime.onMessage.addListener(function (requestMessage, sender, sendResponse) {
			if (requestMessage.type === EVENTS.IS_NIGHT) {
				var isNight = _isSunriseAndSunsetInitialized() && !_isCurrentDatetimeDay();

				sendResponse({
					isNight: isNight
				});
			}
		});
	}

	function _sendSunsetOrSunriseEventMessage() {
		var message = {
			type: null
		};

		if (_isCurrentDatetimeDay()) {
			message.type = EVENTS.SUNRISE;
		} else {
			message.type = EVENTS.SUNSET;
		}

		_sendMessageToAllTabs(message);
	}

	function _sendMessageToAllTabs(message) {
		chrome.tabs.query({}, function (tabs) {
			for (var i = 0; i < tabs.length; i++) {
				var tab = tabs[i];

				chrome.tabs.sendMessage(tab.id, message);
			}
		});
	}

	function _isCurrentDatetimeDay() {
		var currentDatetime = new Date();

		return currentDatetime >= _sunriseTime && currentDatetime <= _sunsetTime;
	}

	function _initializeLocation(callback) {
		navigator.geolocation.getCurrentPosition(function (position) {
			_location = position;
			callback();
		});
	}

	function _isSunriseAndSunsetInitialized() {
		return _sunriseTime !== null && _sunriseTime !== null;
	}

	function _initializeSunsetAndSunriseTime() {
		var firstTimeOfDay = new Date();
		firstTimeOfDay.setHours(0, 0, 0);

		_sunriseTime = firstTimeOfDay.sunrise(_location.coords.latitude, _location.coords.longitude);
		_sunsetTime = firstTimeOfDay.sunset(_location.coords.latitude, _location.coords.longitude);
	}

	return {
		init: init
	};
})(document, window, chrome, EVENTS);
