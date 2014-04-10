/// <reference path="../../jquery-1.9.1.intellisense.js" />
/// <reference path="../../knockout-2.1.0.debug.js" />
/// <reference path="../../js-beautify.js" />


function PayloadBinding(options) {
    var self = this;

    //Properties
    self.payloadList = new PayloadList({});

    //Observables
    //Observables Arrays
    //Dependant Observables

    //Class Methods
    self.clearPayload = function () {
        self.payloadList.payload.removeAll();
    };

    self.addPayloadEntry = function (payload) {
        self.payloadList.payload.push(new Payload(payload));
    };

    self.removePayloadEntry = function (payload) {
        self.payloadList.payload.remove(payload);
    };

    self.toJSONString = function () {
        return js_beautify(ko.toJSON(self.payloadList));
        //return JSON.stringify(ko.toJSON(self.payloadList));
    };

    //Initial Load Arrays
    $(options.payload).each(function () {
        self.addPayloadEntry(this);
     });
}

function PayloadList(options) {
    var self = this;

    //Observables
    self.skip = ko.observable(options.skip);
    self.take =  ko.observable(options.take);
    self.totalRecords = ko.observable(options.totalRecords);

    //ObservablesArrays
    self.payload = ko.observableArray([]);
}   

function Payload(options) {
    var self = this;

    //Observables
    self.country = ko.observable(options.country);
    self.description = ko.observable(options.description);
    self.drm = ko.observable(options.drm);
    self.episodeCount = ko.observable(options.episodeCount);
    self.genre = ko.observable(options.genre);
    self.language = ko.observable(options.language);
    self.primaryColour = ko.observable(options.primaryColour);
    self.slug = ko.observable(options.slug);
    self.title = ko.observable(options.title);
    self.tvChannel = ko.observable(options.tvChannel);
    self.nextEpisode = ko.observable(new Episode(options.nextEpisode));
    
    //Observables Arrays
    self.image = ko.observableArray([]);
    self.seasons = ko.observableArray([]);

    //Dependant Observables

    //Class Methods

    //Initial Load Arrays
    $(options.image).each(function () {
        self.image.push(new Image(this));
    });

    $(options.seasons).each(function () {
        self.seasons.push(new Season(this));
    });
}

function Image(options) {
    var self = this;

    self.showImage = ko.observable(options.showImage);
}

function Season(options) {
    var self = this;

    self.slug = ko.observable(options.slug);
}

function Episode(options) {
    var self = this;

    if (!options) {
        options = {};
    }

    self.channel = ko.observable(options.channel);
    self.channelLogo = ko.observable(options.channelLogo);
    self.date = ko.observable(options.date);
    self.html = ko.observable(options.html);
    self.url = ko.observable(options.url);
}