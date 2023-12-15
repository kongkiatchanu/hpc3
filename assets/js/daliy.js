$(function () {
    $('.spinkit-loading').removeClass('d-none');
    $('.spinkit-loading').addClass('d-flex');
    getjson(null,'us');
    $('#main .main_detail .category button').click(function (e) {
        var data_category = $(this).attr('data-category');
        var data_index = $('.cate_aqi .dropdown-item.active').attr('data-index');
        var url;
        if (data_category == '2') {
            url = 'https://www-old.cmuccdc.org/api2/dustboy/hpc3_stations';
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
        var name_index = $(this).html();
        $('.cate_aqi .dropdown-toggle').html('<span class="fade_in_ture"> ' + name_index + ' </span>');
        var data_index = $(this).attr('data-index');
        var data_category =$('#main .main_detail .category button.active').attr('data-category');
        var url;
        if (data_category == '2') {
            url = 'https://www-old.cmuccdc.org/api2/dustboy/hpc3_stations';
        }else{
            url = 'https://www-old.cmuccdc.org/api2/dustboy/dustboystations?v=1';
        }
        if(data_index =='th'){
            $('.dustboy-title-aqi').html('<span class="fade_in">TH AQI</span>');
            if($('.cate_th_daily').css('display') == 'none'){
                $('.cate_us_daily').hide();
                $('.cate_th_daily').show();
            }
            if(url) getjson(url,'th');
            else getjson(null,'th');
        }else{
            $('.dustboy-title-aqi').html('<span class="fade_in">US AQI</span>');
            if($('.cate_us_daily').css('display') == 'none'){
                $('.cate_th_daily').hide();
                $('.cate_us_daily').show();
            }
            if(url) getjson(url,'us');
            else getjson(null,'us');
        }
        $('.cate_aqi .dropdown-item').removeClass('active');
        $(this).addClass('active');
    });
    function getjson(url,index) {
        var data_url;
        if (!url) {
            data_url = 'https://www-old.cmuccdc.org/api2/dustboy/hpc3_stations';
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
                $('.spinkit-loading').removeClass('d-flex');
                $('.spinkit-loading').addClass('d-none');
                table.destroy();
                table = $('#table_pm25_nearby').DataTable({
                    "lengthMenu": [
                        [10, 20, 50, -1],
                        [10, 20, 50, "All"]
                    ],
                    data: db,
                    columns: [{
                            data: 'dustboy_name'
                        },
                        {
                            data: 'daily_pm25',
                        },
                        {
                            data: 'daily_pm25_th_aqi',
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
                        },{
                            targets: 1,
                            createdCell: function (td, cellData, rowData, row, col) {
                                if(rowData.pm25 > 0){
                                    var valpm25 = rowData.pm25;
                                }else{
                                    var valpm25 = '';
                                }
                                $(td).html('<a class="font-weight-bold p-1" style="width: 4vw; font-size:14px;"> ' + valpm25 + ' </a>');
                                $(td).addClass('text-center');
                            }
                        },{
                            targets: 2,
                            createdCell: function (td, cellData, rowData, row, col) {
                                var color_table = index =='us' ? rowData.daily_us_color : rowData.daily_th_color;
                                if(rowData.daily_pm25>0){
                                    var value_aqi = index =='us' ? rowData.daily_pm25_us_aqi : rowData.daily_pm25_th_aqi;
                                }else{
                                    var value_aqi = 'Offline';
                                }
                                $(td).html('<a class="font-weight-bold badge badge-pill p-1 w-sm slit_in_vertical_table" style="width: 4vw; font-size:14px; background-color:rgba(' + color_table + ')";> ' + value_aqi + ' </a>');
                                $(td).addClass('text-center');
                            }
                        }
                    ],
                    "order": [
                        [1, 'desc']
                    ]
                });
            }
            $('#table_pm25_nearby').show();
        });
    }
});