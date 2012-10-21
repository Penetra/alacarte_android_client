$('[data-role=page]').live('pageshow', function (event, ui) {
	$.mobile.showPageLoadingMsg();
	var id = getURLParameter('id');	
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/restaurants/' + id + '.json'
	}).success(function jsSuccess(data, textStatus, jqXHR){
		console.log("Successfully restaurant with id " + id);
		writeRestaurant(data);
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

function writeRestaurant(data){
	var name = data['name'];
	$("[data-role=header]").html("<h5>" + name + "</h5>");
	
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
	
	var content = '<div class="restaurant_info_img"><img src="' + img + '" class="ui-li-image"/></div>' + '<div class="restaurant_info_details"><p>' + desc + '</p><p>' + address + '</p></div>';
	
	var coordinates = data['coordinates'];
	
	if(coordinates != null){
		content = content + '<div class="restaurant_info_map"><img class="ui-li-map" src="https://maps.googleapis.com/maps/api/staticmap?center='+coordinates+'&amp;zoom=14&amp;size=100x100&amp;markers='+coordinates+'&amp;sensor=false"/></div>';
	}
	
	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}