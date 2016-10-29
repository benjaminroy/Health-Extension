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
    var _settingsPort = chrome.extension.connect({
         name: "settingsPort"
    });
    var _heartPort = chrome.extension.connect({
         name: ID.HEART
    });
    var _eyesPort = chrome.extension.connect({
         name: ID.EYE
    });
    var _redShiftPort = chrome.extension.connect({
         name: ID.REDSHIFT
    });

    function init() {
        _restoreOptions();
        _addOptionChangedListener();
        _showActiveContent($(".nav").find(".active").text());
        _createGeneralHandlers();
		_createSettingsChangeHandlers();
    }

    function _createGeneralHandlers() {
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
        $("[data-hide]").on("click", function(){
            $(this).closest("." + $(this).attr("data-hide")).fadeOut();
        });
    }

	function _createSettingsChangeHandlers() {
	        $('#restoreSettings').on('click', _restoreSettings);
	        $('#standupBreakEnable').change(_enableHeartBreak);
	        $('#eyesBreakEnable').change(_enableEyesBreak);
	        $('#redShiftEnable').change(_enableRedShift);
	        $('#timeRange').change(null);
			$("input[name='setRedShiftAutonomy']").change(_enableManuallySelectRedShift);
	}

    function _enableHeartBreak() {
        $('#standupNotifEnable').attr("disabled", !this.checked);
        // $('#standupTextMsgEnable').attr("disabled", !isChecked);
        $('#standupSessionTime').attr("disabled", !this.checked);
        if (this.checked) _heartPort.postMessage(_settings);
    }

    function _enableEyesBreak() {
        $('#eyesNotifEnable').attr("disabled", !this.checked);
        // $('#eyesTextMsgEnable').attr("disabled", !isChecked);
        $('#eyesSessionTime').attr("disabled", !this.checked);
        if (this.checked) _eyesPort.postMessage(_settings);
    }

    function _enableRedShift() {
		$("input[name='setRedShiftAutonomy']").attr("disabled", !this.checked);
        if (this.checked) _redShiftPort.postMessage(_settings);
		if (!this.checked) $("#time-range").attr("hidden", true);
    }

	function _enableManuallySelectRedShift() {
		var isManual = this.value === MANUAL;
        $("#time-range").attr("hidden", !isManual);
	}

    function _showActiveContent(activeTab) {
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

    function _alert(type) {
        if (_timeout){
            clearTimeout(_timeout);
        }
        $(".alert-"+type).fadeIn();
        _timeout = setTimeout(function() {
            $(".alert-"+type).fadeOut();
        }, 5000);
    };

    function _saveOptions() {
        _settings = {
            eyesBreakEnable: $('#eyesBreakEnable').is(':checked'),
            eyesNotifEnable: $('#eyesNotifEnable').is(':checked'),
            eyesTextMsgEnable: $('#eyesTextMsgEnable').is(':checked'),
            eyesSessionTime: $('#eyesSessionTime').val(),
            standupBreakEnable: $('#standupBreakEnable').is(':checked'),
            standupNotifEnable: $('#standupNotifEnable').is(':checked'),
            standupTextMsgEnable: $('#standupTextMsgEnable').is(':checked'),
            standupSessionTime: $('#standupSessionTime').val(),
            redShiftEnable: $('#redShiftEnable').is(':checked')
        };
        _settingsPort.postMessage(_settings);
        chrome.storage.sync.set({
            'settings': _settings
        }, _alert("success"));
    }

    function _restoreOptions() {
        chrome.storage.sync.get('settings', function(items) {
            $("#eyesBreakEnable").prop('checked', items.settings.eyesBreakEnable);
            $("#eyesNotifEnable").prop('checked', items.settings.eyesNotifEnable);
            $("#eyesTextMsgEnable").prop('checked', items.settings.eyesTextMsgEnable);
            $("#eyesSessionTime").val(items.settings.eyesSessionTime);
            $("#standupBreakEnable").prop('checked', items.settings.standupBreakEnable);
            $("#standupNotifEnable").prop('checked', items.settings.standupNotifEnable);
            $("#standupTextMsgEnable").prop('checked', items.settings.standupTextMsgEnable);
            $("#standupSessionTime").val(items.settings.standupSessionTime);
            $("#redShiftEnable").prop('checked', items.settings.redShiftEnable);
            //items.settings.setRedShiftAutonomy();
            _enableEyesBreak(items.settings.eyesBreakEnable);
            _enableHeartBreak(items.settings.standupBreakEnable);
        });
    }

    function _restoreSettings() {
        // Default values:
        $('#eyesBreakEnable').prop('checked', true);
        $('#eyesNotifEnable').prop('checked', true);
        $('#eyesTextMsgEnable').prop('checked', true);
        $('#eyesSessionTime').val(20);
        $('#standupBreakEnable').prop('checked', true);
        $('#standupNotifEnable').prop('checked', true);
        $('#standupTextMsgEnable').prop('checked', true);
        $('#standupSessionTime').val(50);
        $('#redShiftEnable').prop('checked', true);
        _saveOptions();
    }

    function _addOptionChangedListener() {
        $('#eyesBreakEnable').change(_saveOptions);
        $('#eyesNotifEnable').change(_saveOptions);
        $('#eyesTextMsgEnable').change(_saveOptions);
        $('#eyesSessionTime').change(_saveOptions);
        $('#standupBreakEnable').change(_saveOptions);
        $('#standupNotifEnable').change(_saveOptions);
        $('#standupTextMsgEnable').change(_saveOptions);
        $('#standupSessionTime').change(_saveOptions);
        $('#redShiftEnable').change(_saveOptions);
    }

    return {
        init: init
    };
})(document, window, chrome, ID);

$( document ).ready(settings.init);
