function onMapLoad() {
    map.setOptions({ disableZooming: true });
    drawIndividualLocations(map, COORDINATES);
    Microsoft.Maps.Events.addHandler(map, 'mousewheel', function (e) {
        e.handled = true;
        return false;
    });
}

function drawIndividualLocations(map, coordinates) {
    var pushpinOptions = {
        anchor: new MAPS.Point(15, 15),
        width: null,
        height: null,
        visibile: true,
    };

    for (var i = 0; i < coordinates.length; i++) {
        var botInfo = coordinates[i];
        pushpinOptions["htmlContent"] = '<a href="#"><img src="' +
            botInfo["imageUrl"] + '" class="bot-pushpin"/></a>';
        new Pushpin(map, new MAPS.Location(botInfo["latitude"], botInfo["longitude"]), pushpinOptions, botInfo["botSlug"]);
    }
}

// Pushpin is wrapped in case events and data need to be wrapped to it.
function Pushpin(map, location, pushpinOptions, id) {
    console.log(id);
    this._pushpin = new MAPS.Pushpin(location, pushpinOptions);
    map.entities.push(this._pushpin);
    this.id = id;
    var self = this;
    var pushpinOnClick = function () { 
        window.open("Explorers/" + self.id, "_self");
    }

    MAPS.Events.addHandler(this._pushpin, 'click', pushpinOnClick);
}

