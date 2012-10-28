function createAlarm(date, time_slot, name, restaurant_name){
	
	var hours = '';
	var minutes = '';
	
	if(time_slot.length == 4) {
		hours = time_slot.substring(0,2);
		minutes = time_slot.substring(2,4);
	}
	document.addEventListener("deviceready", appReady, false);
	
    function appReady() {
        console.log("Device ready");

        if (typeof plugins !== "undefined") {
            plugins.localNotification.add({
                date : new Date(),
                message : name + ' no ' + restaurant_name + '\r\n' + 'Dia ' + date + ', ' + hours + 'h' + minutes + 'm.' ,
                ticker : "Alerta de Reserva",
                repeatDaily : false,
                id : 123
       	 });
 	   }
	}

	document.addEventListener("deviceready", appReady, false);
	
}