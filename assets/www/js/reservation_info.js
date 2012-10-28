$('.p-reservation-info').live('pageshow', function (event, ui) {
	$.mobile.showPageLoadingMsg();
	
	var id = getURLParameter('id');

	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/reservations/' + id + '.json',
		data : {
			auth_token : localStorage.getItem('auth_token')
		}
	}).success(function jsSuccess(data, textStatus, jqXHR){
		console.log("Successfully got reservation info");
		writeReservationInfo(data);
		console.log(textStatus);
		console.log(jqXHR);
	}).error(function jsError(jqXHR, textStatus, errorThrown){
		console.log('error while getting reservation info');
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
});

function getURLParameter(name) {
    return decodeURIComponent((RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}

function writeReservationInfo(data){
		
	var name = data['name'];
	$('.p-res-info-header h1').html(name);
	
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

	var date = data.date;
	
	var id = data.id;
		
	var content = '<div class="restaurant_info_img"><img src="' + img + '" class="ui-li-image"/></div>' + '<div class="meal_info"><p>Pre&#231;o: ' + price + '</p></div>'
					+ '<div class="date"><p>Data: ' + date + '</p></div>';


	$('#qrcode').qrcode({
		width: 100,
		height: 100,
		text: date + '_' + id + '_' + localStorage.getItem('username')
	});

	
	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}