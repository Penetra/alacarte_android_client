var id = -1;

var my_position_lat = -1.1;
var my_position_long = -1.1;

var my_position_exists = new Boolean(0);

$('#restaurant-localization').live('pagecreate', function () {
	$.mobile.showPageLoadingMsg();	
	var current_restaurant = JSON.parse(localStorage.getItem("current_restaurant"));
	id = current_restaurant['id'];
	
	initializeMap(current_restaurant);
	$.mobile.hidePageLoadingMsg();
});

$('.p-back-button').live('click', function(){
	$.mobile.changePage("restaurant_info.html?id=" + id, null, true, true);
});

function myPositionSuccess(position){
	my_position_lat = position.coords.latitude;
	my_position_long = position.coords.longitude;
	my_position_exists = true;
}

function myPositionError(error){
	console.log("Error while determining position: "+ error.message);
}

function initializeMap(current_restaurant) {
	// Directions declarations
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();
	
	var coords = current_restaurant['coordinates'].split(',');	
	var lat = coords[0];
	var long = coords[1];
	var name = current_restaurant['name'];
	
	$("[data-role=header] h1").html(name);
	
	var maxWidth = window.innerWidth * 0.9;
	var maxHeight = window.innerHeight * 0.8;
	
	$('#map_canvas').css("width", maxWidth);
	$('#map_canvas').css("height", maxHeight);
	
	var restaurant_position = new google.maps.LatLng(lat, long);
	
	try{
		navigator.geolocation.getCurrentPosition(myPositionSuccess, myPositionError);
	} catch (error){
		alert("Error while determining position! Reason: " + error);
	}
	
	if(my_position_exists == true){
		var my_position = new google.maps.LatLng(String(my_position_lat), String(my_position_long));
		var center = new google.maps.LatLng(String((parseFloat(lat) + my_position_lat) / 2), String((parseFloat(long) + my_position_long) /2));
		var mapOptions = { center : center, zoom : 15, mapTypeId : google.maps.MapTypeId.HYBRID };
	}
	else{
		var mapOptions = { center : restaurant_position, zoom : 15	, mapTypeId : google.maps.MapTypeId.HYBRID };
	}
    
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	//Associate map to directions
	directionsDisplay.setMap(map);
    
	var markerOptions = { position : restaurant_position, map : map };
	if(my_position_exists == true){
	    var markerOptions2 = { position : my_position , map : map};
	    var marker2 = new google.maps.Marker(markerOptions2);
	}
    
	var marker = new google.maps.Marker(markerOptions);
    
    var contentString = "<h4>" + name + "</h4>";
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    google.maps.event.addListener(marker, 'click', function() {
    	  infowindow.open(map,marker);
    });
    
    if(my_position_exists == true){
    	var yourPosition = "<h4>Your Location</h4>";
    	var infowindow2 = new google.maps.InfoWindow({ content: yourPosition });
        google.maps.event.addListener(marker2, 'click', function() {
        	  infowindow.open(map,marker2);
        });
        
        
        //Add directions by foot
        var request = {
        	      origin: my_position,
        	      destination: restaurant_position,
        	      // Note that Javascript allows us to access the constant
        	      // using square brackets and a string value as its
        	      // "property."
        	      travelMode: google.maps.TravelMode["WALKING"]
        	  };
        	  directionsService.route(request, function(response, status) {
        	    if (status == google.maps.DirectionsStatus.OK) {
        	      directionsDisplay.setDirections(response);
        	    }
        	  });
        
    }
       
    google.maps.event.trigger(map,'resize');
}