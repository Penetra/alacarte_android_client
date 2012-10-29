var id = -1;

var my_position_lat = -1.1;
var my_position_long = -1.1;

var my_position_exists = new Boolean(0);

var current_restaurant = null;

var map;
var lat;
var long;

$('#restaurant-localization').live('pagecreate', function () {
	$.mobile.showPageLoadingMsg();	
	
	current_restaurant = JSON.parse(localStorage.getItem("current_restaurant"));
	id = current_restaurant['id'];
	
	//initializeMap(current_restaurant);
	$.mobile.hidePageLoadingMsg();
});

$('#p-back-button').live('click', function(){
	$.mobile.changePage("restaurant_info.html?id=" + id, null, true, true);
});

document.addEventListener("deviceready", onDeviceReady, false);
//Cordova is ready

var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {
	setCanvasSize(window.orientation);
	google.maps.event.trigger(map,'resize');
    map.setCenter(new google.maps.LatLng(String((parseFloat(lat) + my_position_lat) / 2), String((parseFloat(long) + my_position_long) /2)));
}, false);

function onDeviceReady() {
	navigator.geolocation.getCurrentPosition(myPositionSuccess, myPositionError, {maximumAge: 300000, timeout:10000, enableHighAccuracy : true});
};

function myPositionSuccess(position){
	my_position_lat = position.coords.latitude;
	my_position_long = position.coords.longitude;
	my_position_exists = true;
	console.log(my_position_lat);
	console.log(my_position_long);
	initializeMap();
}

function myPositionError(error){
	console.log("Error while determining position: "+ error.message);
	initializeMap();
}

function setCanvasSize(orientation){
	
	var maxWidth = window.innerWidth;
	var maxHeight = window.innerHeight;
	
	if(orientation == 0 || orientation == 180){
		$('#map_canvas').css("height", 800);
		$('#map_canvas').css("width", 570);
	}
	else{
		$('#map_canvas').css("height", 450);
		$('#map_canvas').css("width", 920);
	}
}

function initializeMap() {
	// Directions declarations
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();
	
	var coords = current_restaurant['coordinates'].split(',');	
	lat = coords[0];
	long = coords[1];
	var name = current_restaurant['name'];
	
	$("[data-role=header] h1").html(name);
	
	//setCanvasSize();
	
	$('#map_canvas').css("height", 800);
	$('#map_canvas').css("width", 570);
	
	var restaurant_position = new google.maps.LatLng(lat, long);
	
	if(my_position_exists == true){
		var my_position = new google.maps.LatLng(String(my_position_lat), String(my_position_long));
		var center = new google.maps.LatLng(String((parseFloat(lat) + my_position_lat) / 2), String((parseFloat(long) + my_position_long) /2));
		var mapOptions = { center : center, zoom : 15, mapTypeId : google.maps.MapTypeId.HYBRID };
	}
	else{
		var mapOptions = { center : restaurant_position, zoom : 15	, mapTypeId : google.maps.MapTypeId.HYBRID };
	}
    
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	//Associate map to directions
	directionsDisplay.setMap(map);
	directionsDisplay.suppressMarkers = true;
    
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
        		//using square brackets and a string value as its
        		// "property."
        		travelMode: google.maps.TravelMode["WALKING"]
        };
        directionsService.route(request, function(response, status) {
        	if (status == google.maps.DirectionsStatus.OK) {
        		directionsDisplay.setDirections(response);
        	}
        });        
    }
}