var trackers = (function (chrome, TIME, ID, MODE, COLOR, ICON) {
	"use strict";

	chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.DEFAULT});

 	var values = {
    	"heart": _tracker(AN_HOUR, 5*A_MINUTE),
		"eye": _tracker(20*A_MINUTE, 20*A_SECOND)
	};

	function init() {
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
	};
})(chrome, TIME, ID, MODE, COLOR, ICON);
