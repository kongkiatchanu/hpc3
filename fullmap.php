<?php
    header('Access-Control-Allow-Origin: *');
    include('info.php'); 
    $page='home';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CCDC : Climate Change Data Center</title>
    <meta name='description' content='CCDC : Climate Change Data Center' />
    <meta name='keywords' content='ccdc,Climate Change Data Center' />
    <meta http-equiv='content-language' content='th' />
    <meta http-equiv='content-type' content='text/html; charset=UTF-8' />
    <meta name='revisit-after' content='7 days' />
    <meta name='robots' content='index, follow' />
    <meta property="og:url" content="https://www.cmuccdc.org/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="CCDC : Climate Change Data Center">
    <meta property="og:description" content="CCDC : Climate Change Data Center">
    <meta property="og:image" content="assets/image/logo_ccdc.ico">
    <link rel="shortcut icon" type="image/x-icon" href="assets/image/logo_ccdc.ico">
    <link rel="stylesheet" href="assets/css/bootstrap-4.3.1/bootstrap.min.css">
    <link rel="stylesheet" href="assets/fontawesome/css/all.min.css">
    <!-- <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.css'> -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.70.0/dist/L.Control.Locate.min.css" />
    <link rel="stylesheet" href="assets/css/fullmap.min.css?v=<?= date('YmdHis'); ?>">
    <?php //include('report.php'); ?>
</head>

<body>
    
    <div id="us_map" class="fade_in_ture anime_delay05">
        <div class="leaflet-top leaflet-right">
            <div class="leaflet-control-layers leaflet-control custom-layout dropleft">
                <a class="leaflet-control-layers-toggle phase-button" data-toggle="dropdown">
                    <i class="fas fa-folder-open"></i>
                </a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('all','all')">ทั้งหมด</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('1','all')">ระยะที่ 1</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('2','all')">ระยะที่ 2</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('3','all')">ระยะที่ 3</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('4','all')">ระยะที่ 4</a>
                </div>
            </div>
            <div class="leaflet-control-layers leaflet-control custom-layout2 dropleft">
                <a class="leaflet-control-layers-toggle region-button" data-toggle="dropdown">
                    <i class="fas fa-globe-americas"></i>
                </a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('all','all')">ทั้งหมด</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('all','เหนือ')">เหนือ</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('all','ตะวันออกเฉียงเหนือ')">ตะวันออกเฉียงเหนือ</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('all','กลาง')">กลาง</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('all','ตะวันออก')">ตะวันออก</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('all','ตะวันตก')">ตะวันตก</a>
                    <a class="dropdown-item" href="javascript:void(0)" onclick="genMap('all','ใต้')">ใต้</a>
                </div>
            </div>
        </div>
        <div class="leaflet-bottom leaflet-right custom-banner-mobile d-flex d-md-none">
            <img src="assets/image/logo-nrct-mini.png" alt="">
            <img src="assets/image/logo_ccdc-mini.png" alt="">
            <img src="assets/image/logo_dustboy-mini.png" alt="">
        </div>
        <div class="leaflet-bottom leaflet-right leaflet-info">
            <div class="leaflet-control-layers leaflet-control info">
                <ul>
                    <li>
                        <div class="info-color1 info-box rounded shadow"></div> 
                        <label class="title">ระยะที่ 1 <span class="detail">(100 จุด)</span></label>
                    </li>
                    <li>
                        <div class="info-color2 info-box rounded shadow"></div> 
                        <label class="title">ระยะที่ 2 <span class="detail">(120 จุด)</span></label>
                    </li>
                    <li>
                        <div class="info-color3 info-box rounded shadow"></div> 
                        <label class="title">ระยะที่ 3 <span class="detail">(200 จุด)</span></label>
                    </li>
                    <li>
                        <div class="info-color4 info-box rounded shadow"></div> 
                        <label class="title">ระยะที่ 4 <span class="detail">(500 จุด)</span></label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="leaflet-bottom leaflet-left custom-banner">
            <img src="assets/image/logo-nrct-mini.png" alt="">
            <img src="assets/image/logo_ccdc-mini.png" alt="">
            <img src="assets/image/logo_dustboy-mini.png" alt="">
        </div>
    </div>
    
    <script src="/assets/js/jquery/jquery.min.js?v=<?= date('YmdHis'); ?>"></script>
    <script src="/assets/js/popper/popper.min.js?v=<?= date('YmdHis'); ?>"></script>
    <script src="/assets/js/bootstrap-4.3.1/bootstrap.min.js?v=<?= date('YmdHis'); ?>"></script>
    <script src="/assets/js/leaflet/leaflet.js?v=<?= date('YmdHis'); ?>"></script>
    <script src="/assets/js/leaflet/L.Control.Locate.min.js?v=<?= date('YmdHis'); ?>"></script>
    <script src="/assets/js/leaflet/leaflet-googlemap.js?v=<?= date('YmdHis'); ?>"></script>
    <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
    <script src="assets/js/fullmap/fullmap.js?v=<?= date('YmdHis'); ?>"></script>
</body>

</html>