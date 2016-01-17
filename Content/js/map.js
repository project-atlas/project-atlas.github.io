var botPaths = {};

function onMapLoad() {
    map.setOptions({
        zoom: 6,
        center: new Microsoft.Maps.Location(48.3672, -99.9961),
    });
    drawBotPath(map, COORDINATES_MULTI);
    $('.map-story-info').hide();
    COORDINATES_MULTI = null;
}

function drawBotPath(map, coordinates) {
    for (var botNum = 0; botNum < coordinates.length; botNum++) {
        var _coordinates = coordinates[botNum];
        botPaths[_coordinates["botId"]] = new BotPath(map, _coordinates);
    }
}

$(function () {
    $(".bot-selector").click(function () {
        if ($(this).hasClass("selected")) {
            $(".bot-selector").each(function () {
                $(this).removeClass("unselected");
                $(this).removeClass("selected");
                var botId = $(this).data("id");
                botPaths[botId].show();
            });
        } else {
            $(".bot-selector").each(function () {
                $(this).addClass("unselected");
                $(this).removeClass("selected");
                var botId = $(this).data("id");
                botPaths[botId].hide();
            });

            $(this).removeClass("unselected");
            $(this).addClass("selected");
            var botId = $(this).data("id");
            botPaths[botId].show();
        }
    });
});
