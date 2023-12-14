$(function () {
    $.ajaxSetup({
        async: false
    });
    genMap('all','all');
    $('[data-toggle="tooltip"]').tooltip();
});
var width_window = $(window).width();
var zoom_map;
if (width_window < 1600) {
    zoom_map = 15;
} else {
    zoom_map = 15;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var normalMap = L.tileLayer.ThaiProvider('Google.Normal.Map', {
    maxZoom: 20,
    minZoom: 4
}),
satelliteMap = L.tileLayer.ThaiProvider('Google.Satellite.Map', {
    maxZoom: 20,
    minZoom: 4
});
var baseLayers = {
    "Normal map": normalMap,
    "Satellite map": satelliteMap,
}
var map = L.map('us_map', {
    layers: [normalMap],
    attributionControl: false
});
L.control.layers(baseLayers).addTo(map);

map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';
map.setView({
    lat: 18.7089347,
    lng: 99.036961
}, zoom_map);
//Locate
var lc = L.control.locate({
    position: "topleft",
    strings: {
        title: "My location"
    },
    locateOptions: {
        enableHighAccuracy: true
    },
}).addTo(map);
var marker = {};
var markerGroup = L.layerGroup();
function genMap(phase=null,area=null){
    // markerGroup.clearLayers();
    $.getJSON("https://cmu.cmuccdc.org/assets/js/fullmap/map.json?v=1", function (db) {
        if (db) {
            $.each(db, function (index, value) {
                var color_marker;
                //////////////////////////////////////////////////////////////
                chk_safety = 0;
                color_marker = '4,177,158';
                //////////////////////////////////////////////////////////////
                marker = L.marker([value.map_lat, value.map_lon], {
                    icon: L.divIcon({
                        className: "custom_marker",
                        iconSize: [35, 35], 
                        iconAnchor: [0, 0],
                        labelAnchor: [-6, 0],
                        popupAnchor: [17, 0],
                        html: '<div class="custom_marker slit_in_vertical anime_delay05" style="background-color:rgba(' + color_marker + ')">' + ' ' + '</div>'
                    })
                }).addTo(markerGroup);
            });
        }
    });
    markerGroup.addTo(map);
}