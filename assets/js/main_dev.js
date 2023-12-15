$(function () {
    if ($('.map').length > 0) {
        var width_window = $(window).width();
        var zoom_map;
        if (width_window < 1600) {
            zoom_map = 8;
        } else {
            zoom_map = 8;
        }
        $('.aqi .dropdown-item').on('click', function (e) {
            
            var data_index = $(this).attr('data-index');
            var name_index = $(this).html();
            $('.aqi .dropdown-toggle').html('<span class="fade_in_ture"> ' + name_index + ' </span>');
            if(data_index =='th-hr'){
                if($('.cate_th').css('display') == 'none'){
                    $('.cate_us').hide();
                    $('.cate_us_daily').hide();
                    $('.cate_th').show();
                    $('.cate_th_daily').hide();
                }
            }else if(data_index =='th-dy'){
                if($('.cate_th_daily').css('display') == 'none'){
                    $('.cate_us').hide();
                    $('.cate_us_daily').hide();
                    $('.cate_th').hide();
                    $('.cate_th_daily').show();
                }
            }else if(data_index =='us-hr'){
                if($('.cate_us').css('display') == 'none'){
                    $('.cate_us').show();
                    $('.cate_us_daily').hide();
                    $('.cate_th').hide();
                    $('.cate_th_daily').hide();
                }
            }else if(data_index =='us-dy'){
                if($('.cate_us_daily').css('display') == 'none'){
                    $('.cate_us').hide();
                    $('.cate_us_daily').show();
                    $('.cate_th').hide();
                    $('.cate_th_daily').hide();
                }
            }
            $('.aqi .dropdown-item').removeClass('active');
            $(this).addClass('active');
            $('#popupDetail').hide();
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        var map = L.map('us_map', {
            layers: [normalMap],
            attributionControl: false
        });
        L.control.layers(baseLayers).addTo(map);

        map.createPane('labels');
        map.getPane('labels').style.zIndex = 650;
        map.getPane('labels').style.pointerEvents = 'none';
        map.setView({
            lat: 15.75199675,
            lng: 99.7891098
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

        const ar_indoor = [5569, 5570, 5571, 5572, 5573, 6436, 6438 , 6439, 6440, 6441, 6442, 6443, 6444, 6445, 6446, 6447, 6448, 6307, 6308, 6309, 6311, 6312, 6313, 6314, 6316, 6317, 6318, 6319, 6320, 6449, 6450, 6451, 6453, 6455, 6456, 6457, 6458, 6460, 6461, 6462, 6463, 6464, 6466, 6467, 6322, 6323, 6324, 6325, 6326, 6327, 6327, 6329, 6330, 6331];
        $.getJSON("https://www-old.cmuccdc.org/api2/dustboy/hpc3", function (db) {
            if (db) {
                $.each(db, function (index, value) {
                    // if(value.source_name=='DustBoy'){
                        var marker = {};
                        var number_title,color_marker,title_en,title,dustboy_icon,chk_safety;
                        //////////////////////////////////////////////////////////////
                        chk_safety = 0;
                        chk_indoor = 0;
                        number_title = Math.floor(parseFloat(value.pm25));
                        color_marker = value.us_color;
                        title_en = value.us_title_en;
                        title = value.us_title;
                        dustboy_icon = value.us_dustboy_icon;
                        //////////////////////////////////////////////////////////////
                        if($.inArray(parseInt(value.id), ar_indoor) != -1) {
                            marker = L.marker([value.dustboy_lat, value.dustboy_lon], {
                                icon: L.divIcon({
                                    className: "custom_marker",
                                    iconSize: [35, 35], 
                                    iconAnchor: [0, 0],
                                    labelAnchor: [-6, 0],
                                    popupAnchor: [17, 0],
                                    html: '<div class="custom_marker slit_in_vertical anime_delay075" style="background-color:rgba(' + color_marker + ')">' + number_title + '</div>'
                                })
                            }).addTo(map);
                            marker.on('click', function (e) {
                                var lang = Cookies.get("lang_cookie");
                                //time
                                if (lang == 'EN') {
                                    moment.locale('en');
                                    var time_date = moment(value.log_datetime).format('ll');
                                    var time_time = moment(value.log_datetime).format('LT');
                                } else {
                                    moment.locale('th');
                                    var time_date = moment(value.log_datetime).format('ll');
                                    var time_time = moment(value.log_datetime).format('LT') + ' น.';
                                }
                                // $('.time').html('<i class="far fa-calendar-alt"></i> ' + time_date + ' | <i class="far fa-clock"></i> ' + time_time);
                                // data-toggle="modal" data-target="#exampleModal"
                                // $('.prophecy').html('<a class="float-left" onclick="chart_forcast('+value.id+',\'us\',\''+ value.dustboy_name +'\');" style="color:#fff;"><i class="fas fa-cloud-sun"></i></a>');
                                $('.time').html('<span class=""><i class="far fa-calendar-alt"></i> ' + time_date + ' | <i class="far fa-clock"></i> ' + time_time +'</span>');
                                $('.info').html('<a class="float-right" href="https://www.cmuccdc.org/'+ value.dustboy_uri +'" style="color:#fff;" target="_blank"><i class="fas fa-info-circle"></i></a>');
                                //lang
                                if (lang == 'EN') {
                                    $('#popupDetail .card-header p').html(value.dustboy_name_en);
                                    $('#popupDetail .detail_title').html(title_en);
                                } else {
                                    $('#popupDetail .card-header p').html(value.dustboy_name);
                                    $('#popupDetail .detail_title').html(title);
                                }
                                //info-nomal
                                $('#popupDetail .number_title').html(number_title);
                                $('#popupDetail .number_footer').html('μg/m<sup>3</sup>');
                                $('#popupDetail .card-header').css("background-color", "rgba(" + color_marker + ")");
                                $('#popupDetail .card-body').css("background-color", "rgba(" + color_marker + ")");
                                $('#popupDetail .card-footer').css("background-color", "rgba(" + color_marker + ")");
                                // if (category == 'us-hr'||category == 'us-dy') {
                                    if(dustboy_icon == 'us-dust-boy-01') dustboy_icon = 'us-dust-boy-01';
                                    else if(dustboy_icon == 'us-dust-boy-02') dustboy_icon = 'us-dust-boy-02';
                                    else if(dustboy_icon == 'us-dust-boy-03') dustboy_icon = 'us-dust-boy-03';
                                    else if(dustboy_icon == 'us-dust-boy-04') dustboy_icon = 'us-dust-boy-04';
                                    else if(dustboy_icon == 'us-dust-boy-05') dustboy_icon = 'us-dust-boy-05';
                                    else if(dustboy_icon == 'us-dust-boy-06') dustboy_icon = 'us-dust-boy-06';
                                // }else if(category == 'th-hr'||category == 'th-dy'){
                                //     if(marker_icon == 'th-dust-boy-01') marker_icon = 'th-dust-boy-01.8da76418';
                                //     else if(marker_icon == 'th-dust-boy-02') marker_icon = 'th-dust-boy-02.79cc61b5';
                                //     else if(marker_icon == 'th-dust-boy-03') marker_icon = 'th-dust-boy-03.3c43a928';
                                //     else if(marker_icon == 'th-dust-boy-04') marker_icon = 'th-dust-boy-04.db9e51ae';
                                //     else if(marker_icon == 'th-dust-boy-05') marker_icon = 'th-dust-boy-05.363a1424';
                                // }
                                // $('#popupDetail .card-body .anime img').attr("src", 'https://dev2.cmuccdc.org/template/image/' + dustboy_icon + '.svg');
                                $('#popupDetail .card-body .anime img').attr("src", 'https://pm2_5.nrct.go.th/template/image/' + dustboy_icon + '.svg');
                                $('#popupDetail').show();
                            });
                        }
                        //category
                        $('.aqi .dropdown-item').on('click', function (e) {
                            var category = $(this).attr('data-index');
                                var number_title,footeraqi;
                                
                                //hr/dy
                                if(category == 'th-hr'|| category == 'us-hr'){
                                    number_title = Math.floor(parseFloat(value.pm25));
                                    footer25 = value.pm25;
                                }else{
                                    number_title = Math.floor(parseFloat(value.daily_pm25));
                                    footer25 = value.daily_pm25;
                                    if(category == 'th-dy') footeraqi = value.daily_pm25_th_aqi;
                                    else footeraqi = value.daily_pm25_us_aqi;
                                }
                                var marker_color,marker_icon,forecast_aqi;
                                if (category == 'th-hr') {
                                    marker_color = value.th_color;
                                    marker_icon  = value.th_dustboy_icon
                                    forecast_aqi = 'th'
                                } else if (category == 'th-dy'){
                                    marker_color = value.daily_th_color;
                                    marker_icon  = value.daily_th_dustboy_icon
                                    forecast_aqi = 'th'
                                } else if (category == 'us-hr'){
                                    marker_color = value.us_color;
                                    marker_icon  = value.us_dustboy_icon
                                    forecast_aqi = 'us'
                                } else if (category == 'us-dy'){
                                    marker_color = value.daily_us_color;
                                    marker_icon  = value.daily_us_dustboy_icon
                                    forecast_aqi = 'us'
                                }
                                map.removeLayer(marker);
                                if($.inArray(parseInt(value.id), ar_indoor) != -1) {
                                    if(category=='th-hr'||category=='us-hr')
                                    {
                                        marker = L.marker([value.dustboy_lat, value.dustboy_lon], {
                                            icon: L.divIcon({
                                                className: "custom_marker",
                                                iconSize: [35, 35],
                                                iconAnchor: [0, 0],
                                                labelAnchor: [-6, 0],
                                                popupAnchor: [17, 0],
                                                html: '<div class="custom_marker slit_in_vertical" style="background-color:rgba(' + marker_color + ')">' + number_title + '</div>'
                                            })
                                        }).addTo(map);
                                    }
                                    else if(category=='th-dy'||category=='us-dy')
                                    {
                                        // if(value.source_name == 'DustBoy')
                                        // {
                                            marker = L.marker([value.dustboy_lat, value.dustboy_lon], {
                                                icon: L.divIcon({
                                                    className: "custom_marker",
                                                    iconSize: [35, 35],
                                                    iconAnchor: [0, 0],
                                                    labelAnchor: [-6, 0],
                                                    popupAnchor: [17, 0],
                                                    html: '<div class="custom_marker slit_in_vertical" style="background-color:rgba(' + marker_color + ')">' + number_title + '</div>'
                                                })
                                            }).addTo(map);
                                        // }
                                    }
                                    marker.on('click', function (e) {
                                        var lang = Cookies.get("lang_cookie");
                                        //pm2.5/TH AQI
                                        var lang = Cookies.get("lang_cookie");
                                        if (lang == 'EN') {
                                            moment.locale('en');
                                            var time_date = moment(value.log_datetime).format('ll');
                                            var time_time = moment(value.log_datetime).format('LT');
                                        } else {
                                            moment.locale('th');
                                            var time_date = moment(value.log_datetime).format('ll');
                                            var time_time = moment(value.log_datetime).format('LT') + ' น.';
                                        }
                                        // $('.time').html('<i class="far fa-calendar-alt"></i> ' + time_date + ' | <i class="far fa-clock"></i> ' + time_time);
                                        $('.prophecy').html('<a class="float-left" onclick="chart_forcast('+value.id+',\''+forecast_aqi+'\',\''+ value.dustboy_name +'\');" style="color:#fff;"><i class="fas fa-cloud-sun"></i></a>');
                                        $('.time').html('<span class=""><i class="far fa-calendar-alt"></i> ' + time_date + ' | <i class="far fa-clock"></i> ' + time_time +'</span>');
                                        $('.info').html('<a class="float-right" href="https://www.cmuccdc.org/'+ value.dustboy_uri +'" style="color:#fff;" target="_blank"><i class="fas fa-info-circle"></i></a>');
                                        //pm2.5/US AQI
                                        if (lang == 'EN') {
                                            $('#popupDetail .card-header p').html(value.dustboy_name_en);
                                            if (category == 'th-hr') {
                                                $('#popupDetail .detail_title').html(value.th_title_en);
                                            }else if (category == 'th-dy'){
                                                $('#popupDetail .detail_title').html(value.daily_th_title_en);
                                            }else if (category == 'us-hr'){
                                                $('#popupDetail .detail_title').html(value.us_title_en);
                                            }else if (category == 'us-dy'){
                                                $('#popupDetail .detail_title').html(value.daily_us_title_en);
                                            }
                                        } else {
                                            $('#popupDetail .card-header p').html(value.dustboy_name);
                                            if (category == 'th-hr') {
                                                $('#popupDetail .detail_title').html(value.th_title);
                                            }else if (category == 'th-dy'){
                                                $('#popupDetail .detail_title').html(value.daily_th_title);
                                            }else if (category == 'us-hr'){
                                                $('#popupDetail .detail_title').html(value.us_title);
                                            }else if (category == 'us-dy'){
                                                $('#popupDetail .detail_title').html(value.daily_us_title);
                                            }
                                        }
                                        $('#popupDetail .number_title').html(number_title);
                                        $('#popupDetail .number_footer').html('μg/m<sup>3</sup>');
                                        $('#popupDetail .card-header').css("background-color", "rgba(" + marker_color + ")");
                                        $('#popupDetail .card-body').css("background-color", "rgba(" + marker_color + ")");
                                        $('#popupDetail .card-footer').css("background-color", "rgba(" + marker_color + ")");
                                        if (category == 'us-hr'||category == 'us-dy') {
                                            if(marker_icon == 'us-dust-boy-01') marker_icon = 'us-dust-boy-01';
                                            else if(marker_icon == 'us-dust-boy-02') marker_icon = 'us-dust-boy-02';
                                            else if(marker_icon == 'us-dust-boy-03') marker_icon = 'us-dust-boy-03';
                                            else if(marker_icon == 'us-dust-boy-04') marker_icon = 'us-dust-boy-04';
                                            else if(marker_icon == 'us-dust-boy-05') marker_icon = 'us-dust-boy-05';
                                            else if(marker_icon == 'us-dust-boy-06') marker_icon = 'us-dust-boy-06';
                                        }else if(category == 'th-hr'||category == 'th-dy'){
                                            if(marker_icon == 'th-dust-boy-01') marker_icon = 'th-dust-boy-01';
                                            else if(marker_icon == 'th-dust-boy-02') marker_icon = 'th-dust-boy-02';
                                            else if(marker_icon == 'th-dust-boy-03') marker_icon = 'th-dust-boy-03';
                                            else if(marker_icon == 'th-dust-boy-04') marker_icon = 'th-dust-boy-04';
                                            else if(marker_icon == 'th-dust-boy-05') marker_icon = 'th-dust-boy-05';
                                        }
                                        // $('#popupDetail .card-body .anime img').attr("src", 'https://dev2.cmuccdc.org/template/image/' + marker_icon + '.svg');
                                        $('#popupDetail .card-body .anime img').attr("src", 'https://pm2_5.nrct.go.th/template/image/' + marker_icon + '.svg');
                                        if(category == 'th-dy'|| category == 'us-dy'){
                                            $('#popupDetail .card-footer .foot_aqi').html("PM<sub>2.5</sub> AQI " + footeraqi);
                                            $('#popupDetail .card-footer .foot_aqi').show();
                                        }else{
                                            $('#popupDetail .card-footer .foot_aqi').hide();
                                        }
                                        $('#popupDetail').show();
                                    });
                                }

                                
                        });
                });
                $('.aqi .dropdown-toggle.disabled').removeClass('disabled');
            }
        });
        // polygon map
        var geo = L.geoJson({
            features: []
        }).addTo(map);
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        $('[data-toggle="tooltip"]').tooltip();
    }
});

function chart_forcast(id,aqi,name)
{
    moment.locale('th'); 
    fetch('https://www-old.cmuccdc.org/api2/dustboy/forecast/'+id).then(function (response) {return response.json();})
    .then(function (data) {
        $('.card_title').html('<small>พยากรณ์ค่าฝุ่น PM<sub>2.5</sub></small><br>'+name);
        $('.col_forecast').html('');
        const data_forcast=[],label_forcast=[],color_forcast=[];
        var index_data=0;
        if(data.forecast_days.length != 0){
            $.each(data.forecast_days, function (i, value1) { 
                if(i>0&&value1.length != 0){
                    // var html = '<div class="card_forecast card_forecast_'+(i)+' card shadow"><div class="title row m-0"><div class="col-3 d-flex justify-content-end align-items-center"><img class="anime_forecast anime_forecast_'+(i)+' shadow-drop-bottom" alt="pm2.5_icon" src=""></div><div class="col-9 d-flex flex-column justify-content-center align-items-center"><div class="date_forecast date_forecast_'+(i)+'"></div><div class="pm25_forecast pm25_forecast_'+(i)+'"></div></div></div><div class="chart"><canvas id="chart_forcast_'+(i)+'" class="px-1"></canvas></div></div>';
                    var html = '<div class="card_forecast card_forecast_'+(i)+' card" style="background-color: rgba('+ (aqi=='us'?value1.day_us_color:value1.day_us_color) +')"><div class="title row m-0"><div class="col-4 col-lg-5 d-flex justify-content-center align-items-center"><img class="anime_forecast anime_forecast_'+(i)+' " alt="pm2.5_icon" src=""></div><div class="col-8 col-lg-7 d-flex flex-column justify-content-center align-items-center"><div class="date_forecast date_forecast_'+(i)+'"></div><div class="pm25_forecast pm25_forecast_'+(i)+'"></div><div class="detail_forecast detail_forecast_'+(i)+'"></div></div></div></div>';
                    $('.col_forecast').append(html);
                    if(aqi == 'us'){
                        if(value1.day_us_icon == 'us-dust-boy-01') dustboy_icon = 'us-dust-boy-01';
                        else if(value1.day_us_icon == 'us-dust-boy-02') dustboy_icon = 'us-dust-boy-02';
                        else if(value1.day_us_icon == 'us-dust-boy-03') dustboy_icon = 'us-dust-boy-03';
                        else if(value1.day_us_icon == 'us-dust-boy-04') dustboy_icon = 'us-dust-boy-04';
                        else if(value1.day_us_icon == 'us-dust-boy-05') dustboy_icon = 'us-dust-boy-05';
                        else if(value1.day_us_icon == 'us-dust-boy-06') dustboy_icon = 'us-dust-boy-06';
                        color = value1.day_us_color;
                    }else{
                        if(value1.day_th_icon == 'th-dust-boy-01') dustboy_icon = 'th-dust-boy-01';
                        else if(value1.day_th_icon == 'th-dust-boy-02') dustboy_icon = 'th-dust-boy-02';
                        else if(value1.day_th_icon == 'th-dust-boy-03') dustboy_icon = 'th-dust-boy-03';
                        else if(value1.day_th_icon == 'th-dust-boy-04') dustboy_icon = 'th-dust-boy-04';
                        else if(value1.day_th_icon == 'th-dust-boy-05') dustboy_icon = 'th-dust-boy-05';
                        color = value1.day_th_color;
                    }
                    $('.anime_forecast_'+(i)).attr('src','https://pm2_5.nrct.go.th/template/image/'+ dustboy_icon +'.svg');
                    // $('.card_forecast_'+(i+1)).css("background-color", "rgba(" + color + ",0.75)");
                    $('.date_forecast_'+(i)).html('วัน'+moment(value1.day_date).format('ddd'));
                    var pm25_forecast = 'ไม่ทราบค่า';
                    if(aqi=='us'){
                        if(value1.day_avg_pm25<13)
                            pm25_forecast = 'คุณภาพอากาศดี';
                        else if(value1.day_avg_pm25>=13&&value1.day_avg_pm25<36)
                            pm25_forecast = 'คุณภาพอากาศปานกลาง';
                        else if(value1.day_avg_pm25>=36&&value1.day_avg_pm25<56)
                            pm25_forecast = 'คุณภาพอากาศไม่ดีต่อกลุ่มเสี่ยง';
                        else if(value1.day_avg_pm25>=56&&value1.day_avg_pm25<151)
                            pm25_forecast = 'คุณภาพอากาศไม่ดี';
                        else if(value1.day_avg_pm25>=151&&value1.day_avg_pm25<251)
                            pm25_forecast = 'คุณภาพอากาศไม่ดีอย่างยิ่ง';
                        else
                            pm25_forecast = 'คุณภาพอากาศอันตราย';
                    }else{
                        if(value1.day_avg_pm25<26)
                            pm25_forecast = 'คุณภาพอากาศดีมาก';
                        else if(value1.day_avg_pm25>=26&&value1.day_avg_pm25<38)
                            pm25_forecast = 'คุณภาพอากาศดี';
                        else if(value1.day_avg_pm25>=38&&value1.day_avg_pm25<51)
                            pm25_forecast = 'คุณภาพอากาศปานกลาง';
                        else if(value1.day_avg_pm25>=51&&value1.day_avg_pm25<90)
                            pm25_forecast = 'คุณภาพอากาศไม่ดี';
                        else
                            pm25_forecast = 'คุณภาพอากาศไม่ดีอย่างยิ่ง';
                    }
                    // $('.pm25_forecast_'+(i)).html("<small class=''>PM<sub>2.5</sub>เฉลี่ย :</small> <b>"+value1.day_avg_pm25+"</b> <small>(μg/m3)</small>");
                    $('.pm25_forecast_'+(i)).html(pm25_forecast);
                    $('.detail_forecast_'+(i)).html("PM<sub>2.5</sub>เฉลี่ย : "+value1.day_avg_pm25+" (μg/m3)");
                    data_forcast[i] = [],label_forcast[i] = [],color_forcast[i] = [];
                    $.each(value1.forecast_hours, function (j, value2) { 
                        data_forcast[i][j] = value2.hour_avg_pm25;
                        label_forcast[i][j] = value2.time;
                        color_forcast[i][j] = aqi=='us'?'rgb('+ value2.hour_us_color +')':'rgb('+ value2.hour_th_color +')'; 
                    });
                    index_data++;
                }
            });
            $('#prophecy-modal').modal('show');
        }
    });
}
