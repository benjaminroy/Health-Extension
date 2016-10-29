//can these constants be retrieve from the background?
const ID = {
	HEART: "heart"
	,EYE: "eyes"
	,REDSHIFT: "redShift"
	,HEART_TIME: 'heartTime'
	,EYES_TIME: 'eyesTime'
};

var settings = (function(document, window, chrome, ID) {
    'use strict';

	const MANUAL = "manual";
    var _timeout;
    var _settings = {};
	var _checkboxesID = [
		'heart'
		,'standupNotifEnable'
		,'eyes'
		,'eyesNotifEnable'
		,'redShift'
	];
	var _port = {
		"heart":    chrome.extension.connect({ name: ID.HEART 		 })
		,"eyes": 	 chrome.extension.connect({ name: ID.EYE		 })
		,"redShift": chrome.extension.connect({ name: ID.REDSHIFT	 })
		,"heartTime": chrome.extension.connect({ name: ID.HEART_TIME	 })
		,"eyesTime":chrome.extension.connect({ name: ID.EYES_TIME	 })
	}

    function init() {
        _restoreOptions(_updateUI);
        _addOptionChangedListener();
		_createSettingsChangeHandlers();
    }

    function _restoreOptions(callback) {
        chrome.storage.sync.get('settings', function(items) {
			// if(items.settings === undefined) {
			// 	settingsBackground.firstTime();
			// }
			_settings = items.settings;
			callback();
        });
    }

    function _saveOptions(setting) {
        // _settings = {
        //     heart: 					$('#heart').is(':checked')
        //     ,standupNotifEnable: 	$('#standupNotifEnable').is(':checked')
        //     ,heartTime: 			$('#heartTime').val()
        //     ,eyes: 					$('#eyes').is(':checked')
        //     ,eyesNotifEnable:		$('#eyesNotifEnable').is(':checked')
        //     ,eyesTime: 				$('#eyesTime').val()
        //     ,redShift: 				$('#redShift').is(':checked')
        // };

		var element = $('#' + setting);
		if (element.val() !== "") {
			_settings[setting] = element.val();
			console.log(element.val());
		} else {
			_settings[setting] = element.is(':checked');
			console.log(element.is(':checked'));
		}

        chrome.storage.sync.set({
            'settings': _settings
        }, _updateUIEnabling());
	}

	function _createSettingsChangeHandlers() {
	        $('#restoreSettings').on('click', _restoreDefaultOptions);

			//ID.HEART, ID.EYE, ID.REDSHIFT
			var settings = _checkboxesID.concat([ID.HEART_TIME, ID.EYES_TIME]);
			settings.map((setting) => {
				$('#' + setting).change(function() {
					_saveOptions(setting);
			        if(_port[setting]) {
						_port[setting].postMessage();
					}
					_alert("success");
				});
			});

			$("input[name='setRedShiftAutonomy']").change(_saveOptions);
	        //$('#timeRange').change(null);
	}

    function _enableRedShift() {
		$("input[name='setRedShiftAutonomy']").attr("disabled", !this.checked);
		if (!this.checked) $("#time-range").attr("hidden", true);

        if($("name[setRedShiftAutonomy]").is(':checked')) $("#time-range").attr("hidden", !isManual);
        if (this.checked) _port["redShift"].postMessage(_settings);
    }

	function _enableManuallySelectRedShift() {
		var isManual = this.value === MANUAL;
        $("#time-range").attr("hidden", !isManual);
	}

	function _updateUI() {
		_updateUIEnabling();
		_updateUICheckboxes();
	}

	function _updateUIEnabling() {
		$('#standupNotifEnable').attr("disabled", !_settings.heart);
		// $('#standupTextMsgEnable').attr("disabled", !isChecked);
		$('#' + ID.HEART_TIME).attr("disabled", !_settings.heart);

		$('#eyesNotifEnable').attr("disabled", !_settings.eyes);
		// $('#eyesTextMsgEnable').attr("disabled", !isChecked);
		$('#' + ID.EYE_TIME).attr("disabled", !_settings.eyes);
	}

	function _updateUICheckboxes() {
		$("#heart").prop('checked', _settings.heart);
		$("#standupNotifEnable").prop('checked', _settings.standupNotifEnable);
		// $("#standupTextMsgEnable").prop('checked', _settings.standupTextMsgEnable);
		$('#' + ID.HEART_TIME).val(_settings.standupSessionTime);

		$("#eyes").prop('checked', _settings.eyes);
		$("#eyesNotifEnable").prop('checked', _settings.eyesNotifEnable);
		// $("#eyesTextMsgEnable").prop('checked', _settings.eyesTextMsgEnable);
		$('#' + ID.EYES_TIME).val(_settings.eyesSessionTime);

		$("#redShift").prop('checked', _settings.redShift);
		//items.settings.setRedShiftAutonomy();
	}

    function _restoreDefaultOptions() {
		_checkboxesID.map((setting) => {
        	$('#' + setting).prop('checked', true);
		});

        $('#' + ID.HEART_TIME).val(55);
        $('#' + ID.EYES_TIME).val(20);
        _saveOptions();
		_heartSessionTimeChanged();
		_eyesSessionTimeChanged();
    }

    function _addOptionChangedListener() {
		var settings = _checkboxesID.concat(['standupSessionTime', 'eyesSessionTime']);
		settings.map((setting) => {
			$('#' + setting).change(_saveOptions);
		});

    }

	//TODO: move to options.js ?
	function _alert(type) {
		if (_timeout){
			clearTimeout(_timeout);
		}
		$(".alert-"+type).fadeIn();
		_timeout = setTimeout(function() {
			$(".alert-"+type).fadeOut();
		}, 5000);
	};

    return {
        init: init
    };
})(document, window, chrome, ID);

$( document ).ready(settings.init);
