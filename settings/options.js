var options = (function (document, window, chrome) {
	"use strict";

    function init() {
        _createMenuHandler();
        _createHideNotificationHandler();

		var activeContent = $(".nav").find(".active").text();
        _showContent(activeContent);
    }

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

})(document, window, chrome);

options.init();
