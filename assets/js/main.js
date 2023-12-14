$(function () {
    if ($('.map').length > 0) {
        var width_window = $(window).width();
        var zoom_map;
        if (width_window < 1600) {
            zoom_map = 13;
        } else {
            zoom_map = 13;
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
            lat: 18.7804223,
            lng: 98.9535746
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
        $.getJSON("https://www-old.cmuccdc.org/api2/dustboy/dustboystations?v=1", function (db) {
            if (db) {
                $.each(db, function (index, value) {
                    // if(value.source_name=='DustBoy'){
                        var marker = {};
                        var number_title,color_marker,title_en,title,dustboy_icon,chk_safety;
                        //////////////////////////////////////////////////////////////
                        chk_safety = 0;
                        number_title = Math.floor(parseFloat(value.pm25));
                        color_marker = value.us_color;
                        title_en = value.us_title_en;
                        title = value.us_title;
                        dustboy_icon = value.us_dustboy_icon;
                        //////////////////////////////////////////////////////////////
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
                            $('.prophecy').html('<a class="float-left" onclick="chart_forcast('+value.id+',\'us\',\''+ value.dustboy_name +'\');" style="color:#fff;"><i class="fas fa-cloud-sun"></i></a>');
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
                                    if(value.source_name == 'DustBoy')
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
                        });
                        //safety
                        $('.safety-button').on('click', function () {
                            $('#popupDetail').hide();
                            $('.aqi .dropdown-toggle').html('<span class="fade_in_ture"> Us (Hourly) </span>');
                            $('.aqi .dropdown-item.active').removeClass('active');
                            $('.aqi .dropdown-item[data-index="us-hr"]').addClass('active');
                            map.removeLayer(marker);
                            if(chk_safety==0){
                                chk_safety = 1;
                            }else{
                                $('#popupDetail .number').show();
                                $('#popupDetail .anime').show();
                                $('#popupDetail .anime img').show();
                                $('#popupDetail .detail').show();
                                $('#popupDetail .card-body .table').hide();
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
                                    $('.time').html('<span class="float-left"><i class="far fa-calendar-alt"></i> ' + time_date + ' | <i class="far fa-clock"></i> ' + time_time +'</span>');
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
                                    if(dustboy_icon == 'us-dust-boy-01') dustboy_icon = 'us-dust-boy-01';
                                    else if(dustboy_icon == 'us-dust-boy-02') dustboy_icon = 'us-dust-boy-02';
                                    else if(dustboy_icon == 'us-dust-boy-03') dustboy_icon = 'us-dust-boy-03';
                                    else if(dustboy_icon == 'us-dust-boy-04') dustboy_icon = 'us-dust-boy-04';
                                    else if(dustboy_icon == 'us-dust-boy-05') dustboy_icon = 'us-dust-boy-05';
                                    else if(dustboy_icon == 'us-dust-boy-06') dustboy_icon = 'us-dust-boy-06';
                                    $('#popupDetail .card-body .anime img').attr("src", 'https://pm2_5.nrct.go.th/template/image/' + dustboy_icon + '.svg');
                                    // $('#popupDetail .card-body .anime img').attr("src", 'https://dev2.cmuccdc.org/template/image/' + dustboy_icon + '.svg');
                                    $('#popupDetail').show();
                                });
                                chk_safety = 0;
                            }
                        });
                    // }
                });
                $('.safety-button').show();
                $('.aqi .dropdown-toggle.disabled').removeClass('disabled');
                $('.safety-button').show();
            }
        });
        // polygon map
        var geo = L.geoJson({
            features: []
        }).addTo(map);
        var cmu_all = 'assets/map/cmu/cmu_all.zip';
        shp(cmu_all).then(function (data) {
            geo.addData(data);
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        $('[data-toggle="tooltip"]').tooltip();
        // safety
        var safety_data = [
            ['งานบริหารทั่วไป','สถาบันวิจัยวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยเชียงใหม่',  '2', '<p>1.ห้องทำงานสำนักงานเลขานุการสถาบันฯ &nbsp; ชั้น 1 </p><p>2. ห้องพักนักวิจัยชั้น 2 อาคารสถาบันฯ<br></p>', '18.794836', '98.957646'],
            ['สำนักงานสภาพนักงาน','สำนักงานมหาวิทยาลัย',  '1', '<p>อาคารกองอาคารและสาธารปณูปโภค ห้องสำนักงานสภาพนักงาน</p>', '', ''],
            ['ศูนย์นวัตกรรมอาหารและบรรจุภัณฑ์','',  '11', '<p>ศูนย์นวัตกรรมอาหารและบรรจุภัณฑ์ ชั้น 3 อาคารสำนักงานคณะอุตสาหกรรมเกษตร</p>', '18.7604796', '98.9355791'],
            ['สถาบันนโยบายสาธารณะ','สถาบันนโยบายสาธารณะ',  '2', '<p>B303, B304 อาคาร B ตึกอุทยานวิทยาศาสตร์ภาคเหนือ</p>', '18.7642073', '98.9349727'],
            ['สถาบันวิจัยวิทยาศาสตร์สุขภาพ ','สถาบันวิจัยวิทยาศาสตร์สุขภาพ มช.',  '', '<p>1.สถาบันฯอาคาร1</br>2.สถาบันฯอาคาร3</br>มีความปลอดภัยทั้ง2อาคาร เนื่องจากมีการติดตั้งเครื่องฟอกอากาศภายใน ทั้ง2อาคาร</p>', '18.7907455', '98.9745112'],
            ['กองอาคารสถานที่และสาธารณูปโภค','สำนักงานมหาวิทยาลัย',  '2', '1 ห้องผู้อำนวยการกอง 2 ห้องประชุมกองอาคารสถานที่และสาธารณูปโภค', '18.803915', '98.955008'],
            ['สถาบันวิศวกรรมชีวการแพทย์','สถาบันวิศวกรรมชีวการแพทย์',  '3', '1. ห้องสำนักงานสถาบันฯ ชั้น 3 อาคารวิจัยและถ่ายทอดเทคโนโลยี คณะวิศวกรรมศาสตร์ 2. ห้องเรียน ชั้น 3 อาคารวิจัยและถ่ายทอดเทคโนโลยี คณะวิศวกรรมศาสตร์ 3. ห้องสำนักงานนักวิจัย ชั้น 4 อาคารวิจัยและถ่ายทอดเทคโนโลยี คณะวิศวกรรมศาสตร์', '18.7955729', '98.9523593'],
            ['วิทยาลัยนานาชาตินวัตกรรมดิจิทัล','วิทยาลัยนานาชาตินวัตกรรมดิจิทัล',  '8', '<p>ICB1102. ICB1202. ICB1203. ICB. 1204. ICB1205. ICB1305. ICB1309. ICB1313</p>', '18.7938426', '98.9672193999999'],
            ['คณะสังคมศาสตร์','สำนักงานคณะสังคมศาสตร์',  '2', '<p>1) ห้องสมุดคณะสังคมศาสตร์ ชั้น 1 อาคาร 1<br>2) ห้องปฏิบัติการคอมพิวเตอร์ ชั้น 3 อาคารปฏิบัติการ<br></p>', '18.8026237306694', '98.9504979945468'],
            // ['สำนักบริการวิชาการ','สำนักงานสำนัก',  '0', '<pไม่มี</p>', '', ''],
            ['คณะการสื่อสารมวลชน','คณะการสื่อสารมวลชน',  '3', '<p>1) ห้อง MCB2101 อาคารเรียนรวม ติดตั้งเครื่องฟอกอากาศ จำนวน 3 เครื่อง<br>2) ห้องโถงชั้น 3 อาคารบริหาร ติดตั้งเครื่องฟอกอากาศ จำนวน 3 เครื่อง<br>3) ห้องโถงชั้น 1 อาคารบริหาร ไม่ได้ติดตั้งเครื่องฟอกอากาศ<br></p>', '18.801503', '98.947508'],
            ['หน่วยอาคารสถานที่และยานพาหนะ','งานบริหารงานทั่วไป คณะเภสัชศาสตร์',  '4', '<p>1.ห้องเฟื่องฟ้า1 อาคาร 1<br>2.ห้องเฟื่องฟ้า2 อาคาร 1<br>3.ห้องเฟื่องฟ้า3 อาคาร 1<br>4.ห้องพัก น.ศ. อาคาร 5<br></p>', '18.7903347', '98.9654527'],
            ['ศูนย์แก้ไขความพิการบนใบหน้าและกะโหลกศีรษะ มูลนิธิเทคโนโลยีสารสนเทศตามพระราชดำริ ฯ มหาวิทยาลัยเชียงใหม่','มหาวิทยาลัยเชียงใหม่',  '4', '<p>ห้องสำนักงานศูนย์แก้ไขความพิการบนใบหน้าและกะโหลกศีรษะฯ 1 ชั้น 2 อาคารตะวันกังวานพงศ์<br>ห้องสำนักงานศูนย์แก้ไขความพิการบนใบหน้าและกะโหลกศีรษะฯ 2 ชั้น 2 อาคารตะวันกังวานพงศ์<br>ห้องสำนักงานศูนย์แก้ไขความพิการบนใบหน้าและกะโหลกศีรษะฯ 3 ชั้น 2 อาคารตะวันกังวานพงศ์<br>ห้องสำนักงานศูนย์แก้ไขความพิการบนใบหน้าและกะโหลกศีรษะฯ 4 ชั้น 2 อาคารตะวันกังวานพงศ์<br></p>', '18.7900413456438', '98.9753231722097'],
            // ['กองคลัง','สำนักงานมหาวิทยาลัย',  '0', '', '', ''],
            // ['สำนักส่งเสริมศิลปวัฒนธรรม มหาวิทยาลัยเชียงใหม่','',  '0', '', '', ''],
            ['ภาควิชาภาษาอังกฤษ','คณะมนุษยศาสตร์',  '5', '<p>ห้อง 01-001 อาคาร HB3<br>ห้อง 01-002 อาคาร HB3<br>ห้อง 01-004 อาคาร HB3<br>ห้อง 01-005 อาคาร HB3<br>ห้อง 01-007 อาคาร HB3<br></p>', '18.8034305024126', '98.9514183617902'],
            ['คณะเศรษฐศาสตร์ มหาวิทยาลัยเชียงใหม่','คณะเศรษฐศาสตร์ มหาวิทยาลัยเชียงใหม่',  '1', '<p>ECB3102 ศูนย์ความเป็นเลิศเศรษฐศาตร์</p>', '18.80173', '98.949067'],
            // ['วิทยาลัยศิลปะ สื่อ เทคโนโลยี มช.','วิทยาลัยศิลปะ สื่อ เทคโนโลยี มช.',  '0', '', '', ''],
            ['กายภาพและสิ่งแวดล้อม','คณะรัฐศาสตร์และรัฐประศาสนศาสตร์',  '9', '<p>1.ห้องสืบค้นข้อมูล อาคาร 50 ปี คณะรัฐศาสตร์<br>2.ห้องอ่านหนังสือ อาคารรัฐศาสตร์<br>3.ห้องเรียน 1204-1207 อาคารรัฐศาสตร์<br>4.ห้องเรียน 1307-1309 อาคารรัฐศาสตร์<br></p>', '18.8031284', '98.9547822'],
            ['อุทยานวิทยาศาสตร์และเทคโนโลยี','มหาวิทยาลัยเชียงใหม่',  '4', '<p>1.Reception Hall อาคาร A<br>2.Exhibition Hall อาคาร B<br>3.The Brick X อาคาร C<br>4.NSP Food Hall and Private Food Hall อาคาร D<br></p>', '18.7641825', '98.9374377'],
            // ['คณะวิทยาศาสตร์ (รวมภาควิชาทั้งหมด ตามรายละเอียด)','คณะวิทยาศาสตร์ (รวมภาควิชาทั้งหมด ตามรายละเอียด)',  '', '<p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}">ภาควิชาวิทยาการคอมพิวเตอร์<br>-ห้องสาขาวิชาเอก ป.ตรี<br>-ห้องสาเอกป.โทและป.เอก<br>-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310</span></p><p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}"><br>ภาควิชาชีววิทยา<br>-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา</span></p><p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}"><br>ภาควิชาฟิสิกส์และวัสดุศาสตร์<br>-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล<br>- ห้องเรียน 24 ห้อง</span></p><p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}"><br>ภาควิชาคณิตศาสตร์ (18 เครื่อง)<br>-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313<br>-อาคาร 45 ปี SCB4301-4305</span></p><p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}"><br>ภาควิชาสถิติ<br>-ห้อง STB 102-103,106-107,305<br>-ห้องพักนักศึกษา ป.ตรี</span></p><p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}"><br>ภาควิชาเคมีอุตสาหกรรม<br>-IMB3302 ห้องอ่านหนังสือ<br>- ห้องเรียน IMB 4401,4403,4406,4408,416</span></p><p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}"><br></span></p><p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}">ภาควิชาธรณีวิทยา<br>-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304<br>-ห้องประชุมปริญญา นุตาลัย GB110<br>-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707</span></p><p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}"><br></span></p><p><span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;ภาควิชาวิทยาการคอมพิวเตอร์ \n-ห้องสาขาวิชาเอก ป.ตรี\n-ห้องสาเอกป.โทและป.เอก\n-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310\n\nภาควิชาชีววิทยา\n-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา\n\nภาควิชาฟิสิกส์และวัสดุศาสตร์\n-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล \n- ห้องเรียน 24 ห้อง\n\nภาควิชาคณิตศาสตร์ (18 เครื่อง)\n-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 \n-อาคาร 45 ปี SCB4301-4305\n\nภาควิชาสถิติ\n-ห้อง STB 102-103,106-107,305\n-ห้องพักนักศึกษา ป.ตรี \n\nภาควิชาเคมีอุตสาหกรรม\n-IMB3302 ห้องอ่านหนังสือ \n- ห้องเรียน IMB 4401,4403,4406,4408,416\n\nภาควิชาธรณีวิทยา\n-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304\n-ห้องประชุมปริญญา นุตาลัย GB110\n-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707\n\n\n\nอาคารกลางคณะวิทยาศาสตร์ \n-อาคาร 30 ปี ชั้น 2  ห้องสมุดคณะวิทยาศาสตร์ \n-อาคาร 40 ปี ห้องสัมนาชั้น 2 \n\n\n&quot;}" data-sheets-userformat="{&quot;2&quot;:957,&quot;3&quot;:{&quot;1&quot;:0},&quot;5&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;12&quot;:0}">อาคารกลางคณะวิทยาศาสตร์<br>-อาคาร 30 ปี ชั้น 2 ห้องสมุดคณะวิทยาศาสตร์<br>-อาคาร 40 ปี ห้องสัมนาชั้น 2<br><br></span></p>', '', ''],"
            ['ภาควิชาวิทยาการคอมพิวเตอร์','คณะวิทยาศาสตร์',  '', 'ภาควิชาวิทยาการคอมพิวเตอร์ <br>-ห้องสาขาวิชาเอก ป.ตรี<br>-ห้องสาเอกป.โทและป.เอก<br>-ห้องเรียน CSB 201-204,207,209-210,301-303,307-310', '18.803806', '98.95252'],
            ['ภาควิชาชีววิทยา','คณะวิทยาศาสตร์',  '', 'ภาควิชาชีววิทยา <br>-ห้องประชุม 1 ชั้น 4 อาคารชีววิทยา', '18.802533', '98.953076'],
            ['ภาควิชาฟิสิกส์และวัสดุศาสตร์','คณะวิทยาศาสตร์',  '', 'ภาควิชาฟิสิกส์และวัสดุศาสตร์ <br>-ห้องอ่านหนังสือชั้น 2 อาคารโรงงานกล <br>- ห้องเรียน 24 ห้อง', '18.801389', '98.955598'],
            ['ภาควิชาคณิตศาสตร์','คณะวิทยาศาสตร์',  '', 'ภาควิชาคณิตศาสตร์ (18 เครื่อง) <br>-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 <br>-อาคาร 45 ปี SCB4301-4305วิชาคณิตศาสตร์ (18 เครื่อง)<br>-อาคารคณิตศาสตร์ 2 ห้อง MB2111-2113,2211-2212, 2312-2313 <br>-อาคาร 45 ปี SCB4301-4305', '18.80346', '98.953649'],
            ['ภาควิชาสถิติ','คณะวิทยาศาสตร์',  '', 'ภาควิชาสถิติ <br>-ห้อง STB 102-103,106-107,305 <br>-ห้องพักนักศึกษา ป.ตรี', '18.802905', '98.954062'],
            ['ภาควิชาเคมีอุตสาหกรรม','คณะวิทยาศาสตร์',  '', 'ภาควิชาเคมีอุตสาหกรรม <br>-IMB3302 ห้องอ่านหนังสือ <br>- ห้องเรียน IMB 4401,4403,4406,4408,416', '18.80301', '98.956971'],
            ['ภาควิชาธรณีวิทยา','คณะวิทยาศาสตร์',  '', 'ภาควิชาธรณีวิทยา <br>-ห้องพักบัณฑิตศึกษา GB1003-1004 SCB 4304 <br>-ห้องประชุมปริญญา นุตาลัย GB110 <br>-ห้องสัมนาและการออกแบบเครื่องประดับ SCB3707 <br>-ห้องประชุม 1 ภาควิชาธรณีวิทยา GB115 (บุคลากร)', '18.803104', '98.952179'],
            ['คณะวิทยาศาสตร์ (อาคาร 30 ปี)','คณะวิทยาศาสตร์',  '', 'อาคาร 30 ปี ชั้น 2 ห้องสมุดคณะวิทยาศาสตร์', '18.801539', '98.953353'],
            ['คณะวิทยาศาสตร์ (อาคาร 40 ปี)','คณะวิทยาศาสตร์',  '', 'อาคาร 40 ปี ห้องสัมนาชั้น 2', '18.801602', '98.95607'],
            // ['กองวิเทศสัมพันธ์','สำนักงานมหาวิทยาลัย',  '0', '', '', ''],
            ['แขนงจุลชีววิทยาคลินิก','เทคนิคการแพทย์ มช.',  '2', '<p>06-003 ห้องสัมนา อาคาร 2<br>36013 ห้องประชุม อาคาร 3<br></p>', '18.7899392198945', '98.9758288976275'],
            ['สถาบันวิจัยและพัฒนาพลังงานนครพิงค์','มหาวิทยาลัยเชียงใหม่',  '2', '<p>1)ห้องฝ่ายอำนวยการ อาคารสถาบันวิจัยและพัฒนาพลังงาน<br>2)ห้องฝ่ายบริการวิชาการ อาคารสถาบันวิจัยและพัฒนาพลังงาน<br></p>', '18.757048', '98.939844'],
            // ['ภาควิชาเวชศาสตร์ฟื้นฟู','คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่',  '0', '', '', ''],
            // ['ศูนย์บริหารจัดการเมืองอัจฉริยะ มช.','สำนักงานมหาวิทยาลัย',  '', '', '', ''],
            ['สถาบันวิจัยและพัฒนานครพิงค์','สถาบันวิจัยและพัฒนานครพิงค์',  '2', '<p>-ฝ่ายอำนวยการ<br>-ฝ่ายบริการวิชาการ<br></p>', '18.757048', '98.939844'],
            ['คณะพยาบาลศาสตร์ มหาวิทยาลัยเชียงใหม่','คณะพยาบาลศาสตร์ มหาวิทยาลัยเชียงใหม่',  '25', '<p>1) อาคารN1 - 103 ห้องประชุมหน่วยบัณฑิตศึกษา<br>2) อาคารN1 - 115 ห้องประชุมสำนักงานเลขานุการคณะฯ<br>3) อาคารN1 - 118 ห้องงานคลังและพัสดุ<br>4) อาคารN1 - 211 ห้องประชุม สำนักงานคณบดี<br>5) อาคารN1 - 308 ห้องประชุม กลุ่มการพยาบาลพื้นฐาน<br>6) อาคารN1 - 406 ห้องประชุม กลุ่มการพยาบาลกุมารเวชศาสตร์<br>7) อาคารN1 - 426 ห้องประชุม กลุ่มการพยาบาลสูติศาสตร์และนรีเวชวิทยา<br>8) อาคารN1 - 506 ห้องประชุม กลุ่มการพยาบาลอายุรศาสตร์<br>9) อาคารN1 - 523 ห้องประชุม กลุ่มการพยาบาลศัลยศาสตร์<br>10) อาคารN1 - 603 ห้องประชุม กลุ่มบริหารการพยาบาล<br>11) อาคารNT - 108 (ห้องประชุมงานนโยบายและแผน)<br>12) อาคารNT - 207 (ห้องประชุม กลุ่มการพยาบาลสาธารณสุข)<br>13) อาคารN3 - 105 (ห้องพักผ่อนอาจารย์และบุคลากร)<br>14) อาคารN3 - 510 (ห้องประชุม กลุ่มการพยาบาลจิตเวช)<br>15) อาคารN2 - 102 ( ห้องสมุดชั้น 1)<br>16) อาคารN2 - 207/8 (ห้องประชุมเฉพาะศูนย์ความเป็นเลิศทางการพยาบาล)<br>17) อาคารN2 - 208/2 (ห้องสมุดคณะพยาบาลศาสตร์ ชั้น 2)<br>18) อาคารN4 - G08 (ห้องพัก นศ. ป.เอก)<br>19) อาคารN4 - 221 (ห้องประชุมสำนักงานคณบดี)<br>20) อาคารN4 - 223 (ห้องประชุมหน่วยวิเทศงานสัมพันธ์)<br>21) อาคารN4 - 318 (ห้องประชุมสำนักงานฯลฯ)<br>22) หอพัก 1 ห้องพักนักศึกษา ป.โท<br>23) หอพัก 1 ห้องบัณฑิต ป.เอก<br>24) หอพัก 1 ห้องประชุมนักศึกษา<br>25) หอพัก 1 ห้องคอมพิวเตอร์<br></p>', '18.789183', '98.976079'],
            ['สำนักงานบริหารและจัดการทรัพย์สิน','สำนักงานมหาวิทยาลัย',  '1', '<p>อาคารสำนักงานบริหารและจัดการทรัพย์สิน</p>', '18.804895', '98.954424'],
            ['คณะเกษตรศาสตร์ มช','หน่วยกายภาพ เกษตรศาสตร์',  '2', '<p>1.ห้องสมุดชั้น 4 อาคารเฉลิมพระเกียรติ<br>2.โรงอาหาร อาคารเฉลิมพระเกียรติ<br></p>', '18.79303', '98.960486'],
            // ['หน่วยอาคารสถานที่  สิ่งแวดล้อมและภูมิทัศน์','คณะศึกษาศาสตร์',  '1', 'ห้องศึกษาสัมพันธ์ 2 อาคาร 3 ชั้น1', '', ''],
            ['คณะเทคนิคการแพทย์ มหาวิทยาลัยเชียงใหม่','งานบริหารทั่วไป คณะเทคนิคการแพทย์',  '19', '<p>ห้อง 08-002 อาคาร 2<br>ห้อง 08-003 อาคาร 2<br>ห้อง 08-004 อาคาร 2<br>ห้อง 08-005 อาคาร 2<br>ห้อง 08-006 อาคาร 2<br>ห้อง 08-008 อาคาร 2<br>ห้อง 403 อาคาร 3<br>ห้อง 405 อาคาร 3<br>ห้อง 406 อาคาร 3<br>ห้อง 410 อาคาร 3<br>ห้องวิจัยใหม่ อาคาร 3<br>ห้องเรียน NT301-302 อาคารเรียนรวมพยาบาล-เทคนิคการแพทย์<br>ห้องเรียน NT303 อาคารเรียนรวมพยาบาล-เทคนิคการแพทย์<br>ห้องเรียน NT304-305 อาคารเรียนรวมพยาบาล-เทคนิคการแพทย์<br>ห้องเรียน NT306-307 อาคารเรียนรวมพยาบาล-เทคนิคการแพทย์<br>ห้องบรรยาย 1 อาคาร 2<br>ห้องบรรยาย 2 อาคาร 2<br>ห้องเรียนบรรยายศิษย์เก่าสัมพันธ์ อาคาร 2<br>ห้องประชุม ศ.เกียรติคุณ นพ.ชัยโรจน์ แสงอุดม อาคาร 2<br></p>', '18.7898488', '98.9757543'],
            ['สถาบันวิจัยสังคม','สถาบันวิจัยสังคม',  '2', '<p>ห้องประชุม 1-2 อาคารวมวิจัยและบัณฑิตศึกษา</p>', '18.794684', '98.9582'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', '<p>ห้อง ITSC หอพักนักศึกษาชาย อาคาร 3</p>', '18.7973063799005', '98.9528122319637'],
            ['คณะสาธารณสุขศาสตร์','สำนักงานคณะ คณะสาธารณสุขศาสตร์',  '', '<p>1.ห้องสำนักงานคณะ ชั้น 1 ห้อง 113<br>2.ห้องทำงานรองคณบดีคณะสาธารณสุขศาสตร์ ชั้น 1 ห้อง 112A<br>3.ห้องทำงานอาจารย์ ดร.จักรกฤษณ์ วังราษฎร์ ชั้น 1 ห้อง 112B<br>4.ห้องสำนักงานคณะ ชั้น 2 ห้อง 213<br>5.ห้องเรียนรวม ชั้น 2 ห้อง 209<br></p>', '18.7947598', '98.9577382'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาชาย อาคาร 4 ', '18.7977101045547', '98.9528122319637'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง อ่านหนังสือชั้น 1 หอพักนักศึกษาชาย อาคาร 4 (อยู่ระหว่างดำเนินการ)', '18.7973063799005', '98.9526003374516'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาชาย อาคาร 5 ', '18.797187039723', '98.9518868698536'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาชาย อาคาร 6', '18.7979919494941', '98.951964653915'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง อ่านหนังสือชั้น 1 หอพักนักศึกษาชาย อาคาร 6 (อยู่ระหว่างดำเนินการ)', '18.7981696893033', '98.9521711840092'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้องประชุม 1 หอพักนักศึกษาชาย อาคาร 6', '18.7982026981043', '98.9517554416119'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้องประชุม 2 หอพักนักศึกษาชาย อาคาร 6', '18.7981849241353', '98.9518815054356'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาชาย อาคาร 7', '18.7995865227854', '98.9500897898136'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาหญิง อาคาร 1 ', '18.7987359163012', '98.9556714667736'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาหญิง อาคาร 2', '18.7999750073018', '98.9545610322414'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาหญิง อาคาร 3', '18.7997871129418', '98.9528229607998'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาหญิง อาคาร 4  ', '18.7983626637407', '98.9537966026722'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง อ่านหนังสือชั้น 1 หอพักนักศึกษาหญิง อาคาร 4 (อยู่ระหว่างดำเนินการ)', '18.7985302466254', '98.9539521707951'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาหญิง อาคาร 5 ', '18.7977431134459', '98.9547970666348'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาหญิง อาคาร 6 ', '18.7973190756591', '98.9538690223156'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาหญิง อาคาร 7   ', '18.7987587684719', '98.9547648801266'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้องประชุมสำนักงานหอพักนักศึกษา หอพักนักศึกษาหญิง อาคาร 7   ', '18.7989161944524', '98.954845346397'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษาหญิง อาคาร 8 ', '18.7979538623677', '98.9555963649212'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้องอ่านหนังสือชั้น 1 หอพักนักศึกษาหญิง อาคาร 8  (อยู่ระหว่างดำเนินการ)', '18.7977608874615', '98.9555024876057'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอพักนักศึกษา 40 ปี ', '18.7993630803044', '98.9587667359768'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้องอ่านหนังสือชั้น 1 หอพักนักศึกษา 40 ปี   ', '18.799347845579', '98.9589249863087'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอสีชมพู  ', '18.7988552553807', '98.9582007898747'],
            ['สำนักงานหอพักนักศึกษา','สำนักงานมหาวิทยาลัย',  '1', 'ห้อง ITSC หอแม่เหียะ  ', '18.7647365822325', '98.9391066342701'],
        ];
        $.each(safety_data, function (index, value) {
            var marker2;
            $('.safety-button').on('click', function (e) {
                if(marker2 == null){
                    marker2 = L.marker([value[4], value[5]], {
                        icon: L.divIcon({
                            className: "safety_marker",
                            iconSize: [35, 35], 
                            iconAnchor: [0, 0],
                            labelAnchor: [-6, 0],
                            popupAnchor: [17, 0],
                            html: '<img class="safety_marker slit_in_vertical_s anime_delay075" src="assets/image/safety_icon.png" alt="safety zone">'
                        })
                    }).addTo(map);
                    marker2.on('click', function (e) {
                        var lang = Cookies.get("lang_cookie");
                        var litle_name = value[1]!=''?'('+value[1]+')':'';
                        var count_room = value[2]!=''?value[2]:'-';
                        $('#popupDetail .card-header p').html(value[0] + '<br>' + litle_name );
                        $('#popupDetail .card-body table').html(
                            '<tbody>'+
                                '<tr><th class="align-middle text-center">จำนวนห้อง</th><td class="align-middle text-center">' + count_room + '</td></tr>' +
                                '<tr><th class="align-top text-center">รายละเอียด</th><td class="detail_safety align-middle text-left"><div class="over">' + value[3] + '</div></td></tr>' +
                            '</tbody>'
                        );
                        $('#popupDetail .number').hide();
                        $('#popupDetail .anime').hide();
                        $('#popupDetail .anime img').hide();
                        $('#popupDetail .detail').hide();
                        $('#popupDetail .card-body .table').show();
                        $('#popupDetail .card-header').css("padding-bottom", ".75rem");
                        $('#popupDetail .card-header').css("background-color", "#99cc49");
                        $('#popupDetail .card-body').css("background-color", "#ffffff");
                        $('#popupDetail .card-footer').css("background-color", "#99cc49");
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
                        $('.time').html('<span class="float-left"><i class="far fa-calendar-alt"></i> ' + time_date + ' | <i class="far fa-clock"></i> ' + time_time +'</span>');
                        $('#popupDetail').show();
                    });
                }else{
                    marker2.remove();
                    $('#popupDetail').hide();
                    marker2 = null;
                }
            });
        });
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
    //         var chart_forecast = [];
    //         setTimeout(() => {
    //             for (let index = 1; index <= index_data; index++) {
    //                 chart_forecast[index-1] = new Chart('chart_forcast_'+index, {
    //                     type: 'bar',
    //                     data: {
    //                         labels: label_forcast[index],
    //                         datasets: [{
    //                             label: 'PM2.5',
    //                             backgroundColor: color_forcast[index],
    //                             borderColor: color_forcast[index],
    //                             data: data_forcast[index]
    //                         }]
    //                     },
    //                     options: ({
    //                         scales: {
    //                             xAxes: [{
    //                                 ticks: {
    //                                     beginAtZero: true, 
    //                                     fontFamily: "'kanit', sans-serif"
    //                                 },
    //                                 gridLines: {
    //                                     color: "rgba(0, 0, 0, 0)",
    //                                 }
    //                             }],
    //                             yAxes: [{
    //                                 ticks: {
    //                                     beginAtZero: true, 
    //                                     fontFamily: "'kanit', sans-serif",
    //                                 },
    //                                 gridLines: {
    //                                     color: "rgba(0, 0, 0, 0)",
    //                                 }
    //                             }]  
    //                         },
    //                         elements: {
    //                             line: {
    //                                 tension: 0.4
    //                             }
    //                         },
    //                         legend: {
    //                             display: false
    //                         },
    //                         tooltips: {
    //                             callbacks: {
    //                                 label: function(tooltipItem) {
    //                                         return tooltipItem.yLabel;
    //                                 }
    //                             }
    //                         }
    //                     })
    //                 });
    //             }
    //         }, 500);
        }
    });
}
