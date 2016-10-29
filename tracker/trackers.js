var trackers = (function (chrome, TIME, ID, MODE, COLOR, ICON) {
	"use strict";

	chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.IS_DEFAULT});

 	var values = {
    	"heart": _tracker(AN_HOUR, 5*A_MINUTE),
		"eye": _tracker(20*A_MINUTE, 20*A_SECOND)
	};

	function init() {
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
			_countdown(ID.IS_HEART, setBadgeText);
		}
	}

	function initializeEyesCountdown() {
		if (settingsBackground.isEyesBreakEnabled()) {
			_countdown(ID.IS_EYE, console.log);
		}
	}

	function _countdown(id, display) {
		var time = 100*A_MILLISECOND;
		if ((id === ID.IS_HEART && settingsBackground.isHeartBreakEnabled()) ||
			(id === ID.IS_EYE && settingsBackground.isEyesBreakEnabled())) {
			setTimeout(_countdown, time, id, display);
		} else {
			values[id].time.set([values[id].play]);
			if (id === ID.IS_HEART) {
				chrome.browserAction.setIcon(ICON.PLAY); // TODO: Show a new icon when feature is disabled
				display('');
			}
			return;
		}

		values[id].time.minus(time);
		var timeDisplayed = Math.ceil(values[id].time.minutes).toString();
		display(timeDisplayed);

		if (values[id].time.count === 0) {
			if (values[id].mode === MODE.IS_PLAY) {
				notification.send(id);
			}
			if (id === ID.IS_HEART) {
				chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.IS_WARNING});
			} else if (id === ID.IS_EYE) {
				if (values[id].mode === MODE.IS_PLAY) {
					values[id].mode = MODE.IS_PAUSE;
				} else {
					values[id].mode = MODE.IS_PLAY
				}
				values[id].time.set(values[id][values[id].mode]);
			}
		}
	};

	function _tracker(total, pausing) {
    	return {
      		"pause": pausing,
	  		"play": total - pausing,
			mode: MODE.IS_PLAY,
			time: new Time(total - pausing)
		};
	};

	function switchMode() {
		if (!settingsBackground.isHeartBreakEnabled()) {
			return;
		}
		var id = ID.IS_HEART; //event.data.id;

		if (values[id].mode === MODE.IS_PLAY) {
			values[id].mode = MODE.IS_PAUSE;
			chrome.browserAction.setIcon(ICON.PAUSE);
		} else {
			values[id].mode = MODE.IS_PLAY;
			chrome.browserAction.setIcon(ICON.PLAY);
		}
		chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.IS_DEFAULT});

		values[id].time.set(values[id][values[id].mode]);

		if (values[ID.IS_EYE].time.count > values[ID.IS_HEART].time.count
			&& values[ID.IS_HEART].time.mode === MODE.IS_PLAY
			&& values[ID.IS_EYE].time.mode === MODE.IS_PLAY) {
			values[ID.IS_EYE].time.count = values[ID.IS_HEART].time.count;
		}
	};

	return {
		init: init
		,switchMode: switchMode
		,initializeEyesCountdown: initializeEyesCountdown
		,initializeHeartCountdown: initializeHeartCountdown
	};
})(chrome, TIME, ID, MODE, COLOR, ICON);
