$('.p-meal-info').live('pageshow', function (event, ui) {
	$.mobile.showPageLoadingMsg();
	
	var id = getURLParameter('id');
	writeMealInfo(id);
});

function getURLParameter(name) {
    return decodeURIComponent((RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}

function writeMealInfo(id){
	
	var current_restaurant = JSON.parse(localStorage.getItem("current_restaurant"));
	var data = null;

	// match current id with meal from current_restaurant
	$.each(current_restaurant.meals, function(i, rest){
		if(rest.meal.id == id){
			data = rest.meal;
		}
	});
		
	var name = data['name'];
		
	$('#p-restaurant-meal-info-link').attr('href', 'restaurant_info.html?id=' + data.id);
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
		
	var content = '<div class="meal_info_img"><img src="' + img + '" class="ui-li-image"/></div>'
	
	content += '<div class="options_buttons" data-role="controlgroup" class="ui-controlgroup-controls"><div class="ui-controlgroup-controls"><a href="#" data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c" ><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Mais informa&#231;&otilde;es</span></span></a><a href="make_reservation.html?meal_id='+id+'" data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c" rel="external"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Efectuar reserva</span></span></a></div></div>';
	
	content += '<div class="meal_info_details"><p>&#8364;'+price+'; '+available_food+' por&#231;&otilde;es restantes no dia '+date+'.</p></div>';
			
	/* Padding 5% on each side*/
	var maxWidth = window.innerWidth * 0.9;
	
	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}