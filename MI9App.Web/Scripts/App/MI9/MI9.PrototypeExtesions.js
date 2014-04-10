/// <reference path="../../jquery-1.7.1.intellisense.js" />

String.prototype.format = function (params) {
    var outputString = this;
    if (params) {
        for (var paramIndex = 0; paramIndex < params.length; paramIndex++) {
            var re = new RegExp("\\{num\\}".replace("num", paramIndex), 'g');
            outputString = outputString.replace(re, params[paramIndex]);
        }
    }
    return outputString;
};
