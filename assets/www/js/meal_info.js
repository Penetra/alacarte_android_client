$('[data-role=page]').live('pageshow', function (event, ui) {
	$.mobile.showPageLoadingMsg();
	
	var id = getURLParameter('id');
	var available_seats = getURLParameter('seats');
	var date = getURLParameter('date');
	
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/meals/' + id + '.json'
	}).success(function jsSuccess(data, textStatus, jqXHR){
		console.log("Successfully received meal with id " + id);
		writeMealInfo(data, id, available_seats, date);
		console.log(textStatus);
		console.log(jqXHR);
	}).error(function jsError(jqXHR, textStatus, errorThrown){
		console.log('error while getting meal with id ' + id);
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
});

function getURLParameter(name) {
    return decodeURIComponent((RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}

function writeMealInfo(data, id, available_seats, date){
	var name = data['name'];
		
	//TODO- Not showing. CSS?
	$("[data-role=header] h1").html(name);
	
	//var img = data['image'];
	var img = null;
	
	if(img == null){
		img = "images/default_restaurant.gif";
	}
	
	var price = data['price'];
	
	if(price == null){
		price = "No price available";
	}
		
	var content = '<div class="meal_img"><img src="' + img + '" class="ui-li-image"/></div>' + '<div class="meal_info"><p>Pre&#231;o: &#8364;' + price + '</p></div>'
					+ '<div class="places_available"><p>Lugares disponiveis: ' + available_seats + '</p></div>'
					+ '<div class="date"><p>Data: ' + date + '</p></div>';
		
	content += '<div class="options_buttons" data-role="controlgroup" class="ui-controlgroup-controls"><div class="ui-controlgroup-controls"><a href="make_reservation.html?meal_id='+id+'&date='+date+'" data-role="button" rel="external" class="ui-btn ui-btn-corner-all ui-btn-hover-c ui-btn-up-c">Efectuar Reserva</a></div></div>';
	
	/* Padding 5% on each side*/
	var maxWidth = window.innerWidth * 0.9;
	
	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}