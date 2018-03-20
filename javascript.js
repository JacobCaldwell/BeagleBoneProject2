var current_switch_state = '';

$(document).ready(function(){
	var current_date = function(){
    		var date = new Date();
    		date = date.toString().split("GMT")[0]

     		 $("#current-time").text(date);
 	 }
    getIP();
	setInterval(current_date, 1000);
	setInterval(getUp,1000);
	setInterval(test,100);

});

function getUp(){
	var uptime ='';
    $.ajax({ url: 'index.php',
        data: {action: 'getServerUptime'},
        type: 'post',
        success: function(data) {
			uptime = parseInt(data.split(" ")[0]);
			$('#server-uptime').text(seconds_to_dhms(uptime));
        }
    });
}

function getIP(){
    var uptime ='';
    $.ajax({ url: 'index.php',
        data: {action: 'getIP'},
        type: 'post',
        success: function(data) {
            $('#server-ip').text(data);
        }
    });
}

function test(){
    var uptime ='';
    $.ajax({ url: 'index.php',
        data: {action: 'test'},
        type: 'post',
        success: function(data) {
            change_switch(data.replace(/[\n\r]+/g, ''));
        }
    });
}

//function getUp2(){
//	var ut = "<?php serverUp();?>";
//	console.log(ut);
//}


function change_switch(data){
    if (current_switch_state != data) {

        current_switch1 = current_switch_state.substring(0, 1);
        current_switch2 = current_switch_state.substring(1, 2);
        switch1 = data.substring(0, 1);
        switch2 = data.substring(1, 2);

        current_switch_state = data;
        console.log('true');

        if(current_switch1 != switch1) {
            switch (switch1) {
                case '0':
                    $('#switch1').removeClass();
                    $('#switch1').addClass("card bg-danger");
                    $("#switch1_label").text('OFF');
                    $("#switch1_history").text(new Date().toLocaleString());
                    break
                case '1':
                    $('#switch1').removeClass();
                    $('#switch1').addClass("card bg-success");
                    $("#switch1_label").text('ON');
                    $("#switch1_history").text(new Date().toLocaleString());

                    break
            }
        }
        if(current_switch2 != switch2) {
            switch (switch2) {
                case '0':
                    $('#switch2').removeClass();
                    $('#switch2').addClass("card bg-danger");
                    $("#switch2_label").text('OFF');
                    $("#switch2_history").text(new Date().toLocaleString());

                    break
                case '1':
                    $('#switch2').removeClass();
                    $('#switch2').addClass("card bg-success");
                    $("#switch2_label").text('ON');
                    $("#switch2_history").text(new Date().toLocaleString());


                    break
            }
        }

    }

}

function seconds_to_dhms(seconds){
	var days = Math.floor(seconds/86400);
	var hours = Math.floor((seconds % 86400) / 3600);
	var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
	var seconds = ((seconds % 86400) % 3600) % 60;

	return days + "D:"+ hours+"H:" +minutes+"M:" + seconds+ "S";

}



