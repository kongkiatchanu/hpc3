<section id="menu_slide" class="frist">
    <div class="main_menu">
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <a class="nav-link home" href="<?= $page=='home'?'javascript:void(0);':'index.php'; ?>">หน้าหลัก</a>
                <?= $page=='home'?'<div class="line_active"></div>':''; ?>
            </li>
            <li class="nav-item">
                <a class="nav-link pm25nearby" href="<?= $page=='pm25nearby'?'javascript:void(0);':'pm25.php'; ?>">PM<sub>2.5</sub>ตามพิกัด</a>
                <?= $page=='pm25nearby'?'<div class="line_active"></div>':''; ?>
            </li>
            <li class="nav-item">
                <a class="nav-link hourly" href="<?= $page=='hourly'?'javascript:void(0);':'hourly_rank.php'; ?>">ค่าฝุ่นรายชั่วโมง</a>
                <?= $page=='hourly'?'<div class="line_active"></div>':''; ?>
            </li>
            <li class="nav-item">
                <a class="nav-link daily" href="<?= $page=='daily'?'javascript:void(0);':'daily.php'; ?>">ค่าฝุ่นรายวัน</a>
                <?= $page=='daily'?'<div class="line_active"></div>':''; ?>
            </li>
        </ul>
    </div>
</section>