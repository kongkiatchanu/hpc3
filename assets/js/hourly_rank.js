$(function () {
    var all_station = {};
    $.getJSON('https://www-old.cmuccdc.org/api2/dustboy/hpc3_stations', function (db) {
        all_station = db;
    });
    $('.spinkit-loading').removeClass('d-none');
    $('.spinkit-loading').addClass('d-flex');
    getjson(null,'us');
    $('#main .main_detail .category button').click(function (e) {
        var data_category = $(this).attr('data-category');
        var data_index = $('.cate_aqi .dropdown-item.active').attr('data-index');
        var url;
        if (data_category == '2') {
            url = 'https://www-old.cmuccdc.org/api2/dustboy/hpc3';
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
            url = 'https://www-old.cmuccdc.org/api2/dustboy/hpc3';
        }else{
            url = 'https://www-old.cmuccdc.org/api2/dustboy/dustboystations?v=1';
        }
        if(data_index =='th'){
            if($('.cate_th').css('display') == 'none'){
                $('.cate_us').hide();
                $('.cate_th').show();
            }
            if(url) getjson(url,'th');
            else getjson(null,'th');
        }else{
            $('.dustboy-title-aqi').html('<span class="fade_in">US AQI</span>');
            if($('.cate_us').css('display') == 'none'){
                $('.cate_th').hide();
                $('.cate_us').show();
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
            data_url = 'https://www-old.cmuccdc.org/api2/dustboy/hpc3';
        } else {
            data_url = url;
        }
        $.getJSON(data_url, function (db) {
            if (db) {
                console.log(all_station);
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
                        },{
                            targets: 1,
                            createdCell: function (td, cellData, rowData, row, col) {
                                var color_table = index =='us' ? rowData.us_color : rowData.th_color;
                                $(td).html('<a class="font-weight-bold badge badge-pill p-1 w-sm slit_in_vertical_table" style="width: 4vw; font-size:14px; background-color:rgba(' + color_table + ')";> ' + rowData.pm25 + ' </a>');
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