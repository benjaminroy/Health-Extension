var settings = (function(document, window, chrome) {
    'use strict';

    var _timeout;
    var _settings = {};
    var _settingsPort = chrome.extension.connect({
         name: "settingsPort"
    });
    var _heartPort = chrome.extension.connect({
         name: "heartPort"
    });
    var _eyesPort = chrome.extension.connect({
         name: "eyesPort"
    });

    function init() {
        _restoreOptions();
        _addOptionChangedListener();
        _showActiveContent($(".nav").find(".active").text());

        $(document).on('click','.navbar-collapse',function(e) {
            if($(e.target).is('a') ) {
                $(this).collapse('hide');
            }
        });
        $('#restoreSettings').on('click', _restoreSettings);
        $('#eyesBreakEnable').change(function () {
            _enableEyesBreak($(this).is(':checked'));
        });
        $('#standupBreakEnable').change(function () {
            _enableStandupBreak($(this).is(':checked'));
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

        // SUPPORT (will be moved somewhere else);
        $('#submit').on('click', function() {
            var message = $("#message").val();
            var subject = $("#subject").val();
            window.open("mailto:benji015@hotmail.com?subject="
                + encodeURIComponent(subject)
                + "&body=" + encodeURIComponent(message));
        })
    }

    function _enableEyesBreak(isChecked) {
        $('#eyesNotifEnable').attr("disabled", !isChecked);
        $('#eyesTextMsgEnable').attr("disabled", !isChecked);
        $('#eyesSessionTime').attr("disabled", !isChecked);
        if (isChecked) {
            _eyesPort.postMessage(_settings);
        }
    }

    function _enableStandupBreak(isChecked) {
        $('#standupNotifEnable').attr("disabled", !isChecked);
        $('#standupTextMsgEnable').attr("disabled", !isChecked);
        $('#standupSessionTime').attr("disabled", !isChecked);
        if (isChecked) {
            _heartPort.postMessage(_settings);
        }
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
        for (var i = 0; i < tabsId.length; i++) {
            $("#" + tabsId[i]).hide();
        }
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
            _enableEyesBreak(items.settings.eyesBreakEnable);
            _enableStandupBreak(items.settings.standupBreakEnable);
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
})(document, window, chrome);

$( document ).ready(settings.init);
