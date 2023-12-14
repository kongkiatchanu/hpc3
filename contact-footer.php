<section id="contact">
    <div class="container">
        <div class="row align-items-center">
            <div class="logo_contact col-12 col-lg-4">
                <img class="local_contact shadow-drop-bottom" src="assets/image/<?= $icon; ?>" alt="">
            </div>
            <div class="menu_contact col-12 col-lg-8">
                <div class="menu_min col-12 d-sm-block d-md-block d-lg-none">
                    <ul class="nav justify-content-center text-center mb-3">
                        <div class="col-12 col-lg-12">
                            <li class="nav-item">
                                <a class="nav-link home <?= $page=='home'?'active':''; ?>" href="<?= $page=='home'?'javascript:void(0);':'index.php'; ?>">หน้าหลัก</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link pm25nearby <?= $page=='pm25nearby'?'active':''; ?>" href="<?= $page=='pm25nearby'?'javascript:void(0);':'pm25.php'; ?>">PM<sub>2.5</sub>ตามพิกัด</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link hourly <?= $page=='hourly'?'active':''; ?>" href="<?= $page=='hourly'?'javascript:void(0);':'hourly_rank.php'; ?>">ค่าฝุ่นรายชั่วโมง</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link daily <?= $page=='daily'?'active':''; ?>" href="<?= $page=='daily'?'javascript:void(0);':'daily.php'; ?>">ค่าฝุ่นรายวัน</a>
                            </li>
                        </div>
                    </ul>
                </div>
                <div class="line d-block d-lg-none"></div>
                <div class="contact col-12 offset-md-1 col-md-6 offset-lg-0 col-lg-7 mt-3">
                    <div class="row">
                        <div class="col-12 text-light">
                            <h4><?= $contact_title ?></h4>
                            <p><?= $contact_detail ?></p> 
                        </div>
                    </div>
                </div>
                <div class="contact col-12 col-md-5 offset-lg-0 col-lg-5 pl-4">
                    <p class="text-white contact_us">ติดต่อ</p>
                    <p class="group_icon text-white">
                        <?php if(isset($facebook)){ ?>
                            <a href="<?=$facebook?>" class="icon mr-3" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26"
                                    viewBox="0 0 172 172" style=" fill:#000000;">
                                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1"
                                        stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"
                                        stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
                                        font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                        <path d="M0,172v-172h172v172z" fill="none"></path>
                                        <g fill="#ffffff">
                                            <path
                                                d="M125.59583,64.5h-25.2625v-14.33333c0,-7.396 0.602,-12.05433 11.2015,-12.05433h13.38733v-22.79c-6.5145,-0.67367 -13.06483,-1.00333 -19.62233,-0.989c-19.44317,0 -33.63317,11.87517 -33.63317,33.67617v16.4905h-21.5v28.66667l21.5,-0.00717v64.50717h28.66667v-64.5215l21.973,-0.00717z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        <?php } ?>
                        <?php if(isset($youtube)){ ?>
                            <a href="<?=$youtube?>" class="icon mr-3" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26"
                                    viewBox="0 0 172 172" style=" fill:#000000;">
                                    <g transform="">
                                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1"
                                            stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"
                                            stroke-dasharray="" stroke-dashoffset="0" font-family="none"
                                            font-weight="none" font-size="none" text-anchor="none"
                                            style="mix-blend-mode: normal">
                                            <path d="M0,172v-172h172v172z" fill="none"></path>
                                            <path d="" fill="none"></path>
                                            <g fill="#ffffff">
                                                <path
                                                    d="M150.5,35.83333c0,0 -21.5,-7.16667 -64.5,-7.16667c-43,0 -64.5,7.16667 -64.5,7.16667c0,0 -7.16667,21.5 -7.16667,50.16667c0,28.66667 7.16667,50.16667 7.16667,50.16667c0,0 21.5,7.16667 64.5,7.16667c43,0 64.5,-7.16667 64.5,-7.16667c0,0 7.16667,-21.5 7.16667,-50.16667c0,-28.66667 -7.16667,-50.16667 -7.16667,-50.16667zM71.66667,110.82533v-49.65067l43,24.82533z">
                                                </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        <?php } ?>
                        <?php if(isset($twitter)){ ?>
                            <a href="<?=$twitter?>" class="icon mr-3" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26"
                                    viewBox="0 0 172 172" style=" fill:#000000;">
                                    <g transform="">
                                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1"
                                            stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"
                                            stroke-dasharray="" stroke-dashoffset="0" font-family="none"
                                            font-weight="none" font-size="none" text-anchor="none"
                                            style="mix-blend-mode: normal">
                                            <path d="M0,172v-172h172v172z" fill="none"></path>
                                            <path d="M0,172v-172h172v172z" fill="none"></path>
                                            <path d="M3.44,168.56v-165.12h165.12v165.12z" fill="none"></path>
                                            <path d="" fill="none"></path>
                                            <path d="" fill="none"></path>
                                            <g fill="#ffffff">
                                                <path
                                                    d="M160.53333,39.77213c-5.4868,2.43667 -11.38067,4.0764 -17.56693,4.816c6.31813,-3.784 11.1628,-9.77533 13.44467,-16.91907c-5.90533,3.50307 -12.4528,6.04867 -19.42453,7.42467c-5.57853,-5.94547 -13.52493,-9.66067 -22.31987,-9.66067c-16.8904,0 -30.5816,13.69693 -30.5816,30.5816c0,2.39653 0.2752,4.73573 0.7912,6.966c-25.41587,-1.2728 -47.94787,-13.4504 -63.038,-31.9576c-2.62587,4.51787 -4.13373,9.7696 -4.13373,15.38253c0,10.60667 5.39507,19.9692 13.59947,25.45027c-5.01093,-0.16053 -9.72947,-1.53653 -13.85173,-3.82413c0,0.13187 0,0.25227 0,0.38413c0,14.82067 10.53787,27.18173 24.53293,29.98533c-2.5628,0.69947 -5.26893,1.07213 -8.06107,1.07213c-1.96653,0 -3.8872,-0.19493 -5.75053,-0.54467c3.89293,12.14893 15.1876,20.99547 28.5692,21.242c-10.46333,8.2044 -23.65,13.09493 -37.98333,13.09493c-2.46533,0 -4.902,-0.14333 -7.29853,-0.43c13.5364,8.67453 29.60693,13.73707 46.88147,13.73707c56.25547,0 87.00907,-46.60053 87.00907,-87.0148c0,-1.3244 -0.02867,-2.64307 -0.086,-3.956c5.97987,-4.3172 11.16853,-9.7008 15.26787,-15.82973z">
                                                </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        <?php } ?>
                        <?php if(isset($instagram)){ ?>
                            <a href="<?=$instagram?>" class="icon mr-3" target="_blank">
                                <i class="fab fa-instagram"></i>
                            </a>
                        <?php } ?>
                        <?php if(isset($voc)){ ?>
                            <a href="<?=$voc?>" class="icon mr-3" target="_blank">
                                <i class="fas fa-envelope"></i>
                            </a>
                        <?php } ?>
                        <?php if(isset($web)){ ?>
                            <a href="<?=$web?>" class="icon mr-3" target="_blank">
                                <i class="fas fa-globe-americas"></i>
                            </a>
                        <?php } ?>
                    </p>
                </div>
                <div class="contact col-12 offset-md-1 col-md-6 offset-lg-0 col-lg-7 d-block d-md-none">
                    <p class="text-white contact_us">Power by</p>
                    <p class="group_icon text-white">
                        <a href="https://www.nrct.go.th/" class="mx-2" target="_blank">
                            <img class="local_contact shadow-drop-bottom" src="assets/image/logo_nrct.png" alt="">
                        </a>
                        <a href="https://www.nrct.go.th/" class="mx-2" target="_blank">
                            <img class="local_contact shadow-drop-bottom" src="assets/image/logo_nrct5G.png" alt="">
                        </a>
                        <a href="https://www.cmuccdc.org/" class="mx-2" target="_blank">
                            <img class="local_contact shadow-drop-bottom" src="assets/image/logo_ccdc.png" alt="">
                        </a>
                        <a href="https://www.cmuccdc.org/aboutus" class="mx-2" target="_blank">
                            <img class="local_contact shadow-drop-bottom" src="assets/image/logo_dustboy.png" alt="">
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
<footer class="footer">
    <?php if(empty($footer_repoting)){ ?>
        <p class="mb-0"><?= $footer ?></p>
    <?php }else{ ?>
        <p class="float-sm-left mb-0"><?= $footer ?></p>
        <p class="page_views fade_in float-sm-right mb-0"> <?php include('assets/js/google.repoting.php'); ?> </p>
    <?php } ?>
</footer>