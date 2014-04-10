/// <reference path="../../jquery-1.9.1.js" />
/// <reference path="../../jquery-ui-1.8.20.js" />
/// <reference path="MI9.DataAccess.js" />

var MI9Shared = (function () {

    function blockObject() {
        return { message: $('#waiting-block').html() };
    }

    return {
        init: function () {
            MI9Console.init();
        },

        blockUI: function () {
            $.blockUI(blockObject());
        },

        unblockUI: function () {
            $.unblockUI();
        }
    }
})();

var MI9Console = (function () {
    return {
        init: function () {
            if (!window.console) window.console = {};
            if (!window.console.log) window.console.log = function () { };
        },

        log: function (message) {
            if (window.console && window.console.log) {
                window.console.log(message);
            }
        },

        handleError: function (options) {

            MI9Shared.unblockUI();
            MI9DataAccess.postData("/Home/LogError", { options: options }, {}, null);
        }
    }
})();
