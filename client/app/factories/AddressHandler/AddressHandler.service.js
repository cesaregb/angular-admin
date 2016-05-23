'use strict';

angular.module('processAdminApp')
  .factory('AddressHandler', function (noty, $log) {
    var factory = {};

    //********** Routes CRUD
    factory.circles = [{
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

    factory.resetValues = function(){
      factory.tersusLatLng = new google.maps.LatLng(20.621335, -103.418127);
      factory.circlesVisible = false;
      factory.address = {};
      factory.place = null;
      factory.map = null;
      factory.markers = [];
      factory.existingMarker = false;
      factory.addressParsed = false;
      factory.distance = 0;
      factory.distancePrice = 0;
    }

    factory.initMap = function() {

      factory.resetValues();
      // google provided code...
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
        factory.place = place;

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

      factory.map = map;

      google.maps.event.addListener(map, 'click', function(event) {
        factory.placeMarker(event.latLng);
      });

    };

    factory.setAddress = function(address){
      factory.address = address;
    }

    factory.addExistingMarker = function () {
      if (factory.address != null && factory.address.lat != null && factory.address.lng != null) {
        var selectedPlaceLatLng = new google.maps.LatLng(factory.address.lat, factory.address.lng);
        // add marker
        var marker = new google.maps.Marker({
          position: selectedPlaceLatLng,
          map: factory.map
        });

        factory.markers.push(marker);
        factory.existingMarker = true;
        factory.map.panTo(selectedPlaceLatLng);
      }
    };


    factory.placeMarker = function (location) {
      // console.log("location: " + JSON.stringify(location));
      if (factory.addressParsed) {
        noty.showNoty({
          text: "Please make a search before creating marker.",
          ttl: 1000 * 2,
          type: "warning"
        });
      } else if (factory.place == null) {
        noty.showNoty({
          text: "Please search by address first",
          ttl: 1000 * 2,
          type: "warning"
        });
      } else {

        // clear markers
        if (factory.existingMarker && factory.markers.length > 0) {
          factory.markers.forEach(function(item) {
            item.setMap(null);
          });
          factory.markers = [];
        }
        // add marker
        var marker = new google.maps.Marker({
          position: location,
          map: factory.map
        });

        factory.markers.push(marker);
        factory.existingMarker = true;
        factory.map.panTo(location);

        // addong lat and lng
        factory.address.lat = location.lat();
        factory.address.lng = location.lng();
      }
    }

    var circleObj = [];
    factory.createCircles = function() {
      if (factory.circlesVisible) {
        factory.circlesVisible = false;
        circleObj.forEach(function(item) {
          item.setMap(null);
        });

      } else {

        factory.circlesVisible = true;
        factory.circles.forEach(function(item) {
          var priceCircle = new google.maps.Circle({
            strokeColor: item.stroke.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: item.fill.color,
            fillOpacity: 0.35,
            map: factory.map,
            center: item.center,
            radius: item.radius
          });
          circleObj.push(priceCircle);
        });
      }
    };

    var addressParsed = false;

    factory.parseAddress = function(callback) {
      var selectedPlaceLatLng = new google.maps.LatLng(factory.address.lat, factory.address.lng);
      factory.distance = google.maps.geometry.spherical.computeDistanceBetween(factory.tersusLatLng, selectedPlaceLatLng);

      if (factory.distance < 2000) {
        factory.distancePrice = 20;
      } else if (factory.distance > 2000 && factory.distance < 4000) {
        factory.distancePrice = 25;
      } else if (factory.distance > 4000) {
        factory.distancePrice = 30;
      }
      factory.distance = factory.distance/1000;
      factory.distance = Math.round(factory.distance);

      if (factory.place == null) {
        noty.showNoty({
          text: "Please search by address first",
          ttl: 1000 * 2,
          type: "warning"
        });
      } else {
        var components = factory.place.address_components;
        factory.addressParsed = true;
        components.forEach(function(item) {
          if ($.inArray('route', item.types) >= 0) {
            factory.address.address = item.long_name;
          }
          if ($.inArray('sublocality', item.types) >= 0) {
            factory.address.address2 = item.long_name;
          }
          if ($.inArray('locality', item.types) >= 0) {
            factory.address.city = item.long_name;
          }
          if ($.inArray('administrative_area_level_1', item.types) >= 0) {
            factory.address.state = item.long_name;
          }
          if ($.inArray('country', item.types) >= 0) {
            factory.address.country = item.long_name;
          }
          if ($.inArray('postal_code', item.types) >= 0) {
            factory.address.zipcode = item.long_name;
          }
        });
      }
      // callback(factory.address);
    };


    return factory;
  });
