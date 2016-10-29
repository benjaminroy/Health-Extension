var support = (function(document, window, chrome) {
    'use strict';

    function init() {
        $('#submit').on('click', function() {
            var message = $("#message").val();
            var subject = $("#subject").val();
            window.open("mailto:benji015@hotmail.com?subject="
                + encodeURIComponent(subject)
                + "&body=" + encodeURIComponent(message));
        })
    }

    return {
        init: init
    };
})(document, window, chrome);

$( document ).ready(support.init);
