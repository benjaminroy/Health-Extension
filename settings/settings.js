var settings = (function(document, window, chrome, ID, DEFAULTS) {
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
		"heart":      chrome.extension.connect({ name: ID.HEART 		})
		,"eyes": 	  chrome.extension.connect({ name: ID.EYE		 	})
		,"redShift":  chrome.extension.connect({ name: ID.REDSHIFT	 	})
		,"heartTime": chrome.extension.connect({ name: ID.HEART_TIME	})
		,"eyesTime":  chrome.extension.connect({ name: ID.EYES_TIME	 	})
	}

    function init() {
        _loadOptions(_updateUI);
		_createSettingsChangeHandlers();
    }

    function _loadOptions(callback) {
        chrome.storage.sync.get('settings', function(items) {
			_settings = items.settings;
			callback();
        });
    }

    function _saveOptions(setting) {
		// if(setting.currentTarget) {
		//  	setting = setting.currentTarget.id;
		// }

		var element = $('#' + setting);
		if (parseInt(element.val())) {
			_settings[setting] = parseInt(element.val());
		} else {
			_settings[setting] = element.is(':checked');
		}

        chrome.storage.sync.set({
            'settings': _settings
        }, function() {
			_updateUIEnabling();
			if(_port[setting]) {
				_port[setting].postMessage();
			}
			alert.send("success");
		});
	}

	function _createSettingsChangeHandlers() {
	        $('#restoreSettings').on('click', _restoreDefaultOptions);

			var settings = _checkboxesID.concat([ID.HEART_TIME, ID.EYES_TIME]);
			settings.map((setting) => {
				$('#' + setting).change(function(r) {
					_saveOptions(setting);
				});
			});

			$("input[name='setRedShiftAutonomy']").change(_saveOptions);
	}

    // function _enableRedShift() {
	// 	$("input[name='setRedShiftAutonomy']").attr("disabled", !this.checked);
	// 	if (!this.checked) $("#time-range").attr("hidden", true);
	//
    //     if($("name[setRedShiftAutonomy]").is(':checked')) $("#time-range").attr("hidden", !isManual);
    //     if (this.checked) _port["redShift"].postMessage(_settings);
    // }
	//
	// function _enableManuallySelectRedShift() {
	// 	var isManual = this.value === MANUAL;
    //     $("#time-range").attr("hidden", !isManual);
	// }

	function _updateUI() {
		_updateUIEnabling();
		_updateUICheckboxes();
	}

	function _updateUIEnabling() {
		$('#standupNotifEnable').attr("disabled", !_settings.heart);
		$('#' + ID.HEART_TIME).attr("disabled", !_settings.heart);

		$('#eyesNotifEnable').attr("disabled", !_settings.eyes);
		$('#' + ID.EYE_TIME).attr("disabled", !_settings.eyes);

		$('#automaticallySetRedShift').attr("disabled", !_settings.redShift);
	}

	function _updateUICheckboxes() {
		$("#heart").prop('checked', _settings.heart);
		$("#standupNotifEnable").prop('checked', _settings.standupNotifEnable);
		$('#' + ID.HEART_TIME).val(_settings.heartTime);

		$("#eyes").prop('checked', _settings.eyes);
		$("#eyesNotifEnable").prop('checked', _settings.eyesNotifEnable);
		$('#' + ID.EYES_TIME).val(_settings.eyesNotifEnable);

		$("#redShift").prop('checked', _settings.redShift);
		//items.settings.setRedShiftAutonomy();
	}

    function _restoreDefaultOptions() {
		_settings = DEFAULTS.SETTINGS;
        chrome.storage.sync.set({
            'settings': _settings
        }, _updateUI());
    }

    return {
        init: init
    };

})(document, window, chrome, ID, DEFAULTS);

$( document ).ready(settings.init);
