$('#meal-list').live('pageshow', function (event, ui) {
	$.mobile.showPageLoadingMsg();
	$('#p-meal-list-link').attr('href', localStorage.getItem('rootPage'));
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : 'https://rails-alacarte-server.herokuapp.com/menu_items.json'
	}).success(function jsSuccess(data, textStatus, jqXHR){
		console.log("Successfully got meal list");
		writeMeals(data);
		console.log(textStatus);
		console.log(jqXHR);
	}).error(function jsError(jqXHR, textStatus, errorThrown){
		console.log('Error while getting meal list');
		console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
	});
});


function writeMeals(data){

	var weekdays_names = ["Domingo", "Segunda-feira", "Ter&#231;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&#225;bado"];
	var content = '<ul data-role="listview" data-autodividers="true" class="ui-listview">';	
	var curr_day = "";
	var meal_count = 0;

	$.each(data, function(i, rest){
		meal_count++;

		var meals_left = rest['max_reservations'] - rest['cur_reservations'];

		var name = rest['name'];

		var img = rest['image'];

		if(img == null){
			img = "images/default_restaurant.gif";
		}
		else{
			img = "https://rails-alacarte-server.herokuapp.com/assets/" + img
		}

		var price = rest['price'];

		var id = rest['id'];

		var date = rest['date'];

		if(date != curr_day){
			//Adicionar novo divisor
			var date_aux = new Date(date);
			var weekday = weekdays_names[date_aux.getDay()];
			content += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-c">'+weekday+', '+date+'</li>';
		}
		//Senão, adicionar só os items.
		curr_day = date;

		content = content + '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text">'
		+ '<a href="meal_info.html?id=' + id + '" rel="external" class="ui-link-inherit">'
		+ '<img src="' + img + '" class="ui-li-image-thumb"/>'
		+ '<h3 class="ui-li-heading">' + name + '</h3>'
		+ '<p class="ui-li-desc">' + price + ' cr&#233;ditos ('+meals_left+' pratos dispon&#237;veis)</p>'
		+ '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>';
	});

	content = content + '</ul>';

	if(meal_count == 0){
		content = content + 'Restaurante sem refei&#231;&otilde;es dispon&#237;veis';
	}

	$.mobile.hidePageLoadingMsg();
	$("[data-role=content]").html(content);
}
