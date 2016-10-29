//can these constants be retrieve from the background?
const ID = {
	HEART: 'heart',
	EYE: 'eye',
	REDSHIFT: 'redshift'
};

var settings = (function(document, window, chrome, ID) {
    'use strict';

	const MANUAL = "manual";
    var _timeout;
    var _settings = {};
	var _port = {
		"settings":  chrome.extension.connect({ name: "settings" })
		,"heart":    chrome.extension.connect({ name: ID.HEART 		 })
		,"eyes": 	 chrome.extension.connect({ name: ID.EYE		 })
		,"redShift": chrome.extension.connect({ name: ID.REDSHIFT	 })
	}

    function init() {
        _restoreOptions(_updateUI);

        _addOptionChangedListener();
		var activeContent = $(".nav").find(".active").text();
        _showContent(activeContent);

        _createMenuHandler();
		_createHideNotificationHandler();
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

    function _saveOptions() {
        _settings = {
            heart: 					$('#heart').is(':checked')
            ,standupNotifEnable: 	$('#standupNotifEnable').is(':checked')
            //,standupTextMsgEnable:$('#standupTextMsgEnable').is(':checked')
            ,standupSessionTime: 	$('#standupSessionTime').val()
            ,eyes: 					$('#eyes').is(':checked')
            ,eyesNotifEnable:		$('#eyesNotifEnable').is(':checked')
            //,eyesTextMsgEnable: 	$('#eyesTextMsgEnable').is(':checked')
            ,eyesSessionTime: 		$('#eyesSessionTime').val()
            ,redShift: 				$('#redShift').is(':checked')
        };

        chrome.storage.sync.set({
            'settings': _settings
        }, _updateUIEnabling());
    }

	function _createSettingsChangeHandlers() {
	        $('#restoreSettings').on('click', _restoreDefaultOptions);

			var settings = ["heart", "eyes", "redShift"];
			settings.map(setting => {
				$('#' + setting).change(function() {
					_saveOptions();
			        if (this.checked) {
						_port[setting].postMessage();
					}
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
		_port["settings"].postMessage();

		$('#standupNotifEnable').attr("disabled", !_settings.heart);
		// $('#standupTextMsgEnable').attr("disabled", !isChecked);
		$('#standupSessionTime').attr("disabled", !_settings.heart);

		$('#eyesNotifEnable').attr("disabled", !_settings.eyes);
		// $('#eyesTextMsgEnable').attr("disabled", !isChecked);
		$('#eyesSessionTime').attr("disabled", !_settings.eyes);
	}

	function _updateUICheckboxes() {
		$("#heart").prop('checked', _settings.heart);
		$("#standupNotifEnable").prop('checked', _settings.standupNotifEnable);
		// $("#standupTextMsgEnable").prop('checked', _settings.standupTextMsgEnable);
		$("#standupSessionTime").val(_settings.standupSessionTime);

		$("#eyes").prop('checked', _settings.eyes);
		$("#eyesNotifEnable").prop('checked', _settings.eyesNotifEnable);
		// $("#eyesTextMsgEnable").prop('checked', _settings.eyesTextMsgEnable);
		$("#eyesSessionTime").val(_settings.eyesSessionTime);

		$("#redShift").prop('checked', _settings.redShift);
		//items.settings.setRedShiftAutonomy();
	}

    function _restoreDefaultOptions() {
		var settings = [
			'heart'
			,'standupNotifEnable'
			,'standupTextMsgEnable'
	        ,'eyes'
	        ,'eyesNotifEnable'
	        ,'eyesTextMsgEnable'
	        ,'redShift'
		];

		settings.map((setting) => {
        	$('#' + setting).prop('checked', true);
		});

        $('#standupSessionTime').val(55);
        $('#eyesSessionTime').val(20);
        _saveOptions();
    }

    function _addOptionChangedListener() {
		var settings = [
	        ,'heart'
	        ,'standupNotifEnable'
	        ,'standupTextMsgEnable'
	        ,'standupSessionTime'
	        ,'eyes'
	        ,'eyesNotifEnable'
	        ,'eyesTextMsgEnable'
	        ,'eyesSessionTime'
	        ,'redShift'
		];
		settings.map((setting) => {
			$('#' + setting).change(_saveOptions);
		});

    }






	function _alert(type) {
		if (_timeout){
			clearTimeout(_timeout);
		}
		$(".alert-"+type).fadeIn();
		_timeout = setTimeout(function() {
			$(".alert-"+type).fadeOut();
		}, 5000);
	};

	//TODO: move general options functions to another file
    function _createMenuHandler() {
        $(document).on('click','.navbar-collapse',function(e) {
            if($(e.target).is('a') ) {
                $(this).collapse('hide');
            }
        });
        $(".nav a").on("click", function() {
            $(".nav").find(".active").removeClass("active");
            $(this).parent().addClass("active");
            $("#title").text($(this).text());
            _showActiveContent($(this).text());
        });
    }

	function _createHideNotificationHandler() {
        $("[data-hide]").on("click", function(){
            $(this).closest("." + $(this).attr("data-hide")).fadeOut();
        });
	}

    function _showContent(activeTab) {
        $(".alert-success").hide();
        activeTab = activeTab.toLowerCase();
        var tabsId = ["options", "data", "documentation", "support"];
        var index = tabsId.indexOf(activeTab);
        if (index !== -1) {
            tabsId.splice(index, 1);
        }
        $("#" + activeTab).show();
        tabsId.map(tab => $("#" + tab).hide())
    };

    return {
        init: init
    };
})(document, window, chrome, ID);

$( document ).ready(settings.init);
