$(function () {
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
    genMap('all','all');
    function genMap(phase,area){
        $.getJSON("https://cmu.cmuccdc.org/assets/js/fullmap/ccdc_phase14.json", function (db) {
            if (db) {
                $.each(db, function (index, value) {
                    var marker = {};
                    var number_title,color_marker,title_en,title,dustboy_icon,chk_safety;
                    //////////////////////////////////////////////////////////////
                    chk_safety = 0;
                    // number_title = Math.floor(parseFloat(value.pm25));
                    if(value.phase==1) color_marker = '238,49,95';
                    if(value.phase==2) color_marker = '255,206,51';
                    if(value.phase==3) color_marker = '249,124,80';
                    if(value.phase==4) color_marker = '4,177,158';
                    //////////////////////////////////////////////////////////////
                    marker = L.marker([value.dustboy_lat, value.dustboy_lon], {
                        icon: L.divIcon({
                            className: "custom_marker",
                            iconSize: [35, 35], 
                            iconAnchor: [0, 0],
                            labelAnchor: [-6, 0],
                            popupAnchor: [17, 0],
                            html: '<div class="custom_marker slit_in_vertical anime_delay075" style="background-color:rgba(' + color_marker + ')">' + ' ' + '</div>'
                        })
                    }).addTo(map);
                });
            }
        });
    }
    // $.getJSON("https://cmu.cmuccdc.org/assets/js/fullmap/ccdc_data.json?v=2", function (db) {
    //     if (db) {
    //         $.each(db, function (index, value) {
    //             var marker = {};
    //             var number_title,color_marker,title_en,title,dustboy_icon,chk_safety;
    //             //////////////////////////////////////////////////////////////
    //             chk_safety = 0;
    //             // number_title = Math.floor(parseFloat(value.pm25));
    //             if(value.phase==1) color_marker = '238,49,95';
    //             if(value.phase==2) color_marker = '255,206,51';
    //             if(value.phase==3) color_marker = '249,124,80';
    //             if(value.phase==4) color_marker = '4,177,158';
    //             //////////////////////////////////////////////////////////////
    //             marker = L.marker([value.dustboy_lat, value.dustboy_lon], {
    //                 icon: L.divIcon({
    //                     className: "custom_marker",
    //                     iconSize: [35, 35], 
    //                     iconAnchor: [0, 0],
    //                     labelAnchor: [-6, 0],
    //                     popupAnchor: [17, 0],
    //                     html: '<div class="custom_marker slit_in_vertical anime_delay075" style="background-color:rgba(' + color_marker + ')">' + ' ' + '</div>'
    //                 })
    //             }).addTo(map);
    //         });
    //     }
    // });
    $('[data-toggle="tooltip"]').tooltip();
});