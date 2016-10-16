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

// Function by Mickael Lambert, 13 years old (helped by Mathieu Roy)
  function _formatTime(time) {
		var hours = time.hours;
		var min = time.minutes;
		var sec = time.seconds;

		  var ans;

		  if(hours<=9){
		    ans="0";
		  }
		  else if (hours>=9)
		    {
		      ans="";
		    }
		  ans=ans+hours;
		  ans=ans+":";

		  if(min<=9){
		    ans=ans+"0";
		  }
		  else if (min>=9)
		    {
		      ans=ans+"";
		    }
		  ans=ans+min;

		  ans=ans+":";

		  if(sec<=9){
		    ans=ans+"0";
		  }
		  else if (sec>=9)
		    {
		      ans=ans+"";
		    }

		  ans=ans+sec;

		  return ans;
  };

  var getValues = function() {
    return values;
  };

	return {
		init: init,
    getValues: getValues
	};
})(chrome, TIME);
