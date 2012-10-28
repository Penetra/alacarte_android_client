$('.p-meal-info').live('pageshow', function (event, ui) {
	$.mobile.showPageLoadingMsg();
	
	var id = getURLParameter('id');
	
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/menu_items/' + id + '.json'
	}).success(function jsSuccess(data, textStatus, jqXHR){
		console.log("Successfully got meal info");
		writeMealInfo(data);
		console.log(textStatus);
		console.log(jqXHR);
	}).error(function jsError(jqXHR, textStatus, errorThrown){
		console.log('error while getting meal info');
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
});

function getURLParameter(name) {
    return decodeURIComponent((RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}

function writeMealInfo(data){
		
	var name = data['name'];
	$('.p-rest-meal-header h1').html(name);
	
	var img = data['image'];
	
	if(img == null){
		img = 'images/default_restaurant.gif';
	}
	else{
		img = "https://rails-alacarte-server.herokuapp.com/assets/" + img;
	}
	
	var price = data['price'];
	
	if(price == null){
		price = "No price available";
	}
	
	var available_food = data['max_reservations'] - data['cur_reservations'];;
	var date = data.date;
	
	var id = data.id;
		
	var content = '<div class="restaurant_info_img"><img src="' + img + '" class="ui-li-image"/></div>' + '<div class="meal_info"><p>Pre&#231;o: ' + price + '</p></div>'
					+ '<div class="places_available"><p>Pratos dispon&#237;veis: ' + available_food + '</p></div>'
					+ '<div class="date"><p>Data: ' + date + '</p></div>';
	
	if(localStorage.getItem('auth_token')){
		content += '<div class="options_buttons" data-role="controlgroup" class="ui-controlgroup-controls"><div class="ui-controlgroup-controls"><a href="make_reservation.html?meal_id='+id+'&date='+date+'" data-role="button" rel="external" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Efectuar Reserva</span></span></a></div></div>';
	}
	else{
		content += '<h3>Necessita de iniciar sess&atilde;o para efectuar uma reserva</h3>';
	}
	localStorage.setItem('curr_meal_cost', price);
	/* Padding 5% on each side*/
	var maxWidth = window.innerWidth * 0.9;
	
	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}