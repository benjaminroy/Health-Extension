var redshiftContent = (function (document, window, chrome, $, EVENTS) {
	"use strict";

	var REDSHIFT_CLASS_NAME = 'health-extension-redshift';
	var _pageRedshifted;

	function init() {
		_pageRedshifted = false;

		_initializeRedshift();
		_addSunsetAndSunriseListener();
	}

	function _initializeRedshift() {
		var requestMessage = {
			type: EVENTS.IS_NIGHT
		};

		chrome.runtime.sendMessage(requestMessage, function (responseMessage) {
			if (responseMessage.isNight) {
				_addReshiftToPage();
			} else {
				_removeRedshitfFromPage();
			}
		});
	}

	function _addSunsetAndSunriseListener() {
		chrome.runtime.onMessage.addListener(function (requestMessage, sender, sendResponse) {
			if (requestMessage.type === EVENTS.SUNRISE) {
				_removeRedshitfFromPage();
			} else if (requestMessage.type === EVENTS.SUNSET) {
				_addReshiftToPage();
			}
		});
	}

	function _addReshiftToPage() {
		if (_pageRedshifted) {
			return;
		}

		$('body').append('<div class="' + REDSHIFT_CLASS_NAME + '"></div>');
		_pageRedshifted = true;
	}

	function _removeRedshitfFromPage() {
		if (!_pageRedshifted) {
			return;
		}

		$('.' + REDSHIFT_CLASS_NAME).remove();
		_pageRedshifted = false;
	}

	return {
		init: init
	};
})(document, window, chrome, jQuery, EVENTS);

redshiftContent.init();
