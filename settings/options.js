var options = (function (document, window, chrome) {
	"use strict";

    function init() {
        _createMenuHandler();

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
            _showContent($(this).text());
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

$( document ).ready(options.init);
