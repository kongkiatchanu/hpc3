$(function () {
    var width_window = $(window).width();
    var zoom_map;
    if (width_window <= 575.98) {
        zoom_map = 18;
    } else {
        zoom_map = 18;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    var location_lat;
    var location_lng;

    function showPosition(position) {
        location_lat = position.coords.latitude != null ? position.coords.latitude : 16.5712112;
        location_lng = position.coords.longitude != null ? position.coords.longitude : 104.5077552;
        var normalMap = L.tileLayer.ThaiProvider('Google.Normal.Map', {
                maxZoom: 18,
                minZoom: 5
            }),
            satelliteMap = L.tileLayer.ThaiProvider('Google.Satellite.Map', {
                maxZoom: 18,
                minZoom: 5
            });
        var baseLayers = {
            "Normal map": normalMap,
            "Satellite map": satelliteMap,
        }
        var map = L.map('pm25_nearby_map', {
            layers: [normalMap],
            attributionControl: false
        });
        L.control.layers(baseLayers).addTo(map);
        map.createPane('labels');
        map.getPane('labels').style.zIndex = 650;
        map.getPane('labels').style.pointerEvents = 'none';
        map.setView({
            lat: location_lat,
            lng: location_lng
        }, zoom_map);
        //Locate
        var lc = L.control.locate({
            position: "topleft",
            strings: {
                title: "My location"
            },
            locateOptions: {
                enableHighAccuracy: true
            }
            // drawCircle: false
        }).addTo(map);
        lc.start();
        var circle = L.circle([location_lat, location_lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 1000
        }).addTo(map);

        //marker and table
        $('.spinkit-loading').removeClass('d-none');
        $('.spinkit-loading').addClass('d-flex');
        getjson(null,'us');
        $('#main .main_detail .category button').click(function (e) {
            var data_category = $(this).attr('data-category');
            var data_index = $('.cate_aqi .dropdown-item.active').attr('data-index');
            var url;
            if (data_category == '2') {
                url = 'https://www-old.cmuccdc.org/api2/dustboy/cmu?v=1';
            } else {
                url = 'https://www-old.cmuccdc.org/api2/dustboy/dustboystations?v=1';
            }
            $('#main .main_detail .category button').removeClass('active');
            $(this).addClass('active');
            $('.spinkit-loading').removeClass('d-none');
            $('.spinkit-loading').addClass('d-flex');
            if (data_index == 'th') getjson(url, 'th');
            else getjson(url, 'us');
        });
        $('.cate_aqi .dropdown-item').on('click', function (e) {
            var data_index = $(this).attr('data-index');
            var name_index = $(this).html();
            $('.cate_aqi .dropdown-toggle').html('<span class="fade_in_ture"> ' + name_index + ' </span>');
            var data_category = $('#main .main_detail .category button.active').attr('data-category');
            var url;
            if (data_category == '2') {
                url = 'https://www-old.cmuccdc.org/api2/dustboy/cmu?v=1';
            } else {
                url = 'https://www-old.cmuccdc.org/api2/dustboy/dustboystations?v=1';
            }
            if (data_index == 'th') {
                if ($('.cate_th').css('display') == 'none') {
                    $('.cate_us').hide();
                    $('.cate_th').show();
                }
                if (url) getjson(url, 'th');
                else getjson(null, 'th');
            } else {
                if ($('.cate_us').css('display') == 'none') {
                    $('.cate_th').hide();
                    $('.cate_us').show();
                }
                if (url) getjson(url, 'us');
                else getjson(null, 'us');
            }
            $('.cate_aqi .dropdown-item').removeClass('active');
            $(this).addClass('active');
        });
        //gps_distance
        function gps_distance(lat1, lon1, lat2, lon2) {
            if (typeof (Number.prototype.toRad) === "undefined") {
                Number.prototype.toRad = function () {
                    return this * Math.PI / 180;
                }
            }
            var R = 6371; // km
            var dLat = (lat2 - lat1).toRad();
            var dLon = (lon2 - lon1).toRad();
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(parseFloat(lat2).toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var distance = R * c;
            return parseFloat(distance);
        }

        function getjson(url, index) {
            var data_url;
            if (!url) {
                data_url = 'https://www-old.cmuccdc.org/api2/dustboy/cmu?v=1';
            } else {
                data_url = url;
            }
            $.getJSON(data_url, function (db) {
                if (db) {
                    var table = $('#table_pm25_nearby').DataTable();
                    var lang = Cookies.get("lang_cookie");
                    if (lang == 'EN') {
                        moment.locale('en');
                        var time_date = moment(db[0]['log_datetime']).format('ll');
                        var time_time = moment(db[0]['log_datetime']).format('LT');
                    } else {
                        moment.locale('th');
                        var time_date = moment(db[0]['log_datetime']).format('ll');
                        var time_time = moment(db[0]['log_datetime']).format('LT') + ' น.';
                    }
                    $('.time').html('<i class="far fa-calendar-alt"></i> ' + time_date + ' | <i class="far fa-clock"></i> ' + time_time);
                    table.destroy();
                    $('.spinkit-loading').removeClass('d-flex');
                    $('.spinkit-loading').addClass('d-none');
                    //marker
                    var db_gps = [{}];
                    var index_aqi = index;
                    $.each(db, function (index, value) {
                        // if(value.source_name=='DustBoy'){
                            var marker = {};
                            var color_marker = index_aqi == 'us' ? value.us_color : value.th_color;
                            map.removeLayer(marker);
                            marker = L.marker([value.dustboy_lat, value.dustboy_lon], {
                                icon: L.divIcon({
                                    className: "custom_marker",
                                    iconSize: [35, 35],
                                    iconAnchor: [0, 0],
                                    labelAnchor: [-6, 0],
                                    popupAnchor: [17, 0],
                                    html: '<div class="custom_marker slit_in_vertical anime_delay05" style="background-color:rgba(' + color_marker + ');">' + Math.floor(parseFloat(value.pm25)) + '</div>'
                                })
                            }).addTo(map);
                            if (lang == 'EN') {
                                var dustboy_name = value.dustboy_name_en;
                                var radius = 'Within 1 km radius';
                            } else {
                                var dustboy_name = value.dustboy_name;
                                var radius = 'รัศมี 1 กิโลเมตร';
                            }
                            marker.bindPopup('<p class="m-0 text-center"> ' + dustboy_name + ' </p><p class="m-0 text-center"> PM<sub>2.5</sub> : <b>' + value.pm25 + '</b> μg/m<sup>3</sup></p>');
                            circle.bindPopup(radius);
                            //table_gps
                            var distance = gps_distance(location_lat, location_lng, value.dustboy_lat, value.dustboy_lon);
                            db[index].distance = distance;
                            db_gps[index] = db[index];
                        // }
                    });
                    console.log(db_gps);
                    //table
                    table = $('#table_pm25_nearby').DataTable({
                        "lengthMenu": [
                            [10, 20, 50, -1],
                            [10, 20, 50, "All"]
                        ],
                        data: db_gps,
                        columns: [{
                                data: 'dustboy_name'
                            },
                            {
                                data: 'distance',
                            },
                            {
                                data: 'pm25',
                            }
                        ],
                        columnDefs: [{
                                targets: 0,
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('width', '70%');
                                    if (!document.cookie == 'lang_cookie=TH' || !document.cookie == 'lang_cookie=EN') {
                                        $(td).html('<a class="dustboy_uri" href="https://www.cmuccdc.org/' + rowData.dustboy_uri + '" target="_blank"><span class="pl-3">' + rowData.dustboy_name + '</span></a>');
                                    } else {
                                        if (Cookies.get('lang_cookie') == 'EN') {
                                            $(td).html('<a class="dustboy_uri" href="https://www.cmuccdc.org/' + rowData.dustboy_uri + '" target="_blank"><span class="pl-3">' + rowData.dustboy_name_en + '</span></a>');
                                        } else {
                                            $(td).html('<a class="dustboy_uri" href="https://www.cmuccdc.org/' + rowData.dustboy_uri + '" target="_blank"><span class="pl-3">' + rowData.dustboy_name + '</span></a>');
                                        }
                                    }
                                }
                            }, 
                            {
                                targets: 1,
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).html('<a class="font-weight-bold p-1" style="width: 4vw; font-size:14px;"> ' + rowData.distance.toFixed(3) + ' </a>');
                                    $(td).addClass('text-center');
                                }
                            },
                            {
                                targets: 2,
                                createdCell: function (td, cellData, rowData, row, col) {
                                    var color_table = index == 'us' ? rowData.us_color : rowData.th_color;
                                    $(td).html('<a class="font-weight-bold badge badge-pill p-1 w-sm slit_in_vertical_table" style="width: 4vw; font-size:14px; background-color:rgba(' + color_table + ')";> ' + rowData.pm25 + ' </a>');
                                    $(td).addClass('text-center');
                                }
                            }
                        ],
                        "order": [
                            [1, 'asc']
                        ]
                    });
                }
                $('#table_pm25_nearby').show();
            });
        }

        //polygon map
        // var geo = L.geoJson({
        //     features: []
        // }).addTo(map);
        // var cmu_all = 'assets/map/cmu/cmu_all.zip';
        // shp(cmu_all).then(function (data) {
        //     geo.addData(data);
        // });
    }
});