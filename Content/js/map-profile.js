function onMapLoad() {
    new BotPath(map, COORDINATES);
    var minLatitude = null;
    var maxLatitude = null;
    var minLongitude = null;
    var maxLongitude = null;
    for (var i = 0; i < COORDINATES["stories"].length; i++) {
        var story = COORDINATES["stories"][i];
        if (minLatitude == null || parseFloat(story["latitude"]) < minLatitude) {
            minLatitude = parseFloat(story["latitude"]);
        }
        if (maxLatitude == null || parseFloat(story["latitude"]) > maxLatitude) {
            maxLatitude = parseFloat(story["latitude"]);
        }
        if (minLongitude == null || parseFloat(story["longitude"]) < minLongitude) {
            minLongitude = parseFloat(story["longitude"]);
        }
        if (maxLongitude == null || parseFloat(story["longitude"]) > maxLongitude) {
            maxLongitude = parseFloat(story["longitude"]);
        }
    }
    var centerLocation = new MAPS.Location((minLatitude + maxLatitude) / 2, (minLongitude + maxLongitude) / 2);
    console.log(JSON.stringify(centerLocation, null, "\t"));
    var viewOptions = {
        bounds: new MAPS.LocationRect(centerLocation, maxLongitude - minLongitude, maxLatitude - minLatitude),
    };
    console.log(JSON.stringify(viewOptions, null, "\t"));
    map.setView(viewOptions);
    COORDINATES = null;
}
