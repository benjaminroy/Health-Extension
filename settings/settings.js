var showActiveContent = function(activeTab) {
    console.log('Show Active Content');
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
