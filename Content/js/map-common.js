
var MAPS = Microsoft.Maps;
var map = null;

$(function () {
    MAPS.loadModule('Microsoft.Maps.Overlays.Style', { callback: getMap });
});


function BotPath(map, coordinates) {

    this._botId = coordinates["botId"];
    this._pushpins = [];

    var polygonCoordinates = [];
    // draw each story coordinate
    for (var i = 0; i < coordinates["stories"].length; i++) {
        var story = coordinates["stories"][i];
        // Plot story
        this._pushpins.push(new Pushpin(map, new MAPS.Location(story["latitude"], story["longitude"]), story["id"], coordinates["colorClass"]));
        polygonCoordinates.push(new MAPS.Location(story["latitude"], story["longitude"]));
    }
    var polylineOptions = {
        strokeColor: MAPS.Color.fromHex(coordinates["colorHex"]),
    }

    this._polyline = new MAPS.Polyline(polygonCoordinates, polylineOptions);
    map.entities.push(this._polyline);
}

BotPath.prototype = {
    show: function () {
        for (var i = 0; i < this._pushpins.length; i++) {
            this._pushpins[i].setOptions({ visible: true });
        }
        this._polyline.setOptions({ visible: true });
    },

    hide: function () {
        for (var i = 0; i < this._pushpins.length; i++) {
            this._pushpins[i].setOptions({ visible: false });
        }
        this._polyline.setOptions({ visible: false });
    },
};

function Pushpin(map, location, id, colorClass) {


    var pushpinOptions = {
        //text: story["numStories"].toString(),
        anchor: new MAPS.Point(10, 10),
        width: null,
        height: null,
        visible: true,
        htmlContent: '<div class="hi-icon-effect-2 hi-icon-effect-2a"><div class="hi-icon ' + colorClass + '" id="pushpin' + id + '">Place</div></div>',
        //textOffset: new MAPS.Point(0, 5),
    };

    this._pushpin = new MAPS.Pushpin(location, pushpinOptions);
    map.entities.push(this._pushpin);
    this.id = id;
    var self = this;

    var pushpinOnClick = function () {
        //$("#pushpinInfo .pushpin-location").html(STORIES[self.id]["locationName"]);
        $('.hi-icon').removeClass("hi-icon-select");
        $('#pushpin' + self.id).addClass("hi-icon-select");
//        $.ajax({
//            type: 'POST',
//            url: '/map/GetStory',
//            data: JSON.stringify({ "storyId": self.id }),
//            contentType: 'application/json; charset=utf-8',
//            dataType: 'html',
//            success: function (data) {
//                onSuccess(data);
//            },
//            error: function (data, success, error) {
//                $('.map-story-info').hide();
//                console.log("data: " + JSON.stringify(data, null, "\t"));
//                console.log("Error: " + error);
//            },
//        });
    }

    function onSuccess(data) {
        $('.map-story-info').show();
        $("#pushpinInfo").html(data);
    }

    MAPS.Events.addHandler(this._pushpin, 'click', pushpinOnClick);
}

Pushpin.prototype = {
    setOptions: function (options) {
        this._pushpin.setOptions(options);
    },
};

function getMap() {
    var mapOptions = {
        //center: new Microsoft.Maps.Location(47.6097, -122.3331),
        credentials: "AvJsJBaZS1YWkXpp9PQs_2SID8jck2bBeSisStv9p2sA6UvYCIX2y6WgrXEWS6E8",
        customizeOverlays: true,
        enableClickableLogo: false,
        enableSearchLogo: false,
        mapTypeId: MAPS.MapTypeId.road,
        showMapTypeSelector: false,
        showScalebar: false,
        zoom: 3.5,
        center: new Microsoft.Maps.Location(39.833333, -98.583333),
        //,disableZooming: true
    };

    map = new MAPS.Map(document.getElementById("mapDiv"), mapOptions);

    // "map" is our Bing Maps object, overload the built-in getZoomRange function
    // to set our own min/max zoom
    map.getZoomRange = function () {
        return {
            max: 10,
            min: 3.5
        };
    };

    // Attach a handler to the event that gets fired whenever the map's view is about to change
    MAPS.Events.addHandler(map, 'viewchangestart', restrictZoom);

    onMapLoad();

    // Source: http://stackoverflow.com/questions/4327665/restrict-the-min-max-zoom-on-a-bing-map-with-v7-of-the-ajax-control
    function restrictZoom() {
        if (map.getZoom() <= map.getZoomRange().min) {
            map.setView({
                'zoom': map.getZoomRange().min,
                'animate': false
            });
        }
        else if (map.getZoom() >= map.getZoomRange().max) {
            map.setView({
                'zoom': map.getZoomRange().max,
                'animate': false
            });
        }
    }
}
