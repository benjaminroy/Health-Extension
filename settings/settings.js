var timeout;

var showActiveContent = function(activeTab) {
    console.log('Show Active Content');
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

$('#submit').on('click', function() {
    var message = $("#message").val();
    var subject = $("#subject").val();
    window.open("mailto:benji015@hotmail.com?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(message));
})

$("[data-hide]").on("click", function(){
    $(this).closest("." + $(this).attr("data-hide")).fadeOut();
});

/* Manage Settings Checkboxes */
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

/* Save And Restore Settings */
var save_options = function() {
    chrome.storage.sync.set({
        eyesBreakEnable: document.getElementById('eyesBreakEnable').checked,
        eyesNotifEnable: document.getElementById('eyesNotifEnable').checked,
        eyesInactivityEnable: document.getElementById('eyesInactivityEnable').checked,
        eyesInactivityTime: $('#eyesInactivityTime').val(),
        standupBreakEnable: document.getElementById('standupBreakEnable').checked,
        standupNotifEnable: document.getElementById('standupNotifEnable').checked,
        standupInactivityEnable: document.getElementById('standupInactivityEnable').checked,
        standupInactivityTime: $('#standupInactivityTime').val(),
        redShiftEnable: document.getElementById('redShiftEnable').checked
    }, alert("success"));
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

var restore_options = function() {
    chrome.storage.sync.get({
        eyesBreakEnable,
        eyesNotifEnable,
        eyesInactivityEnable,
        eyesInactivityTime,
        standupBreakEnable,
        standupNotifEnable,
        standupInactivityEnable,
        standupInactivityTime,
        redShiftEnable
    }, function(items) {
        console.log(items);
        $("#eyesBreakEnable").prop('checked', items.eyesBreakEnable);
        $("#eyesNotifEnable").prop('checked', items.eyesNotifEnable);
        $("#eyesInactivityEnable").prop('checked', items.eyesInactivityEnable);
        $("#eyesInactivityTime").val(items.eyesInactivityTime);
        $("#standupBreakEnable").prop('checked', items.standupBreakEnable);
        $("#standupNotifEnable").prop('checked', items.standupNotifEnable);
        $("#standupInactivityEnable").prop('checked', items.standupInactivityEnable);
        $("#standupInactivityTime").val(items.standupInactivityTime);
        $("#redShiftEnable").prop('checked', items.redShiftEnable);

        enableEyesBreak(items.eyesBreakEnable);
        enableStandupBreak(items.standupBreakEnable);
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('eyesBreakEnable').addEventListener('change',save_options);
document.getElementById('eyesNotifEnable').addEventListener('change',save_options);
document.getElementById('eyesInactivityEnable').addEventListener('change',save_options);
document.getElementById('eyesInactivityTime').addEventListener('change',save_options);
document.getElementById('standupBreakEnable').addEventListener('change',save_options);
document.getElementById('standupNotifEnable').addEventListener('change',save_options);
document.getElementById('standupInactivityEnable').addEventListener('change',save_options);
document.getElementById('standupInactivityTime').addEventListener('change',save_options);
document.getElementById('redShiftEnable').addEventListener('change',save_options);
