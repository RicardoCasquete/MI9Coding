/// <reference path="../MI9/MI9.Common.js" />
/// <reference path="../MI9/MI9.DataAccess.js" />
/// <reference path="../../jquery-1.9.1.intellisense.js" />


var MI9PayloadDataAccess = (function () {

    return {
        getTestInput: function (inputParameter, callback, callbackData, callbackError) {
            MI9DataAccess.getData("/Home/GetTestInput/", inputParameter, callback, callbackData, callbackError);
        },

        executeRequest: function (inputParameter, callback, callbackData, callbackError) {
            MI9DataAccess.postData("/Home/Post", inputParameter, callback, callbackData, callbackError);
        }
    }
})();