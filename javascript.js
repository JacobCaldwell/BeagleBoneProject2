var current_switch_state = '';

$(document).ready(function(){
	var current_date = function(){
    		var date = new Date();
    		if (date.getMinutes() == 0 && date.getSeconds() == 5){
    		    update_temp();
            }
    		date = date.toString().split("GMT")[0]

     		 $("#current-time").text(date);
 	 }
    get_ip();
	current_date();
	get_serv_up();
	get_temp();
	update_temp();
	setInterval(current_date, 1000);
	setInterval(get_serv_up,1000);
	setInterval(get_switch,100);
	setInterval(get_temp,5000);
});

function get_serv_up(){
	var uptime ='';
    $.ajax({ url: 'index.php',
        data: {action: 'get_serv_up'},
        type: 'get',
        success: function(data) {
			uptime = parseInt(data.split(" ")[0]);
			$('#server-uptime').text(seconds_to_dhms(uptime));
        }
    });
}

function get_ip(){
    $.ajax({ url: 'index.php',
        data: {action: 'get_ip'},
        type: 'get',
        success: function(data) {
            $('#server-ip').text(data);
        }
    });
}

function get_switch(){
    $.ajax({ url: 'index.php',
        data: {action: 'get_switch'},
        type: 'get',
        success: function(data) {
            change_switch(data.replace(/[\n\r]+/g, ''));
        }
    });
}

function get_temp(){
    $.ajax({ url: 'index.php',
        data: {action: 'get_temp'},
        type: 'get',
        success: function(data) {
            $("#current-temp").text(data);
        }
    });
}

function update_temp(){
    $.ajax({ url: 'index.php',
        data: {action: 'update_temp'},
        type: 'get',
        success: function(data) {
            obj = JSON.parse(data);

            var temp_list = [];
            $("#temp_history").empty();
            obj.data.forEach(function(element){
                temp_list.push(parseFloat(element.temp));
                $(''+'<li class="list-group-item d-flex justify-content-between align-items-center">'+element.date+'<span class="badge badge-primary badge-pill">'+element.temp+'ºF</span> </li>').prependTo("#temp_history");
            });
            temp_list.sort();
            $("#low-temp").text(temp_list[0]);
            $("#high-temp").text(temp_list[temp_list.length-1]);

        }
    });
}


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



