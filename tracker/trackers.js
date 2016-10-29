var trackers = (function (chrome, TIME, ID, MODE, COLOR, ICON) {
	"use strict";

	chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.DEFAULT});

	var values = {};
	function _initSessionsTime() {
		var _initHeartSessionTime = settingsBackground.getHeartSessionTime() * A_MINUTE;
		var _initEyesSessionTime = settingsBackground.getEyesSessionTime() * A_MINUTE;
		var _defaultHeartSessionTime = DEFAULTS.HEART_SESSION_TIME * A_MINUTE;
		var _defaultEyesSessionTime = DEFAULTS.EYES_SESSION_TIME * A_MINUTE;
		if (isNaN(_initHeartSessionTime)) {
			_initHeartSessionTime = _defaultHeartSessionTime;
		}
		if (isNaN(_initEyesSessionTime)) {
			_initEyesSessionTime = _defaultEyesSessionTime;
		}

		values = {
			"heart": _tracker(_initHeartSessionTime, 5 * A_MINUTE, MODE.PLAY, _initHeartSessionTime),
			"eye": _tracker(_initEyesSessionTime, 20 * A_SECOND, MODE.PLAY, _initEyesSessionTime)
		};
	}

	function init() {
		_initSessionsTime();
		initializeHeartCountdown();
		initializeEyesCountdown();
    	// for (var id in values) {
	    //   	chrome.extension.onConnect.addListener(function(port) {
	    //     	port.onMessage.addListener(function(id) {
	    //     		port.postMessage(values[id].time.format());
		//   		});
	    // 	});
    	// }
	};

	function initializeHeartCountdown() {
		if (settingsBackground.isHeartBreakEnabled()) {
			_countdown(ID.HEART, setBadgeText);
		}
	}

	function initializeEyesCountdown() {
		if (settingsBackground.isEyesBreakEnabled()) {
			_countdown(ID.EYE, console.log);
		}
	}

	function heartSessionTimeChanged(time) {
		if (settingsBackground.isHeartBreakEnabled()) {
			time = parseFloat(time);
			if (isNaN(time)) {
				return;
			}
			var id = ID.HEART;
			var mode = values[id].mode;
			var playTime = time * A_MINUTE;
			var pauseTime = 5 * A_MINUTE;
			if (mode === MODE.PLAY) {
				values[id] =  _tracker(playTime, pauseTime, mode, playTime);
			} else {
				values[id] =  _tracker(playTime, pauseTime, mode, values[id].time.count);
			}
		}
	}

	function eyesSessionTimeChanged(time) {
		if (settingsBackground.isEyesBreakEnabled()) {
			time = parseFloat(time);
			if (isNaN(time)) {
				return;
			}
			var id = ID.EYE;
			var mode = values[id].mode;
			var playTime = time * A_MINUTE;
			var pauseTime = 20 * A_SECOND;
			if (mode === MODE.PLAY) {
				values[id] =  _tracker(playTime, pauseTime, mode, playTime);
			} else {
				values[id] =  _tracker(playTime, pauseTime, mode, values[id].time.count);
			}
		}
	}

	function _countdown(id, display) {
		var time = 100*A_MILLISECOND;
		if ((id === ID.HEART && settingsBackground.isHeartBreakEnabled()) ||
			(id === ID.EYE && settingsBackground.isEyesBreakEnabled())) {
			setTimeout(_countdown, time, id, display);
		} else {
			values[id].time.set([values[id].play]);
			if (id === ID.HEART) {
				chrome.browserAction.setIcon(ICON.PLAY); // TODO: Show a new icon when feature is disabled
				display('');
			}
			return;
		}

		values[id].time.minus(time);
		var timeDisplayed = Math.ceil(values[id].time.minutes).toString();
		display(timeDisplayed);

		if (values[id].time.count === 0) {
			if (values[id].mode === MODE.PLAY) {
				notification.send(id);
			}
			if (id === ID.HEART) {
				chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.WARNING});
			} else if (id === ID.IS_EYE) {
				if (values[id].mode === MODE.PLAY) {
					values[id].mode = MODE.PAUSE;
				} else {
					values[id].mode = MODE.PLAY
				}
				values[id].time.set(values[id][values[id].mode]);
			}
		}
	};

	function _tracker(play, pausing, mode, time) {
    	return {
      		"pause": pausing,
	  		"play": play,
			mode: mode,
			time: new Time(time)
		};
	};

	function switchMode() {
		if (!settingsBackground.isHeartBreakEnabled()) {
			return;
		}
		var id = ID.HEART; //event.data.id;

		if (values[id].mode === MODE.PLAY) {
			values[id].mode = MODE.PAUSE;
			chrome.browserAction.setIcon(ICON.PAUSE);
		} else {
			values[id].mode = MODE.PLAY;
			chrome.browserAction.setIcon(ICON.PLAY);
		}
		chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.DEFAULT});

		values[id].time.set(values[id][values[id].mode]);

		if (values[ID.EYE].time.count > values[ID.HEART].time.count
			&& values[ID.HEART].time.mode === MODE.PLAY
			&& values[ID.EYE].time.mode === MODE.PLAY) {
			values[ID.EYE].time.count = values[ID.HEART].time.count;
		}
	};

	return {
		init: init
		,switchMode: switchMode
		,initializeEyesCountdown: initializeEyesCountdown
		,initializeHeartCountdown: initializeHeartCountdown
		,heartSessionTimeChanged: heartSessionTimeChanged
		,eyesSessionTimeChanged: eyesSessionTimeChanged
	};
})(chrome, TIME, ID, MODE, COLOR, ICON);
