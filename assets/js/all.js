// import 'jquery/jquery.min.js';  
// import 'popper/popper.min.js';  
// import 'bootstrap-4.3.1/bootstrap.min.js';  
// import 'leaflet/leaflet.js';  
// import 'leaflet/L.Control.Locate.min.js';  
// import 'leaflet/shp.min.js';
// import 'leaflet/leaflet-googlemap.js';  
// import 'all/js.cookie.min.js'; 
 
$(function () {
    $('.btn-close').on('click', function () {
        $('.card').hide();
    });
    $('#btn_contact').on('click', function () {
        $(this).toggleClass('open');
        if ($(this).is('.open')) {
            $('#main').addClass('fade_out');
            $('#main').removeClass('fade_in');
            $('#contact').removeClass('fade_out');
            $('#contact').addClass('fade_in');
            // $('footer').addClass('fade_out');
            // $('footer').removeClass('fade_in');
            if ($('#menu_slide').length <= 0) {
                $('#menu_slide').removeClass('out_slide');
                $('#menu_slide').hide();
            }
            if ($('.content').length > 0) {
                $('#main').hide();
                $('#contact').show();
            }
            if ($(window).width() <= 575.98 && $('.content').length <= 0) {
                $('body').css('overflow', 'auto');
            }
            if ($(window).scrollTop() >= 115) {
                $('#menu_slide').addClass('out_slide');
                $('#menu_slide').removeClass('in_slide');
                $('#btn_contact').addClass('out_slide_btn');
                $('#btn_contact').removeClass('in_slide_btn');
            }
        } else if (!$(this).is('.open')) {
            $('#contact').addClass('fade_out');
            $('#contact').removeClass('fade_in');
            $('#main').removeClass('fade_out');
            $('#main').addClass('fade_in');
            // $('footer').removeClass('fade_out');
            // $('footer').addClass('fade_in');
            if ($('#menu_slide').length <= 0) {
                $('#menu_slide').addClass('frist');
                $('#menu_slide').show();
            }
            if ($('.content').length > 0) {
                $('#main').show();
                $('#contact').hide();
            }
            if ($(window).width() <= 575.98 && $('.content').length <= 0) {
                $('body').css('overflow', 'hidden');
            }
            if ($(window).scrollTop() >= 115) {
                $('#menu_slide').addClass('in_slide');
                $('#menu_slide').removeClass('out_slide');
                $('#btn_contact').addClass('in_slide_btn');
                $('#btn_contact').removeClass('out_slide_btn');
            }
        }
    });
    var window_top = $(window).scrollTop();
    if (window_top >= 115) {
        if ($('#menu_slide').is('.frist')) $('#menu_slide').removeClass('frist');
        if (!$('#btn_contact').is('.open')) {
            $('#menu_slide').addClass('in_slide');
            $('#menu_slide').removeClass('out_slide');
            $('#btn_contact').addClass('in_slide_btn');
            $('#btn_contact').removeClass('out_slide_btn');
        }
    } else {
        if ($('#btn_contact').is('.open')) {
            $('#menu_slide').removeClass('in_slide');
            $('#btn_contact').removeClass('in_slide_btn');
        }
        if (!$('#menu_slide').is('.frist') && !$('#btn_contact').is('.open')) {
            $('#menu_slide').addClass('out_slide');
            $('#menu_slide').removeClass('in_slide');
            $('#btn_contact').addClass('out_slide_btn');
            $('#btn_contact').removeClass('in_slide_btn');
        }
    }
    $(window).scroll(function () {
        var check_scroll = $(window).scrollTop();
        if ($(window).width() > 992) {
            if (check_scroll >= 115) {
                if ($('#menu_slide').is('.frist')) $('#menu_slide').removeClass('frist');
                if (!$('#btn_contact').is('.open')) {
                    $('#menu_slide').addClass('in_slide');
                    $('#menu_slide').removeClass('out_slide');
                    $('#btn_contact').addClass('in_slide_btn');
                    $('#btn_contact').removeClass('out_slide_btn');
                }
            } else {
                if ($('#btn_contact').is('.open')) {
                    $('#menu_slide').removeClass('in_slide');
                    $('#btn_contact').removeClass('in_slide_btn');
                }
                if (!$('#menu_slide').is('.frist') && !$('#btn_contact').is('.open')) {
                    $('#menu_slide').addClass('out_slide');
                    $('#menu_slide').removeClass('in_slide');
                    $('#btn_contact').addClass('out_slide_btn');
                    $('#btn_contact').removeClass('in_slide_btn');
                }
            }
        }
    });
    if (!document.cookie == 'lang_cookie=TH' || !document.cookie == 'lang_cookie=EN') {
        Cookies.set('lang_cookie', 'TH');
    } else {
        if (Cookies.get('lang_cookie') == 'EN') {
            $('#main .sub_menu .lang button').toggleClass('active');
            $(".nav-link.home").html('Home');
            $(".nav-link.pm25nearby").html('PM<sub>2.5</sub>Nearby');
            $(".nav-link.hourly").html('Hourly');
            $(".nav-link.daily").html('Daily');
        }
    }
    $('#main .sub_menu .lang button').click(function (e) {
        var lang = $(this).attr('data-lang');
        if (!$(this).hasClass('active')) {
            $('#main .sub_menu .lang button').toggleClass('active');
            if (lang == 'EN') {
                Cookies.set('lang_cookie', 'EN');
                $(".nav-link.home").html('Home');
                $(".nav-link.pm25nearby").html('PM<sub>2.5</sub>Nearby');
                $(".nav-link.hourly").html('Hourly');
                $(".nav-link.daily").html('Daily');
                // $(".title_pm_aqi.quality").html('QUALITY');
            } else {
                Cookies.set('lang_cookie', 'TH');
                $(".nav-link.home").html('หน้าหลัก');
                $(".nav-link.pm25nearby").html('PM<sub>2.5</sub>ตามพิกัด');
                $(".nav-link.hourly").html('ค่าฝุ่นรายชั่วโมง');
                $(".nav-link.daily").html('ค่าฝุ่นรายวัน');
                // $(".title_pm_aqi.quality").html('คุณภาพ');
            }
            $('#popupDetail').hide();
        }
    });
    $.getJSON("assets/js/all/standard_aqi.json",function (data) {
        
        $.each(data[0].us_aqi['pm25'], function (index, value) { 
            $('.cate_us .us'+(index+1)).css("background-color","rgba(" + value.color + ")");
            (index>=4)?$('.cate_us .num.us'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">≥ ' + value.min +'</span>'):$('.cate_us .num.us'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">' + value.min + '-' + value.max + '</span>');
            (index>=4)?$('.cate_us_daily .num.us'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">≥ ' + value.min +'</span>'):$('.cate_us_daily .num.us'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">' + value.min + '-' + value.max + '</span>');
            $('.cate_us .aqi .detail_pm_aqi.us'+(index+1)).html('<img class="anime_delay1 py-1" src="https://pm2_5.nrct.go.th/template/image/' + value.dustboy_icon + '">');
        });
        $.each(data[0].th_aqi['pm25'], function (index, value) { 
            $('.cate_th .th'+(index+1)).css("background-color","rgba(" + value.color + ")");
            (index>=3)?$('.cate_th .num.th'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">≥ ' + value.min +'</span>'):$('.cate_th .num.th'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">' + value.min + '-' + value.max + '</span>');
            (index>=3)?$('.cate_th_daily .num.th'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">≥ ' + value.min +'</span>'):$('.cate_th_daily .num.th'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">' + value.min + '-' + value.max + '</span>');
            $('.cate_th .aqi .detail_pm_aqi.th'+(index+1)).html('<img class="anime_delay1 py-1" src="https://pm2_5.nrct.go.th/template/image/' + value.dustboy_icon + '">');
        });
        $.each(data[0].us_aqi['aqi'], function (index, value) { 
            $('.cate_us_daily .us'+(index+1)).css("background-color","rgba(" + value.color + ")");
            (index>=4)?$('.cate_us_daily .daily.us'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">≥ ' + value.min +'</span>'):$('.cate_us_daily .daily.us'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">' + value.min + '-' + value.max + '</span>');
        });
        $.each(data[0].th_aqi['aqi'], function (index, value) { 
            $('.cate_th_daily .th'+(index+1)).css("background-color","rgba(" + value.color + ")");
            (index>=3)?$('.cate_th_daily .daily.th'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">≥ ' + value.min +'</span>'):$('.cate_th_daily .daily.th'+(index+1)).html('<span class="text-shadow-drop-bottom anime_delay05">' + value.min + '-' + value.max + '</span>');
        });
    });
});