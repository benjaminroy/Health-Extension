var trackers = (function (chrome, TIME, ID, MODE, COLOR, ICON) {
	"use strict";

	chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.IS_DEFAULT});

 	var values = {
    	"heart": _tracker(AN_HOUR, 5*A_MINUTE),
		"eye": _tracker(20*A_MINUTE, 20*A_SECOND)
	};

	function init() {
		_countdown(ID.IS_HEART, setBadgeText);
		_countdown(ID.IS_EYE, console.log);
    	// for (var id in values) {
	    //   	chrome.extension.onConnect.addListener(function(port) {
	    //     	port.onMessage.addListener(function(id) {
	    //     		port.postMessage(values[id].time.format());
		//   		});
	    // 	});
    	// }
	};

	function _countdown(id, display) {
		var time = 100*A_MILLISECOND;
		setTimeout(_countdown, time, id, display);

		values[id].time.minus(time);

		if(values[id].time.count === 0) {
			if(values[id].mode === MODE.IS_PLAY) {
				sendNotification(id);
			} else if (id === ID.IS_HEART) {
				sendNotification(id); //TODO: add a notification specific to when the break is over
			}
			chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.IS_WARNING});
		}

		var timeDisplayed = Math.ceil(values[id].time.minutes).toString();
		display(timeDisplayed);
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
		var id = ID.IS_HEART; //event.data.id;

		if(values[id].mode === MODE.IS_PLAY) {
			values[id].mode = MODE.IS_PAUSE;
			chrome.browserAction.setIcon(ICON.PAUSE);
		} else {
			values[id].mode = MODE.IS_PLAY;
			chrome.browserAction.setIcon(ICON.PLAY);
		}
		chrome.browserAction.setBadgeBackgroundColor({"color": COLOR.IS_DEFAULT});

		values[id].time.set(values[id][values[id].mode]);

		if(values[ID.IS_EYE].time.count > values[ID.IS_HEART].time.count
			&& values[ID.IS_HEART].time.mode === MODE.IS_PLAY
			&& values[ID.IS_EYE].time.mode === MODE.IS_PLAY) {
			values[ID.IS_EYE].time.count = values[ID.IS_HEART].time.count;
		}
	};

	return {
		init: init
		,switchMode: switchMode
	};
})(chrome, TIME, ID, MODE, COLOR, ICON);
