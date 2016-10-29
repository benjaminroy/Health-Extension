var redshiftBackground = (function (document, window, chrome, EVENTS) {
	"use strict";

	var REFRESH_INTERVAL = 5 * 1000;
	var _sunsetTime = null;
	var _sunriseTime = null;

	function init() {
		navigator.geolocation.getCurrentPosition(_initializeSunsetAndSunriseTime);
		_addIsRedShiftListener();
		window.setInterval(
			_prepareIsRedShiftMessageTo,
			REFRESH_INTERVAL,
			_sendMessageToAllTabs);
	}

	function _addIsRedShiftListener() {
		chrome.runtime.onMessage.addListener(function (requestMessage, sender, sendResponse) {
			if (requestMessage.type === EVENTS.IS_REDSHIFT) {
				//_makeSureSunrizeAndSunsetAreInitialized();
				_prepareIsRedShiftMessageTo(sendResponse);
			}
		});
	}

	function _prepareIsRedShiftMessageTo(callback) {
		var isRedShiftEnabled = settingsBackground.isRedShiftEnabled();
		var isRedShift = !_isCurrentDatetimeDay() && isRedShiftEnabled;
		var message = {isRedShift: isRedShift};
		callback(message);
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

	function _initializeSunsetAndSunriseTime(position) {
		var firstTimeOfDay = new Date();
		firstTimeOfDay.setHours(0, 0, 0);

		_sunriseTime = firstTimeOfDay.sunrise(position.coords.latitude, position.coords.longitude);
		_sunsetTime = firstTimeOfDay.sunset(position.coords.latitude, position.coords.longitude);
	}

	// function _makeSureSunrizeAndSunsetAreInitialized() {
	// 	var isSunriseAndSunsetInitialized = _sunsetTime !== null && _sunriseTime !== null;
	// 	if(!_isSunriseAndSunsetInitialized)
	// 		_initializeLocation(_initializeSunsetAndSunriseTime);
	// }

	return {
		init: init
	};
})(document, window, chrome, EVENTS);
