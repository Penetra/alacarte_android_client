$('[data-role=page]').live('pagecreate', function (event, ui) {
	$.mobile.showPageLoadingMsg();
	var id = getURLParameter('id');	
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/restaurants/' + id + '.json'
	}).success(function jsSuccess(data, textStatus, jqXHR){
		console.log("Successfully restaurant with id " + id);
		writeRestaurant(data, id);
		console.log(textStatus);
		console.log(jqXHR);
	}).error(function jsError(jqXHR, textStatus, errorThrown){
		console.log('error while getting restaurant with id ' + id);
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
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
	
	if(desc == null){
		desc = "No description available";
	}
	
	var address = data['address'];
	
	if(address == null){
		address = "No address available";
	}
	
	var content = '<div class="restaurant_info_img"><img src="' + img + '" class="ui-li-image"/></div>' + '<div class="restaurant_info_details"><p>' + desc + '</p></div>';
	
	var coordinates = data['coordinates'];
	
	var name_parsed = name.replace(/ /g,'+');
	
	content += '<div class="options_buttons" data-role="controlgroup" class="ui-controlgroup-controls"><div class="ui-controlgroup-controls"><a href="meal_list.html?res_id='+id+'" data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c" rel="external"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Refei&#231;&otilde;es</span></span></a><a href="restaurant_localization.html?coords='+coordinates+'&name='+ name_parsed + '&id=' + id +'" data-role="button" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-c ui-btn-up-c" rel="external"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Localiza&#231;&atilde;o</span></span></a></div></div>';
	
	/* Padding 5% on each side*/
	var maxWidth = window.innerWidth * 0.9;
	
	/*if(coordinates != null){
		content = content + '<div class="restaurant_info_map"><img class="ui-li-map" src="https://maps.googleapis.com/maps/api/staticmap?center='+coordinates+'&amp;zoom=14&amp;size='+maxWidth+"x"+maxWidth+'&amp;markers='+coordinates+'&amp;sensor=false"/></div>';
	}*/
	
	content += '<div class="restaurant_info_details"><p>' + address + '</p></div>'
	
	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}