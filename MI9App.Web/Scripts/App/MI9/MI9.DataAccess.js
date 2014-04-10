/// <reference path="../../jquery-1.9.1.intellisense.js" />
/// <reference path="MI9.Common.js" />

var MI9DataAccess = (function () {  

    function performCall(dataUrl, method, inputParameter, callback, callbackData, callbackError) {
        var self = this;

        self.inputParameter = inputParameter;
        self.callback = callback;
        self.callbackData = callbackData;
        self.callbackError = callbackError;

        $.ajax({
            url: dataUrl,
            type: method,
            data: inputParameter,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data, textStatus, jqXHR) {
                self.callback(data, self.callbackData);
            },

            error: function (xhr, ajaxOptions, thrownError) {
                MI9Shared.unblockUI();
                if (callbackError) {
                    callbackError({ xhr: xhr, ajaxOptions: ajaxOptions, thrownError: thrownError });
                } else {
                    MI9Console.handleError({ xhr: xhr, ajaxOptions: ajaxOptions, thrownError: thrownError });
                }
            }
        });
    }
    return {

        getData: function (dataUrl, inputParameter, callback, callbackData, callbackError) {
            performCall(dataUrl,
                        'GET',
                        inputParameter,
                        callback,
                        callbackData,
                        callbackError
            );

        },

        postData: function (dataUrl, inputParameter, callback, callbackData, callbackError) {
            performCall(dataUrl,
                        'POST',
                        inputParameter,
                        callback,
                        callbackData,
                        callbackError
            );
        }
    }
})();