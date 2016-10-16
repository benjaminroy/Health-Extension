var popup = (function (window, document, chrome) {
	"use strict";

	function init() {
    var background = chrome.extension.getBackgroundPage();
    var trackers = background.trackers.getValues();

    $('#settings').on('click', _openSettings);

    for (var id in trackers) {
      _createTimerElement(id);
      var port = _newPort(id);
      _askTime(port);
    }
	}

  function _newPort(id) {
    var port = chrome.extension.connect({name: id});
    port.onMessage.addListener(_displayForIdFunction(id));
    return port;
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
    tracker.content.querySelectorAll(".type")[0].setAttribute("id", id);
    tracker.content.getElementById("symbol").className = "fa fa-" + id;
    var clone = document.importNode(tracker.content, true);
    trackers.appendChild(clone);
  };

  function _displayForIdFunction(id) {
    return function(time) {
      var element = $("#" + id + ">.timer");
      element.html(time);
    };
  };

  function _askTime(port) {
    port.postMessage(port.name);
    setTimeout(_askTime, 1000, port);
  };

  function _formatTime(time) {
		
  };

	return {
		init: init
	};
})(window, document, chrome);

popup.init();
