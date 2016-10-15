var showActiveContent = function(activeTab) {
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

$( document ).ready(function() {
    showActiveContent($(".nav").find(".active").text());
});
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
    console.log('submit');

})



/* Manage Settings Checkboxes */
$('#eyesBreakEnable').change(function () {
    if ($(this).is(':checked')) {
        $('#eyesNotifEnable').attr("disabled", false);
        $('#eyesInactivityTime').attr("disabled", false);
    } else {
        $('#eyesNotifEnable').attr("disabled", true);
        $('#eyesInactivityTime').attr("disabled", true);
    }
});
$('#standupBreakEnable').change(function () {
    if ($('#standupBreakEnable').is(':checked')) {
        $("#standupNotifEnable").attr("disabled", false);
        $("#standupInactivityTime").attr("disabled", false);
    } else {
        $("#standupNotifEnable").attr("disabled", true);
        $("#standupInactivityTime").attr("disabled", true);
    }
});

/*
var isStandupBreakEnabled = function() {
    return $('input#standupBreakEnable').is(':checked');
}
var isStandupNotifEnabled = function() {
    return $('input#standupNotifEnable').is(':checked');
}
var isEyesBreakEnabled = function() {
    return $('input#eyesBreakEnable').is(':checked');
}
var isEyesNotifEnabled = function () {
    return $('input#eyesNotifEnable').is(':checked');
}
*/
