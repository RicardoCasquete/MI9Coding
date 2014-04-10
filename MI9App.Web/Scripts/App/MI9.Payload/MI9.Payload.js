/// <reference path="../MI9/MI9.Common.js" />
/// <reference path="../MI9/MI9.DataAccess.js" />
/// <reference path="../MI9/MI9.PrototypeExtesions.js" />
/// <reference path="../MI9/MI9.PopUp.js" />
/// <reference path="MI9.Payload.DataAccess.js" />
/// <reference path="MI9.Payload.Binding.js" />

/// <reference path="../../jquery-1.9.1.intellisense.js" />
/// <reference path="../../knockout-2.1.0.debug.js" />
/// <reference path="../../bootstrap.js" />

var MI9Payload = (function () {

    var binding = new PayloadBinding({});

    function init() {

        //Subscribe to Events and Set Up Controls
        $('#btn-loadTest').click(function (e) { e.preventDefault(); loadTestFromServer(); });
        $('#btn-viewJson').click(function (e) { e.preventDefault(); viewJSON(); });
        $('#btn-viewOutput').click(function (e) { e.preventDefault(); executeRequest(); });

        $(document).delegate('.btn-delete-entry', 'click', function (e) { e.preventDefault(); removeEntry(ko.dataFor(this), this); });
        $(document).delegate('.btn-edit-entry', 'click', function (e) { e.preventDefault(); editEntry(ko.dataFor(this), this); });

        viewJSON();
        //Initialize Model and Bindings
        ko.applyBindings(binding, $('#payload-list').first().element);
    }


    function loadTestFromServer() {
        MI9Shared.blockUI();

        MI9PayloadDataAccess.getTestInput({}, loadTestFromServerCallback, {});
    }

    function loadTestFromServerCallback(data, callbackData) {
        MI9Shared.unblockUI();

        if (data) {

            binding.clearPayload();

            binding.payloadList.skip(data.skip);
            binding.payloadList.take(data.take);
            binding.payloadList.totalRecords(data.totalRecords);

            $(data.payload).each(function () {
                binding.addPayloadEntry(this);
            });
        }
    }


    function viewJSON() {
        $('#txt-json-input').val(binding.toJSONString());
    }


    function executeRequest() {
        MI9Shared.blockUI();

        var request = $('#txt-json-input').val();
        MI9PayloadDataAccess.executeRequest( request, executeRequestCallback, {}, executeRequestErrorCallback);
    }

    function executeRequestCallback(data, callbackData) {
        MI9Shared.unblockUI();

        if (data) {
            $('#response-output').html(JSON.stringify(data, null, 2));
        }
    }

    function executeRequestErrorCallback(data, callbackData) {
        MI9Shared.unblockUI();

        if (data) {
            var response = "{0}<br/>{1}".format([data.thrownError, data.xhr.responseText ]);
            $('#response-output').html(response);
        }
    }


    function removeEntry(entry, button) {
        binding.removePayloadEntry(entry);
    }

    function editEntry(entry, button) {
        $('#edit-Entry').modal().show();
    }

    return {
        init: init,
        masterBinding: function () {
            return binding;
        }
    }

})();
