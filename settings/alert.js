var alert = (function(document, window, chrome, ID, DEFAULTS) {
    'use strict';

    var _timeout = null;

    function init() {
        _createHideNotificationHandler();
    }

	function send(type) {
		if (_timeout){
			clearTimeout(_timeout);
		}
		$(".alert-"+type).fadeIn();
		_timeout = setTimeout(function() {
			$(".alert-"+type).fadeOut();
		}, 5000);
	};

    function _createHideNotificationHandler() {
        $("[data-hide]").on("click", function(){
            $(this).closest("." + $(this).attr("data-hide")).fadeOut();
        });
    }

    return {
        init: init
        ,send: send
    };
})(document, window, chrome, ID, DEFAULTS);

$( document ).ready(alert.init);
