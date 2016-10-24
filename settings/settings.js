var timeout;
var settings = {};
var port = chrome.extension.connect({
     name: "settingsUpdate"
});

// ----------- NAVIGATION BAR -----------

var showActiveContent = function(activeTab) {
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
showActiveContent($(".nav").find(".active").text());

$(document).on('click','.navbar-collapse',function(e) {
    if($(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});

$(".nav a").on("click", function() {
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
    $("#title").text($(this).text());
    showActiveContent($(this).text());
});

// ----------- OPTIONS -----------

var enableEyesBreak = function(isChecked) {
    $('#eyesNotifEnable').attr("disabled", !isChecked);
    $('#eyesInactivityEnable').attr("disabled", !isChecked);
    $('#eyesInactivityTime').attr("disabled", !isChecked);
}

var enableStandupBreak = function(isChecked) {
    $('#standupNotifEnable').attr("disabled", !isChecked);
    $('#standupInactivityEnable').attr("disabled", !isChecked);
    $('#standupInactivityTime').attr("disabled", !isChecked);
}

$('#eyesBreakEnable').change(function () {
    enableEyesBreak($(this).is(':checked'));
});

$('#standupBreakEnable').change(function () {
    enableStandupBreak($(this).is(':checked'));
});

var save_options = function() {
    var settings = {
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
    port.postMessage(settings);
    chrome.storage.sync.set({
        'settings': settings
    }, alert("success"));
}

var restore_options = function() {
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
        enableEyesBreak(items.settings.eyesBreakEnable);
        enableStandupBreak(items.settings.standupBreakEnable);
    });
}

var alert = function(type) {
    if (timeout){
        clearTimeout(timeout);
    }
    $(".alert-"+type).fadeIn();
    timeout = setTimeout(function() {
        $(".alert-"+type).fadeOut();
    }, 5000);
};

$("[data-hide]").on("click", function(){
    $(this).closest("." + $(this).attr("data-hide")).fadeOut();
});

// ----------- SUPPORT -----------

$('#submit').on('click', function() {
    var message = $("#message").val();
    var subject = $("#subject").val();
    window.open("mailto:benji015@hotmail.com?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(message));
})


// ----------- LISTENER -----------
$( document ).ready(restore_options);
$('#eyesBreakEnable').change(save_options);
$('#eyesNotifEnable').change(save_options);
$('#eyesInactivityEnable').change(save_options);
$('#eyesInactivityTime').change(save_options);
$('#standupBreakEnable').change(save_options);
$('#standupNotifEnable').change(save_options);
$('#standupInactivityEnable').change(save_options);
$('#standupInactivityTime').change(save_options);
$('#redShiftEnable').change(save_options);
