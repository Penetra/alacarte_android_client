$('.p-meal-info').live('pageshow', function (event, ui) {
	$.mobile.showPageLoadingMsg();

	var id = getURLParameter('id');

	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/menu_items/' + id + '.json'
	}).success(function jsSuccess(menu_item, textStatus, jqXHR){
		getRestaurant(menu_item['restaurant_id']);
		writeMealInfo(menu_item);
	}).error(function jsError(jqXHR, textStatus, errorThrown){
		alert('Error while getting meal info');
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
});

function getURLParameter(name) {
	return decodeURIComponent((RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}

function getRestaurant(id){
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/restaurants/' + id + '.json'
	}).success(function jsSuccess(restaurant, textStatus, jqXHR){
		localStorage.setItem('current_restaurant', JSON.stringify(restaurant));
		return true;
	}).error(function jsError(jqXHR, textStatus, errorThrown){
		alert('Error while getting restaurant info');
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
		return true;
	});
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

	var content = '<div class="meal_info_img"><img src="' + img + '" class="ui-li-image"/></div>'

	content += '<div class="meal_info_details"><p>' + price + ' cr&#233;ditos (' + available_food + ' por&#231;&otilde;es restantes no dia ' + date + ').</p></div>';

	if(localStorage.getItem('auth_token')){
		content += '<div class="options_buttons" data-role="controlgroup" class="ui-controlgroup-controls"><div class="ui-controlgroup-controls">';
		content += '<a href="make_reservation.html" data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c">';
		content += '<span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Efectuar Reserva</span></span></a></div></div>';
		localStorage.setItem('current_meal', JSON.stringify(data));
	}
	else{
		content += '<h3>Necessita de iniciar sess&atilde;o para efectuar uma reserva</h3>';
	}

	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}
