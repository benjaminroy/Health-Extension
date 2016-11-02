var options = (function (document, window, chrome) {
	"use strict";

	const _TABS_ID = ["options", "documentation", "contact"];

    function init() {
        _createMenuHandler();

		var activeId = $(".nav").find(".active").text().toLowerCase();
        _loadContent(activeId);
    }

    function _createMenuHandler() {
        $(document).on('click','.navbar-collapse',function(e) {
            if($(e.target).is('a') ) {
                $(this).collapse('hide');
            }
        });

        $(".nav a").on("click", _changeTab);
    }

    function _changeTab(event) {
		var activeId = event.target.id.substring(4).toLowerCase();
		_setTitle(activeId);
		_loadContent(activeId);
        $(".alert-success").hide();
    };

	function _setTitle(activeId) {
		$(".nav").find(".active").removeClass("active");
		$(event.target).parent().addClass("active");
		var title = chrome.i18n.getMessage(activeId);
		$("#title").text(title);
	}

	function _loadContent(activeId) {
		var tabsId = new Array();
		tabsId = tabsId.concat(_TABS_ID);
        var index = tabsId.indexOf(activeId);
        if (index !== -1) {
            tabsId.splice(index, 1);
        }
        $("#" + activeId).show();
        tabsId.map(tab => $("#" + tab).hide());
	}

    return {
        init: init
    };

})(document, window, chrome);

$( document ).ready(options.init);
