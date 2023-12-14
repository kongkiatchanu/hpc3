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
    zoom_map = 6;
} else {
    zoom_map = 6;
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
    lat: 13.0324802,
    lng: 100.8841734
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
    if(phase=='all'){
        markerGroup.clearLayers();
        $.getJSON("https://cmu.cmuccdc.org/assets/js/fullmap/purpleair_data.json?v=1", function (db) {
            if (db) {
                $.each(db, function (index, value) {
                    var color_marker = '170,68,170';
                    //////////////////////////////////////////////////////////////
                    chk_safety = 0;
                    // number_title = Math.floor(parseFloat(value.pm25));
                    //////////////////////////////////////////////////////////////
                    marker = L.marker([value.dustboy_lat, value.dustboy_lon], {
                        icon: L.divIcon({
                            className: "custom_marker",
                            iconSize: [35, 35], 
                            iconAnchor: [0, 0],
                            labelAnchor: [-6, 0],
                            popupAnchor: [17, 0],
                            html: '<div class="custom_marker slit_in_vertical anime_delay05" style="background-color:rgba(' + color_marker + ')">' + ' ' + '</div>'
                        })
                    }).bindPopup(value.dustboy_name).addTo(markerGroup);
                });
            }
        });
        markerGroup.addTo(map);
    }
}