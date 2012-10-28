$('.restaurant-info').live('pageshow', function (event, ui) {
	$.mobile.showPageLoadingMsg();
	
	var current_restaurant = JSON.parse(localStorage.getItem('current_restaurant'));
	
	if(current_restaurant == null){
		var id = getURLParameter('id');
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : 'https://rails-alacarte-server.herokuapp.com/restaurants/' + id + '.json'
		}).success(function jsSuccess(data, textStatus, jqXHR){
			console.log("Successfully restaurant with id " + id);
			localStorage.setItem("current_restaurant", JSON.stringify(data));
			writeRestaurant(data, id);
			console.log(textStatus);
			console.log(jqXHR);
		}).error(function jsError(jqXHR, textStatus, errorThrown){
			console.log('error while getting restaurant with id ' + id);
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		});
	}
	else{
		writeRestaurant(current_restaurant, current_restaurant.id);
	}
});

function getURLParameter(name) {
    return decodeURIComponent((RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}

function writeRestaurant(data, id){
	var name = data['name'];
	$("[data-role=header] h1").html(name);
	
	var img = data['image'];
	
	if(img == null){
		img = "images/default_restaurant.gif";
	}
	
	var desc = data['description'];
	
	var address = data['address'];
	
	var content = '<div class="restaurant_info_img"><img src="' + img + '" class="ui-li-image"/></div>';
	
	if(desc != null){
		content += '<div class="restaurant_info_details"><p>' + desc + '</p></div>';
	}
	
	content += '<div class="options_buttons" data-role="controlgroup" class="ui-controlgroup-controls"><div class="ui-controlgroup-controls"><a href="restaurant_meal_list.html" data-role="button" rel="external" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c" rel="external"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Refei&#231;&otilde;es</span></span></a><a href="restaurant_localization.html" data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c" rel="external"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Localiza&#231;&atilde;o</span></span></a></div></div>';
	
	if(address != null){
		content += '<div class="restaurant_info_details"><p>' + address + '</p></div>';
	}
	
	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}