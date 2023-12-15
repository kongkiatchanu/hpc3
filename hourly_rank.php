<?php
    header('Access-Control-Allow-Origin: *');
    include('info.php'); 
    $page='hourly';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= $title ?></title>
    <meta name='description' content='<?=$description?>' />
    <meta name='keywords' content='<?=$title?>,<?=$contact_title?>' />
    <meta http-equiv='content-language' content='th' />
    <meta http-equiv='content-type' content='text/html; charset=UTF-8' />
    <meta name='revisit-after' content='7 days' />
    <meta name='robots' content='index, follow' />
    <meta property="og:url" content="<?=$url?>">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= $title ?>">
    <meta property="og:description" content="<?=$description?>">
    <meta property="og:image" content="assets/image/<?= $icon; ?>">
    <link rel="shortcut icon" type="image/x-icon" href="assets/image/<?= $icon_title ?>">
    <link rel="stylesheet" href="assets/css/bootstrap-4.3.1/bootstrap.min.css">
    <link rel="stylesheet" href="assets/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="assets/css/style2.min.css?v=<?= date('YmdHis'); ?>">
    <?php //include('report.php'); ?>
</head>

<body>
    <div id="btn_contact">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <?php include('header_slide.php'); ?>
    <section id="main">
        <div class="container-fluid">
            <?php include('header.php'); ?>
            <div class="main_content">
                <div class="content">
                    <div class="main_title text-center ">
                        <div class="container">
                            <div class="row col-12">
                                <h3 class="title_on_video ml-2 ml-sm-0"> <i class="fas fa-square mr-3" style="font-size:11px;"></i>ค่าฝุ่นรายชั่วโมง</h3>
                            </div>
                        </div>
                    </div>
                    <div class="main_detail">
                        <div class="container">
                            <div class="row align-items-center mb-3 mb-md-0">
                                <div class="col-4 mt-3 text-center col-sm-6 text-sm-left my-sm-3">
                                    <div class="cate_aqi">
                                        <div class="btn-group">
                                            <button class="btn dropdown-toggle shadow-drop-bottom-sub_menu" type="button" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                                <span class="fade_in_ture"> Us </span>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-sm-right shadow-drop-bottom-sub_menu">
                                                <a class="dropdown-item " data-index="th">Th</a>
                                                <a class="dropdown-item active" data-index="us">Us</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-8 text-right col-sm-6">
                                    <div class="category">
                                        <span class="d-none d-sm-inline-block">จุดตรวจวัด : </span>
                                        <button class="btn btn-category1" data-category='1' lang_th="ทั้งหมด" lang_en="All">ทั้งหมด</button>
                                        <button class="btn btn-category2 active" data-category='2' lang_th="ศูนย์อนามัยที่ 3" lang_en="HPC3">ศูนย์อนามัยที่ 3</button>
                                    </div>
                                </div>
                            </div>
                            <div class="spinkit-loading d-none justify-content-center align-items-center my-4">
                                <div class="sk-chase">
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                </div>
                            </div>
                            <div class="table-responsive fade_in_ture anime_delay1">
                                <table id="table_pm25_nearby" class="table table-hover w-100" style="display: none">
                                    <thead>
                                        <tr>
                                            <th class="dustboy-title text-center" style="width: 75%;">
                                                จุดตรวจวัด <br class="d-md-none"> ( <span class="time"></span> )
                                            </th>
                                            <th class="text-center">PM<sub>2.5</sub> : μg/m<sup>3</sup></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-center"></td>
                                            <td class="text-center"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="pm_aqi cate_us">
                                <div class="pm fade_in_ture anime_delay1">
                                    <div class="col col-md-6 title_pm_aqi ">PM<sub>2.5</sub>(μg/m<sup>3</sup>)</div>
                                    <div class="col col-md-1 detail_pm_aqi us1 num"></div>
                                    <div class="col col-md-1 detail_pm_aqi us2 num"></div>
                                    <div class="col col-md-1 detail_pm_aqi us3 num"></div>
                                    <div class="col col-md-1 detail_pm_aqi us4 num"></div>
                                    <div class="col col-md-1 detail_pm_aqi us5 num"></div>
                                    <div class="col col-md-1 detail_pm_aqi us6 num"></div>
                                </div>
                                <div class="aqi fade_in_ture anime_delay15">
                                    <div class="col col-md-6 title_pm_aqi quality"></div>
                                    <div class="col col-md-1 detail_pm_aqi us1" >
                                        <!-- <i class="fas fa-grin-beam fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/us/nrct-06.png">
                                    </div>
                                    <div class="col col-md-1 detail_pm_aqi us2" >
                                        <!-- <i class="fas fa-meh fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/us/nrct-07.png">
                                    </div>
                                    <div class="col col-md-1 detail_pm_aqi us3" >
                                        <!-- <i class="fas fa-frown-open fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/us/nrct-08.png">
                                    </div>
                                    <div class="col col-md-1 detail_pm_aqi us4" >
                                        <!-- <i class="fas fa-sad-tear fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/us/nrct-09.png">
                                    </div>
                                    <div class="col col-md-1 detail_pm_aqi us5" >
                                        <!-- <i class="fas fa-tired fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/us/nrct-10.png">
                                    </div>
                                    <div class="col col-md-1 detail_pm_aqi us6" >
                                        <!-- <i class="fas fa-dizzy fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/us/nrct-11.png">
                                    </div>
                                </div>
                            </div>
                            <div class="pm_aqi cate_th" style="display: none;">
                                <div class="pm fade_in_ture anime_delay1">
                                    <div class="col-2 col-md-7 title_pm_aqi ">PM<sub>2.5</sub>(μg/m<sup>3</sup>)</div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th1 num"></div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th2 num"></div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th3 num"></div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th4 num"></div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th5 num"></div>
                                </div>
                                <div class="aqi fade_in_ture anime_delay15">
                                    <div class="col-2 col-md-7 title_pm_aqi quality"></div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th1" >
                                        <!-- <i class="fas fa-grin-squint fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/th/nrct-01.png">
                                    </div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th2" >
                                        <!-- <i class="fas fa-grin-beam fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/th/nrct-02.png">
                                    </div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th3" >
                                        <!-- <i class="fas fa-meh fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/th/nrct-03.png">
                                    </div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th4" >
                                        <!-- <i class="fas fa-sad-tear fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/th/nrct-04.png">
                                    </div>
                                    <div class="col-2 col-md-1 detail_pm_aqi th5" >
                                        <!-- <i class="fas fa-dizzy fa-2x text-shadow-drop-bottom-icon anime_delay1"></i> -->
                                        <img class="shadow-drop-bottom-icon anime_delay1" src="assets/image/pm25/th/nrct-05.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php include('contact-footer.php'); ?>

    <script src="assets/js/all/compress.min.js?v=<?= date('YmdHis'); ?>"></script>
    <script src="assets/js/all.js?v=<?= date('YmdHis'); ?>"></script>
    <script src="assets/js/hourly_rank.js?v=<?= date('YmdHis'); ?>"></script>
</body>

</html>