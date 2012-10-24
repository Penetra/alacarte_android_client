$('[data-role=page]').live('pageshow', function (event, ui) {
	
	//alert("OLA")
	$.mobile.showPageLoadingMsg();
	
	var restaurant_id = getURLParameter('res_id');
	
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/restaurants/'+restaurant_id+'/menu_items.json'
	}).success(function jsSuccess(data, textStatus, jqXHR){
		console.log("Successfully got meals list");
		writeMeals(data);
		console.log(textStatus);
		console.log(jqXHR);
	}).error(function jsError(jqXHR, textStatus, errorThrown){
		console.log('error while getting meals list');
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
});

function getURLParameter(name) {
    return decodeURIComponent((RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}



function writeMeals(data){
	
	//var content = '<ul data-role="listview" class="ui-listview">';
	
	var content = '<ul data-role="listview" data-autodividers="true" class="ui-listview">';	
	
	var curr_day = "";
	
	$.each(data, function(i, rest){
		var places_left = rest['max_reservations'] - rest['cur_reservations'];
		//alert(places_left);

		var name = rest['name'];
		
		var img = rest['image'];
		
		if(img == null){
			img = "images/default_restaurant.gif";
		}

		var price = rest['price'];
		
		var id = rest['id'];
		
		var date = rest['date'];
		
		if(date != curr_day){
			//Adicionar novo divisor
			content += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-b">'+date+'</li>';
		}
		//Sen�o, adicionar s� os items.
		curr_day = date;

		content = content + '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text">'
		+ '<a href="meal_info.html?id=' + id +'&seats='+places_left+'" rel="external" class="ui-link-inherit">'
		+ '<img src="' + img + '" class="ui-li-image-thumb"/>\
		<h3 class="ui-li-heading">' + name + '</h3>\
		<p class="ui-li-desc">&#8364;' + price + ' ('+places_left+' places left)</p>\
		</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
		
	});

	content = content + '</ul>';
	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);

}