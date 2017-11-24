var text1 = $("#text1");
var text2 = $("#text2");
var text3 = $("#text3");
var btn = $("#btn");
TweenLite.from(text1, 5, {autoAlpha:0, letterSpacing:6, delay:0.5}); 
TweenLite.from(text2, 5, {autoAlpha:0, delay:5}); 
TweenLite.from(text3, 5, {autoAlpha:0, delay:8}); 
TweenLite.from(btn, 5, {autoAlpha:0, delay:12});

$(".map-container").hide();
var locations = [];

document.getElementById("btn").onclick = function(){

    $(".start-container").hide();
    $(".map-container").show();
    
    var error, map, autoUpdate;
    var options = {
        enableHighAccuracy: true,
        maximumAge: 0 
    } 
    
    function initMap() {
        // Geolocation is working, if not: error messages 
	   	  if(navigator.geolocation){
	   	  	navigator.geolocation.getCurrentPosition(getLocation, error, options);
	   	  }else{
	   	  	alert("Geolocation is not supported by your browser");
	   	  }
    }
    
    function errorHandler(err) {
        if(err.code == 1) {
            alert("Error: Nekad åtkomst!");
        }
        else if( err.code == 2) {
            alert("Error: Din position kunde inte hittas!");
        }
    }
    
    function getLocation(position) {
        // Get the coordinates from the position object
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        // var accuracy = position.coords.accuracy;

        // Constructs a new Google maps object, adds 
        // properties to the map including the center and zoom level.)
        map = new google.maps.Map(document.getElementById('map'), { 
	      		center: {
	      			lat: latitude,
	      			lng: longitude
	      			},
	      		zoom: 15
        });
        
        // Saves all the markers positions
        locations.push({lat: latitude, lng: longitude});
	      
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var marker = function(element, i) {
            return new google.maps.Marker({
               	 position: element,
               	 map:map,
               	 label: labels[i % labels.length]
            });
        };
    
        // The 'locations' array's map method calls the function 'marker' for each array element
        locations.map(marker);

        // Draws lines between each marker
        var line = new google.maps.Polyline({
            path: locations,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 10,
            map: map
        });

        // Updates position search every 10th second
        autoUpdate = setTimeout(initMap, 10000);
    }
    
    initMap();
    
    document.getElementById("btn-done").onclick = function(){
        alert("Snyggt!");
        clearTimeout(autoUpdate);
    };
};	
