
angular.module("myApp", ["firebase", "geolocation"])
.controller("myAppCtrl", ["$scope", "$firebase", "geolocation",
	function($scope, $firebase, geolocation) {

		// Initialize map and centered
		function initMap() {

			navigator.geolocation.getCurrentPosition(function(pos) {

	        	// current location coordinates
	        	var currentCoordinates = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);	        

	        	// map options object
		        var mapOptions = {
		          center: currentCoordinates,
		          zoom: 16,
		          mapTypeId: google.maps.MapTypeId.ROADMAP
		        };

		        // request object for nearby restaurants
		        var request = {
					location: currentCoordinates,
				    radius: '100',
				    types: ['restaurant']
				};
		        
		        // local map object
		        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		        // center map with current location
		        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		        
		        // get list of nearby restaurants
		        //var placesService = new google.maps.places.PlacesService($scope.map);
				//placesService.nearbySearch(request, getNearbyRestaurants);	

	        }, function(error) {
	          	console.log('Unable to get location: ' + error.message);
	        });

	    }

	    // Get list of nearby restaurants based on location
		function getNearbyRestaurants(results, status) {

			if (status == google.maps.places.PlacesServiceStatus.OK) {
			    for (var i = 0; i < results.length; i++) {
			    	
			    	var place_lng = results[i].geometry.location.B;
			    	var place_lat = results[i].geometry.location.k;
			      	//var markerCoor = new google.maps.LatLng(place_lng, place_lat);	      			
	      			//markersArray.push(markerCoor);
			    }
			}
		}

	    google.maps.event.addDomListener(window, 'load', initMap);	  	

	}]
);
