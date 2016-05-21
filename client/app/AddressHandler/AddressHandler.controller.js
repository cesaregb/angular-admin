'use strict';

angular.module('processAdminApp')
  .controller('AddressHandlerCtrl', function ($scope, $stateParams, factoryClients, $timeout, $state, noty) {
    // Start controller

    $scope.circlesVisible = false;
    var circles = [{
      id: 3,
      center: {
        lat: 20.621335,
        lng: -103.418127
      },
      radius: 1000 * 12, //  mts
      stroke: {
        color: '#FF0000',
        weight: 2,
      },
      fill: {
        color: '#FF0000',
        opacity: 0.5
      },
      geodesic: false,
      draggable: false,
      clickable: false,
      editable: false,
      visible: false,
      control: {}
    }, {
      id: 2,
      center: {
        lat: 20.621335,
        lng: -103.418127
      },
      radius: 1000 * 6,
      stroke: {
        color: '#E8AD3C'
      },
      fill: {
        color: '#E8AD3C'
      }
    }, {
      id: 1,
      center: {
        lat: 20.621335,
        lng: -103.418127
      },
      radius: 1000 * 3,
      stroke: {
        color: '#08B21F'
      },
      fill: {
        color: '#08B21F'
      }
    }];

    $scope.init = function () {
      $scope.noty = noty;
      // console.log("$scope: "  + $scope.$parent.appModule);

      $scope.client = $stateParams.client;
      $scope.$state = $state;
      $scope.place = null;
      // console.log("$stateParams: " + JSON.stringify($stateParams));
      $scope.address = $stateParams.address;
      $scope.factoryClients = factoryClients;


      if ($scope.client == null) {
        $scope.$state.go('client.all', null, {
          reload: true
        });
      } else {
        $scope.title = "New address";
        $scope.newAddress = true;
        if ($scope.address != null && $scope.address.address != null) {
          $scope.newAddress = false;
          $scope.title = "Edit address";
        }
        $scope.title = $scope.title + " -- Client: " + $scope.client.name
        $scope.existingMarker = false;
        $scope.markers = [];

        $timeout(function() {
          $scope.initMap();
        }, 100);
      }
    }

    $scope.init();

    $scope.initMap() {

      $scope.tersusLatLng = new google.maps.LatLng(20.621335, -103.418127);
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 20.621335,
          lng: -103.418127
        },
        scrollwheel: false,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });


      var input = /** @type {!HTMLInputElement} */ (
        document.getElementById('pac-input'));

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      var types = document.getElementById('type-selector');
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

      var options = {
        componentRestrictions: {
          country: 'mx'
        }
      };

      var autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.bindTo('bounds', map);
      autocomplete.setTypes([]);

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        $scope.place = place;

        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setIcon( /** @type {google.maps.Icon} */ ({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
      });

      // Sets a listener on a radio button to change the filter type on Places Autocomplete.
      function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        radioButton.addEventListener('click', function() {
          autocomplete.setTypes(types);
        });
      }

      setupClickListener('changetype-all', []);
      setupClickListener('changetype-address', ['address']);
      setupClickListener('changetype-establishment', ['establishment']);
      // setupClickListener('changetype-geocode', ['geocode']);

      $scope.map = map;

      google.maps.event.addListener(map, 'click', function(event) {
        $scope.placeMarker(event.latLng);
      });
      $scope.addExistingMarker();
    }


    function addExistingMarker() {
      if ($scope.address != null && $scope.address.lat != null && $scope.address.lng != null) {
        var selectedPlaceLatLng = new google.maps.LatLng($scope.address.lat, $scope.address.lng);
        // add marker
        var marker = new google.maps.Marker({
          position: selectedPlaceLatLng,
          map: $scope.map
        });

        $scope.markers.push(marker);
        $scope.existingMarker = true;
        $scope.map.panTo(selectedPlaceLatLng);
      }
    }

    function placeMarker(location) {
      // console.log("location: " + JSON.stringify(location));
      if ($scope.addressParsed) {
        $scope.noty.showNoty({
          text: "Please make a search before creating marker.",
          ttl: 1000 * 2,
          type: "warning"
        });
      } else if ($scope.place == null) {
        $scope.noty.showNoty({
          text: "Please search by address first",
          ttl: 1000 * 2,
          type: "warning"
        });
      } else {

        // clear markers
        if ($scope.existingMarker && $scope.markers.length > 0) {
          $scope.markers.forEach(function(item) {
            item.setMap(null);
          });
          $scope.markers = [];
        }
        // add marker
        var marker = new google.maps.Marker({
          position: location,
          map: $scope.map
        });

        $scope.markers.push(marker);
        $scope.existingMarker = true;
        $scope.map.panTo(location);

        // addong lat and lng
        $scope.address.lat = location.lat();
        $scope.address.lng = location.lng();

      }
    }

    var circleObj = [];
    $scope.createCircles = function() {
      if ($scope.circlesVisible) {
        $scope.circlesVisible = false;
        $scope.circleObj.forEach(function(item) {
          item.setMap(null);
        });

      } else {

        $scope.circlesVisible = true;
        circles.forEach(function(item) {
          var priceCircle = new google.maps.Circle({
            strokeColor: item.stroke.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: item.fill.color,
            fillOpacity: 0.35,
            map: $scope.map,
            center: item.center,
            radius: item.radius
          });
          $scope.circleObj.push(priceCircle);
        });
      }
    };


    var addressParsed = false;
    var distance = 0;
    var distancePrice = 0;
    $scope.parseAddress = function() {
      var selectedPlaceLatLng = new google.maps.LatLng($scope.address.lat, $scope.address.lng);
      $scope.distance = google.maps.geometry.spherical.computeDistanceBetween($scope.tersusLatLng, selectedPlaceLatLng);

      if ($scope.distance < 2000) {
        $scope.distancePrice = 20;
      } else if ($scope.distance > 2000 && $scope.distance < 4000) {
        $scope.distancePrice = 25;
      } else if ($scope.distance > 4000) {
        $scope.distancePrice = 30;
      }
      $scope.distance = $scope.distance/1000;
      $scope.distance = Math.round($scope.distance);

      if ($scope.place == null) {
        $scope.noty.showNoty({
          text: "Please search by address first",
          ttl: 1000 * 2,
          type: "warning"
        });
      } else {
        // adding address info from the place
        // console.log("$scope.place: " + JSON.stringify($scope.place));
        var components = $scope.place.address_components;
        $scope.addressParsed = true;
        components.forEach(function(item) {
          if ($.inArray('route', item.types) >= 0) {
            $scope.address.address2 = item.long_name;
          }
          if ($.inArray('sublocality', item.types) >= 0) {
            $scope.address.address = item.long_name;
          }
          if ($.inArray('locality', item.types) >= 0) {
            $scope.address.city = item.long_name;
          }
          if ($.inArray('administrative_area_level_1', item.types) >= 0) {
            $scope.address.state = item.long_name;
          }
          if ($.inArray('country', item.types) >= 0) {
            $scope.address.country = item.long_name;
          }
          if ($.inArray('postal_code', item.types) >= 0) {
            $scope.address.zipcode = item.long_name;
          }
        });
      }
    };

    $scope.saveAddress = function() {
      if ($scope.address.idAddressNumber != null && $scope.address.idAddressNumber > 0) {
        // update address
        $scope.factoryClients.updateAddressCallback($scope.address, function() {
          $scope.$state.go('client.address', {
            client: $scope.client
          }, {
            reload: true
          });
        });
      } else {
        // save new address
        $scope.factoryClients.saveAddressCallback($scope.address, function() {
          $scope.$state.go('client.address', {
            client: $scope.client
          }, {
            reload: true
          });
        });
      }
    };

    //END controller
  });
