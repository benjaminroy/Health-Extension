var settings = (function(document, window, chrome) {
    'use strict';

    var _timeout;
    var _settings = {};
    var _port = chrome.extension.connect({
         name: "settingsUpdate"
    });

    function init() {
        console.log('init settings.js');
        _restoreOptions();
        _addOptionChangedListener();
        _showActiveContent($(".nav").find(".active").text());

        $(document).on('click','.navbar-collapse',function(e) {
            if($(e.target).is('a') ) {
                $(this).collapse('hide');
            }
        });
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
        $('#eyesInactivityEnable').attr("disabled", !isChecked);
        $('#eyesInactivityTime').attr("disabled", !isChecked);
    }

    function _enableStandupBreak(isChecked) {
        $('#standupNotifEnable').attr("disabled", !isChecked);
        $('#standupInactivityEnable').attr("disabled", !isChecked);
        $('#standupInactivityTime').attr("disabled", !isChecked);
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
            eyesInactivityEnable: $('#eyesInactivityEnable').is(':checked'),
            eyesInactivityTime: $('#eyesInactivityTime').val(),
            standupBreakEnable: $('#standupBreakEnable').is(':checked'),
            standupNotifEnable: $('#standupNotifEnable').is(':checked'),
            standupInactivityEnable: $('#standupInactivityEnable').is(':checked'),
            standupInactivityTime: $('#standupInactivityTime').val(),
            redShiftEnable: $('#redShiftEnable').is(':checked')
        };
        _port.postMessage(_settings);
        chrome.storage.sync.set({
            'settings': _settings
        }, _alert("success"));
    }

    function _restoreOptions() {
        chrome.storage.sync.get('settings', function(items) {
            $("#eyesBreakEnable").prop('checked', items.settings.eyesBreakEnable);
            $("#eyesNotifEnable").prop('checked', items.settings.eyesNotifEnable);
            $("#eyesInactivityEnable").prop('checked', items.settings.eyesInactivityEnable);
            $("#eyesInactivityTime").val(items.settings.eyesInactivityTime);
            $("#standupBreakEnable").prop('checked', items.settings.standupBreakEnable);
            $("#standupNotifEnable").prop('checked', items.settings.standupNotifEnable);
            $("#standupInactivityEnable").prop('checked', items.settings.standupInactivityEnable);
            $("#standupInactivityTime").val(items.settings.standupInactivityTime);
            $("#redShiftEnable").prop('checked', items.settings.redShiftEnable);
            _enableEyesBreak(items.settings.eyesBreakEnable);
            _enableStandupBreak(items.settings.standupBreakEnable);
        });
    }

    function _addOptionChangedListener() {
        $('#eyesBreakEnable').change(_saveOptions);
        $('#eyesNotifEnable').change(_saveOptions);
        $('#eyesInactivityEnable').change(_saveOptions);
        $('#eyesInactivityTime').change(_saveOptions);
        $('#standupBreakEnable').change(_saveOptions);
        $('#standupNotifEnable').change(_saveOptions);
        $('#standupInactivityEnable').change(_saveOptions);
        $('#standupInactivityTime').change(_saveOptions);
        $('#redShiftEnable').change(_saveOptions);
    }

    return {
        init: init
    };
})(document, window, chrome);

$( document ).ready(settings.init);
