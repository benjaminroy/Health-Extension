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
    $("#data").load("data.html");
    $("#documentation").load("documentation.html");
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
$('input#eyesBreakEnable').change(function () {
    if ($('input#eyesBreakEnable').is(':checked')) {
        $("input#eyesBreakNotif").attr("disabled", false);
    } else {
        $("input#eyesBreakNotif").attr("disabled", true);
    }
});
$('input#standupBreakEnable').change(function () {
    if ($('input#standupBreakEnable').is(':checked')) {
        $("input#standupBreakNotif").attr("disabled", false);
    } else {
        $("input#standupBreakNotif").attr("disabled", true);
    }
});
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
