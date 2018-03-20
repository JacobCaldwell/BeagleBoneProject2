<?php

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
        case 'getServerUptime' : getServerUptime(); break;
        case 'getIP' : getIP(); break;
		case 'test' : test(); break;
    }
}

function getServerUptime()
{
    echo @file_get_contents('/proc/uptime');
}

function getIP(){
    echo $_SERVER['SERVER_ADDR'];
}

function test(){
    echo @file_get_contents('/sys/class/gpio/gpio68/value');
    echo @file_get_contents('/sys/class/gpio/gpio67/value');
}

?>


