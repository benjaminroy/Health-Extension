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
    $("#options").load("options.html");
    $("#support").load("support.html");
});
$(document).on('click','.navbar-collapse',function(e) {
    if($(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});
$(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
    $("#title").text($(this).text());
    showActiveContent($(this).text());
});


/* Manage Settings Checkboxes */
/*$('#eyesBreakEnable').change(function () {
    if ($(this).is(':checked')) {
        console.log("disabled");
        $(this).attr("disabled", false);
    } else {
        $(this).attr("disabled", true);
        console.log("enabled");
    }
});

$('#standupBreakEnable').change(function () {
    console.log("fds");
    if ($('#standupBreakEnable').is(':checked')) {
        $("#standupBreakNotif").attr("disabled", false);
    } else {
        $("#standupBreakNotif").attr("disabled", true);
    }
});
*/
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
