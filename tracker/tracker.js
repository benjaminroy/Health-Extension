var trackers = (function (chrome, TIME, TRACKER) {
	"use strict";

 	var values = {
    	"heart": _tracker(AN_HOUR, 5*A_MINUTE),
		"eye": _tracker(20*A_MINUTE, 20*A_SECOND)
	};

	function init() {
		_countdown("heart", setBadgeText);
		_countdown("eye", console.log);
    	for (var id in values) {
	      	chrome.extension.onConnect.addListener(function(port) {
	        	port.onMessage.addListener(function(id) {
	        		port.postMessage(values[id].time.format());
		  		});
	    	});
    	}
	};

	function _countdown(id, display) {
		values[id].time.minus(A_SECOND);

		if(values[id].time.count === 0) {
			if(values[id].mode === "play") {
				sendNotification(id);
			}
		}

		var timeDisplayed = Math.ceil(values[id].time.minutes).toString();
		display(timeDisplayed);
		setTimeout(_countdown, A_SECOND, id, display);
	};

	function _tracker(total, pausing) {
    	return {
      		"pause": pausing,
	  		"play": total - pausing,
			mode: "play",
			time: new Time(total - pausing)
		};
	};

	var switchMode = function(event) {
		var id = event.data.id;
		values[id].mode = (values[id].mode === "play" ? "pause" : "play");
		values[id].time.set(values[id][values[id].mode]);

		if(values["eye"].time.count > values["heart"].time.count
			&& values["heart"].time.mode === "play"
			&& values["eye"].time.mode === "play") {
			values["eye"].time.count = values["heart"].time.count;
		}
	};

	var getValues = function() {
		return values;
 	};

	return {
		init: init,
		switchMode: switchMode,
    	getValues: getValues
	};
})(chrome, TIME, TRACKER);
