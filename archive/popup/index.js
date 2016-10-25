var popup = (function (window, document, chrome) {
	"use strict";

	var ports = {};
	var background,
		trackers;

	function init() {
	    background = chrome.extension.getBackgroundPage();
	    trackers = background.trackers.getValues();

	    for (var id in trackers) {
			  _newPort(id);
		      _createTimerElement(id);
		      _askTime(id);
	    }

		$('#settings').on('click', _openSettings);
	}

 	function _newPort(id) {
		ports[id] = chrome.extension.connect({name: id});
		ports[id].onMessage.addListener(_displayForIdFunction(id));
 	}

	function _openSettings() {
    	if (chrome.runtime.openOptionsPage) {
        	chrome.runtime.openOptionsPage(); //Chrome 42+
     	} else {
        	window.open(chrome.runtime.getURL('settings/settings.html')); // Reasonable fallback.
		}
	}

	function _createTimerElement(id) {
		var trackers = document.querySelector("#trackers");
	    var tracker = document.querySelector("#tracker");
	    tracker.content.querySelectorAll(".row")[0].setAttribute("id", id);
	    var clone = document.importNode(tracker.content, true);
	    trackers.appendChild(clone);

	    $("#" + id + " .symbol").addClass("fa fa-" + id);
	    $("#" + id + " .switch").click({id: id}, background.trackers.switchMode);
	};

 	function _displayForIdFunction(id) {
    	return function(time) {
      		var element = $("#" + id + " .timer");
	      	element.html(time);
	    };
	};

	function _askTime(id) {
    	ports[id].postMessage(ports[id].name);
    	setTimeout(_askTime, 50, id);
	};

	return {
		init: init
	};
})(window, document, chrome);

popup.init();
