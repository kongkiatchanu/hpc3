$(function () {
    var base_url = "https://www.cmuccdc.org/";
    function colorpm25(pm25){
        if(pm25<=25){
            return '0,191,243'
        }else if(pm25>25&&pm25<=37){
            return '0,166,81'
        }else if(pm25>37&&pm25<=50){
            return '253,192,78'
        }else if(pm25>50&&pm25<=90){
            return '242,101,34'
        }else{
            return '205,0,0'
        }
    }
    // console.log($('.map').attr('data-area'));
    var map_area = $('.map').attr('data-area');
    if(map_area==1){map('map_podd',base_url+'report/pdf_pm25_test/1?v=1','th',18.7804223,99.9535746,7);}
    if(map_area==2){map('map_podd',base_url+'report/pdf_pm25_test/2?v=1','th',16.7804223,99.9535746,7);}
    if(map_area==3){map('map_podd',base_url+'report/pdf_pm25_test/3?v=1','th',14.7804223,99.9535746,7);}
    if(map_area==4){map('map_podd',base_url+'report/pdf_pm25_test/4?v=1','th',15.2804223,99.9535746,7);}
    if(map_area==5){map('map_podd',base_url+'report/pdf_pm25_test/5?v=1','th',14.7804223,99.9535746,6);}
    if(map_area==6){map('map_podd',base_url+'report/pdf_pm25_test/6?v=1','th',14.7804223,99.9535746,6);}
    if(map_area==7){map('map_podd',base_url+'report/pdf_pm25_test/7?v=1','th',16.2804223,103.0535746,8);}
    if(map_area==8){map('map_podd',base_url+'report/pdf_pm25_test/8?v=1','th',17.2804223,103.0535746,7);}
    if(map_area==9){map('map_podd',base_url+'report/pdf_pm25_test/9?v=1','th',16.5804223,103.0535746,7);}
    if(map_area==10){map('map_podd',base_url+'report/pdf_pm25_test/10?v=1','th',15.2804223,105.0535746,8);}
    if(map_area==11){map('map_podd',base_url+'report/pdf_pm25_test/11?v=1','th',7.2804223,99.9535746,8);}
    if(map_area==12){map('map_podd',base_url+'report/pdf_pm25_test/12?v=1','th',7.0076994,100.4753595,14);}
    if(map_area==13){map('map_podd',base_url+'report/pdf_pm25_test/13?v=1','th',13.7248936,100.5530265,11);}
    function map(id,url,index_map,lat,lng,zoom) {
        var normalMap = L.tileLayer.ThaiProvider('Google.Normal.Map', {
            maxZoom: 18,
            minZoom: 5,
            attribution: '&copy; <a href="https://www.cmuccdc.org/">cmuccdc.org</a>'
        }),
        satelliteMap = L.tileLayer.ThaiProvider('Google.Satellite.Map', {
            maxZoom: 18,
            minZoom: 5,
            attribution: '&copy; <a href="https://www.cmuccdc.org/">cmuccdc.org</a>'
        });
        OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 5,
            attribution: '&copy; <a href="https://www.cmuccdc.org/">cmuccdc.org</a>'
        });
        Esri_WorldLightCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 16,
            minZoom: 5,
            attribution: '&copy; <a href="https://www.cmuccdc.org/">cmuccdc.org</a>'
        });
        Esri_WorldDarkCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 16,
            minZoom: 5,
            attribution: '&copy; <a href="https://www.cmuccdc.org/">cmuccdc.org</a>'
        });
        var baseLayers = {
            "Normal map": normalMap,
            "Satellite map": satelliteMap,
            "OpenStreetMap map": OpenStreetMap_Mapnik,
            "Light map": Esri_WorldLightCanvas,
            "Dark map": Esri_WorldDarkCanvas
        }
        var map = L.map(id, {
            layers: [normalMap],
            attributionControl: false
        });
        L.control.layers(baseLayers).addTo(map);

        map.createPane('labels');
        map.getPane('labels').style.zIndex = 650;
        map.getPane('labels').style.pointerEvents = 'none';
        map.setView({
            lat: lat!=null?lat:0,
            lng: lng!=null?lng:0
        }, zoom);
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
        $.getJSON(url, function (db) {
            if (db) {
                $.each(db, function (index, value) {
                    $.each(value.stations, function (i, v) {
                        var marker = {};
                        var number_title,color_marker,title_en,title,dustboy_icon,chk_safety;
                        //////////////////////////////////////////////////////////////
                        // chk_safety = 0;
                        number_title = Math.floor(parseFloat(v.pm25['PM25']));
                        color_marker = colorpm25(v.pm25['PM25']);
                        // title_en = value.us_title_en;
                        // title = value.us_title;
                        // dustboy_icon = value.us_dustboy_icon;
                        //////////////////////////////////////////////////////////////
                        if(number_title){
                            // console.log(v.location_lat);
                            // console.log(v.location_lon);
                            // console.log(number_title);
                            marker = L.marker([v.location_lat, v.location_lon], {
                                icon: L.divIcon({
                                    className: "custom_marker",
                                    iconSize: [35, 35], 
                                    iconAnchor: [0, 0],
                                    labelAnchor: [-6, 0],
                                    popupAnchor: [17, 0],
                                    html: '<div class="custom_marker slit_in_vertical anime_delay075" style="background-color:rgba(' + color_marker + ')">' + number_title + '</div>'
                                })
                            }).addTo(map);
                        }
                    });
                });
                // L.control.bigImage({position: 'topright'}).addTo(map);
                // html2canvas(document.getElementById("map_podd")).then(function(canvas) {
                //     document.body.appendChild(canvas);
                // });
                var a3Size = {
                    width: 1100,
                    height: 350,
                    className: 'a3CssClass',
                    tooltip: 'A custom A3 size'
                }
                var printer = L.easyPrint({
                    tileLayer: normalMap,
                    sizeModes: ['Current', 'A4Landscape', 'A4Portrait',a3Size],
                    filename: 'report'+ map_area,
                    exportOnly: true,
                    hideControlContainer: true
                }).addTo(map);
                function manualPrint () {
                    printer.printMap('CurrentSize', 'report'+map_area)
                }
            }
        });

        // var simpleMapScreenshoter = L.simpleMapScreenshoter({
        //     hidden: true
        // }).addTo(map);
        // $('#screenMap').click(function (e) { 
        //     simpleMapScreenshoter.takeScreen('blob', {
        //         caption: function () {
        //             return 'Hello world'
        //         }
        //     }).then(blob => {
        //         saveAs(blob, 'report'+ map_area+'.png');
        //     }).catch(e => {
        //         alert(e.toString());
        //     })
        // });
       
    }
});