var redshiftContent = (function (document, window, chrome, $, EVENTS) {
	"use strict";

	var REDSHIFT_CLASS_NAME = 'health-extension-redshift';
	var REDSHIFT_LAYER = $(document.createElement('span')).addClass(REDSHIFT_CLASS_NAME)
	var _pageIsRedshifted;

	function init() {
		_initializeRedshift();
		_addRedShiftListener();
	}

	function _initializeRedshift() {
		_pageIsRedshifted = false;
		var requestMessage = {
			type: EVENTS.IS_REDSHIFT
		};
		chrome.runtime.sendMessage(requestMessage, _processMessage);
	}

	function _addRedShiftListener() {
		chrome.runtime.onMessage.addListener(_processMessage);
	}

	function _processMessage(message, sender = null, sendResponse = null) {
		message.isRedShift ? _addReshiftToPage() : _removeRedshitfFromPage();
	}

	function _addReshiftToPage() {
		if (_pageIsRedshifted) return;
		$('html').append(REDSHIFT_LAYER);
		_pageRedshifted = true;
	}

	function _removeRedshitfFromPage() {
		if (!_pageIsRedshifted) return;
		$('.' + REDSHIFT_CLASS_NAME).remove();
		_pageIsRedshifted = false;
	}

	return {
		init: init
	};
})(document, window, chrome, jQuery, EVENTS);

redshiftContent.init();
