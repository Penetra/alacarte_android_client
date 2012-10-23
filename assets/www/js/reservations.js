$('[data-role=page]').live('pageshow', function (event, ui) {
	$.mobile.showPageLoadingMsg();
	$.ajax({
		//Auth_token? User?
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/reservations.json'
	}).success(function jsSuccess(data, textStatus, jqXHR){
		console.log("Successfully got reservations list");
		writeReservations(data);
		console.log(textStatus);
		console.log(jqXHR);
	}).error(function jsError(jqXHR, textStatus, errorThrown){
		console.log('error while getting reservations list');
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
});


function writeReservations(data){
	
	var content = '<ul data-role="listview" class="ui-listview">';
	
	$.each(data, function(i, rest){
		
		var name = rest['name'];
		var img = rest['image'];
		
		if(img == null){
			img = "images/default_restaurant.gif";
		}
		
		var desc = rest['description'];
		
		if(desc == null){
			desc = "No description available";
		}
		
		var id = rest['id'];
		
		content = content + '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text">'
		+ '<a href="reservation_info.html?id=' + id +'" rel="external" class="ui-link-inherit">'
					+ '<img src="' + img + '" class="ui-li-image-thumb"/>\
					<h3 class="ui-li-heading">' + name + '</h3>\
					<p class="ui-li-desc">' + desc + '</p>\
				</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
	});
	
	content = content + '</ul>';
	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}
