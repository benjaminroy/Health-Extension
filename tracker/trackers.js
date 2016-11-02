var trackers = (function (chrome, TIME, ID, MODE, COLOR, ICON, DEFAULTS) {
	"use strict";

	chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.DEFAULT});

	var values = {};
	function _initSessionsTime() {
		var initHeartBreakTime = DEFAULTS.HEART_BREAK_TIME * A_MINUTE;
		var initEyesBreakTime = DEFAULTS.EYES_BREAK_TIME * A_SECOND;
		var initHeartSessionTime = settingsBackground.getHeartSessionTime() * A_MINUTE + initHeartBreakTime;
		var initEyesSessionTime = settingsBackground.getEyesSessionTime() * A_MINUTE + initEyesBreakTime;
		if (isNaN(initHeartSessionTime)) {
			// Should be modified to never happen:
			initHeartSessionTime = DEFAULTS.HEART_SESSION_TIME * A_MINUTE;
		}
		if (isNaN(initEyesSessionTime)) {
			// Should be modified to never happen:
			initEyesSessionTime = DEFAULTS.EYES_SESSION_TIME * A_MINUTE;
		}
		values = {
			"heart": _tracker(initHeartSessionTime, initHeartBreakTime),
			"eyes": _tracker(initEyesSessionTime, initEyesBreakTime)
		};
	}

	function init() {
		_initSessionsTime();
		initializeHeartCountdown();
		initializeEyesCountdown();
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
		if (!settingsBackground.isHeartBreakEnabled()) {
			return;
		}

		time = parseFloat(time);
		if (isNaN(time)) {
			return;
		}

		values[ID.HEART][MODE.PLAY] = time * A_MINUTE;
		if (values[ID.HEART].mode === MODE.PLAY) {
			values[ID.HEART].time.set(values[ID.HEART][MODE.PLAY]);
		}
	}

	function eyesSessionTimeChanged(time) {
		if (!settingsBackground.isEyesBreakEnabled()) {
			return;
		}
		time = parseFloat(time);
		if (isNaN(time)) {
			return;
		}
		values[ID.EYE][MODE.PLAY] = time * A_MINUTE;
		if (values[ID.EYE].mode === MODE.PLAY) {
			values[ID.EYE].time.set(values[ID.EYE][MODE.PLAY]);
		}
	}

	function _countdown(id, display) {
		var time = 100 * A_MILLISECOND;
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
		var timeDisplayed
		if(values[id].time.count > 0) {
			timeDisplayed = (values[id].time.minutes + 1).toString();
		} else {
			timeDisplayed = (values[id].time.minutes).toString();
		}
		display(timeDisplayed);

		if (values[id].time.count === 0) {
			if (values[id].mode === MODE.PLAY) {
				notification.send(id);
			}
			if (id === ID.HEART) {
				chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.WARNING});
			} else if (id === ID.EYE) {
				if (values[id].mode === MODE.PLAY) {
					values[id].mode = MODE.PAUSE;
				} else {
					values[id].mode = MODE.PLAY
				}
				values[id].time.set(values[id][values[id].mode]);
			}
		}
	};

	function _tracker(total, pausing) {
    	return {
      		"pause": pausing,
	  		"play": total - pausing,
			mode: MODE.PLAY,
			time: new Time(total - pausing)
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
})(chrome, TIME, ID, MODE, COLOR, ICON, DEFAULTS);
