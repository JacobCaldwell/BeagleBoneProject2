<?php
    if(isset($_POST['action']) && !empty($_POST['action'])) {
        $action = $_POST['action'];
        switch($action) {
            case 'getServerUptime' : getServerUptime(); break;
            case 'getIP' : getIP(); break;
            case 'getSwitch' : getSwitch(); break;
            case 'getTemp': getTemp(); break;
            case 'writeTemp': writeTemp(); break;
        }
    }

    function getServerUptime()
    {
        echo @file_get_contents('/proc/uptime');
    }

    function getIP(){
        echo $_SERVER['SERVER_ADDR'];
    }

    function getSwitch(){
        echo @file_get_contents('/sys/class/gpio/gpio68/value');
        echo @file_get_contents('/sys/class/gpio/gpio67/value');
    }

    function getTemp()
    {
        $temp = @file_get_contents('/sys/bus/iio/devices/iio:device0/in_voltage1_raw');
        $temp = ((int)$temp*(1800/4096)-500)/10;
        echo round((9/5)*$temp+32, 2);
    }

    function writeTemp(){
        $file = fopen("temp.json","w");
        fwrite($file,"{asdfk:asdfasd}");
        fclose($file);

    }


?>