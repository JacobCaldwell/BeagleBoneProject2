<?php

    if (!empty($argv[1])) {
        switch ($argv[1]) {
            case "get_temp_data":
                post_temp(date('Y-m-d H:i'));
                break;
        }
    }

    if(isset($_GET['action']) && !empty($_GET['action'])) {
        $action = $_GET['action'];
        $param = $_GET['param'];
        switch($action) {
            case 'get_serv_up' : get_serv_up(); break;
            case 'get_ip' : get_ip(); break;
            case 'get_switch' : get_switch(); break;
            case 'get_temp': get_temp(); break;
            case 'update_temp': update_temp(); break;

        }
    }

    function get_serv_up()
    {
        echo @file_get_contents('/proc/uptime');
    }

    function get_ip(){
        echo $_SERVER['SERVER_ADDR'];
    }

    function get_switch(){
        echo @file_get_contents('/sys/class/gpio/gpio68/value');
        echo @file_get_contents('/sys/class/gpio/gpio67/value');
    }

    function get_temp()
    {
        $temp = @file_get_contents('/sys/bus/iio/devices/iio:device0/in_voltage1_raw');
        $temp = ((int)$temp*(1800/4096)-500)/10;
        echo round((9/5)*$temp+32, 2);

    }

    function return_temp(){
        $temp = @file_get_contents('/sys/bus/iio/devices/iio:device0/in_voltage1_raw');
        $temp = ((int)$temp*(1800/4096)-500)/10;
        return round((9/5)*$temp+32, 2);
    }

    function post_temp($date){
        $temp = return_temp();
        $file = file_get_contents('/var/www/html/data.json');
        $array = json_decode($file, true);
        $extra = ['temp'=> $temp,'date'=>$date];
        $array['data'][] = $extra;
        if (count($array['data']) > 24){
            array_shift($array['data']);
        }
        $encoded = json_encode($array);
        file_put_contents('/var/www/html/data.json',$encoded);
    }

    function update_temp(){
        echo file_get_contents('/var/www/html/data.json');
    }


?>

