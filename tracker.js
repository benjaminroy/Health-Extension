var trackers = (function (chrome, TIME) {
	"use strict";

	var REFRESH_INTERVAL = 1000;

  var values = {
    "heart": _tracker(AN_HOUR, 5*A_MINUTE),
    "eye": _tracker(20*A_MINUTE, 20*A_SECOND),
  };

	function init() {
    for (var id in values) {
      values[id].time = new Time(values[id].playing);
      values[id].time.countdown(setBadgeText);//

      chrome.extension.onConnect.addListener(function(port) {
        port.onMessage.addListener(function(id) {
          port.postMessage(_formatTime(values[id].time));
        });
      });
    }
	}

  function _tracker(total, pausing) {
    return {
      pausing: pausing,
      playing: total - pausing
    };
  };

  function _formatTime(time) {
		var sign = Math.sign(time.count) === -1 ? "-" : "";
		var time = pad0(Math.abs(time.minutes)) + ":" + pad0(Math.abs(time.seconds));
		if (time.hours > 0) time = time.hours + ":" + time;
		return time;
  };

  var getValues = function() {
    return values;
  };

	return {
		init: init,
    getValues: getValues
	};
})(chrome, TIME);
