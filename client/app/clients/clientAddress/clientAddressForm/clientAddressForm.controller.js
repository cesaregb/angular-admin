'use strict';
(function() {

  class ClientAddressFormComponent {
    addressFields = [{
      key: 'country',
      type: 'input',
      defaultValue: 'Mexico',
      templateOptions: {
        type: 'text',
        label: 'Country'
      }
    }, {
      key: 'state',
      type: 'input',
      defaultValue: 'Jalisco',
      templateOptions: {
        type: 'text',
        label: 'State'
      }
    }, {
      key: 'zipcode',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Zipcode'
      }
    }, {
      key: 'city',
      type: 'input',
      defaultValue: 'Guadalajara',
      templateOptions: {
        type: 'text',
        label: 'City',
        required: true
      }
    }, {
      key: 'address',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Street and number',
        required: true
      }
    }, {
      key: 'address2',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Neigh',
        required: true
      }
    }];

    circlesVisible = false;
    circles = [{
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

    constructor($scope, $stateParams, factoryClients, $timeout, $state, noty) {
      this.$scope = $scope;
      var _this = this;
      this.noty = noty;
      // console.log("$scope: "  + $scope.$parent.appModule);

      this.client = $stateParams.client;
      this.$state = $state;
      this.place = null;
      // console.log("$stateParams: " + JSON.stringify($stateParams));
      this.address = $stateParams.address;
      this.factoryClients = factoryClients;


      if (this.client == null) {
        this.$state.go('client.all', null, {
          reload: true
        });
      } else {
        this.title = "New address";
        this.newAddress = true;
        if (this.address != null && this.address.address != null) {
          this.newAddress = false;
          this.title = "Edit address";
        }
        this.title = this.title + " -- Client: " + this.client.name
        this.existingMarker = false;
        this.markers = [];

        $timeout(function() {
          _this.initMap();
        }, 100);
      }
    }

    initMap() {
      var _this = this;

      this.tersusLatLng = new google.maps.LatLng(20.621335, -103.418127);
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
        _this.place = place;

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

      this.map = map;

      google.maps.event.addListener(map, 'click', function(event) {
        _this.placeMarker(event.latLng);
      });
      this.addExistingMarker();
    }


    addExistingMarker() {
      if (this.address != null && this.address.lat != null && this.address.lng != null) {
        var selectedPlaceLatLng = new google.maps.LatLng(this.address.lat, this.address.lng);
        // add marker
        var marker = new google.maps.Marker({
          position: selectedPlaceLatLng,
          map: this.map
        });

        this.markers.push(marker);
        this.existingMarker = true;
        this.map.panTo(selectedPlaceLatLng);
      }
    }

    placeMarker(location) {
      // console.log("location: " + JSON.stringify(location));
      if (this.addressParsed) {
        this.noty.showNoty({
          text: "Please make a search before creating marker.",
          ttl: 1000 * 2,
          type: "warning"
        });
      } else if (this.place == null) {
        this.noty.showNoty({
          text: "Please search by address first",
          ttl: 1000 * 2,
          type: "warning"
        });
      } else {

        // clear markers
        if (this.existingMarker && this.markers.length > 0) {
          this.markers.forEach(function(item) {
            item.setMap(null);
          });
          this.markers = [];
        }
        // add marker
        var marker = new google.maps.Marker({
          position: location,
          map: this.map
        });

        this.markers.push(marker);
        this.existingMarker = true;
        this.map.panTo(location);

        // addong lat and lng
        this.address.lat = location.lat();
        this.address.lng = location.lng();

      }
    }

    circleObj = [];
    createCircles() {
      var _this = this;

      if (this.circlesVisible) {
        this.circlesVisible = false;
        _this.circleObj.forEach(function(item) {
          item.setMap(null);
        });

      } else {

        this.circlesVisible = true;
        this.circles.forEach(function(item) {
          var priceCircle = new google.maps.Circle({
            strokeColor: item.stroke.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: item.fill.color,
            fillOpacity: 0.35,
            map: _this.map,
            center: item.center,
            radius: item.radius
          });
          _this.circleObj.push(priceCircle);

        });
      }
      // this.map.setCenter(this.tersusLatLng);
    }


    addressParsed = false;
    distance = 0;
    distancePrice = 0;
    parseAddress() {
      var selectedPlaceLatLng = new google.maps.LatLng(this.address.lat, this.address.lng);
      this.distance = google.maps.geometry.spherical.computeDistanceBetween(this.tersusLatLng, selectedPlaceLatLng);

      if (this.distance < 2000) {
        this.distancePrice = 20;
      } else if (this.distance > 2000 && this.distance < 4000) {
        this.distancePrice = 25;
      } else if (this.distance > 4000) {
        this.distancePrice = 30;
      }
      this.distance = this.distance/1000;
      this.distance = Math.round(this.distance);
      var _this = this;
      if (this.place == null) {
        this.noty.showNoty({
          text: "Please search by address first",
          ttl: 1000 * 2,
          type: "warning"
        });
      } else {
        // adding address info from the place
        // console.log("this.place: " + JSON.stringify(this.place));
        var components = this.place.address_components;
        this.addressParsed = true;
        components.forEach(function(item) {
          if ($.inArray('route', item.types) >= 0) {
            _this.address.address2 = item.long_name;
          }
          if ($.inArray('sublocality', item.types) >= 0) {
            _this.address.address = item.long_name;
          }
          if ($.inArray('locality', item.types) >= 0) {
            _this.address.city = item.long_name;
          }
          if ($.inArray('administrative_area_level_1', item.types) >= 0) {
            _this.address.state = item.long_name;
          }
          if ($.inArray('country', item.types) >= 0) {
            _this.address.country = item.long_name;
          }
          if ($.inArray('postal_code', item.types) >= 0) {
            _this.address.zipcode = item.long_name;
          }
        });
      }
    }

    saveAddress() {
      var _this = this;
      if (_this.address.idAddressNumber != null && _this.address.idAddressNumber > 0) {
        // update address
        _this.factoryClients.updateAddressCallback(_this.address, function() {
          _this.$state.go('client.address', {
            client: _this.client
          }, {
            reload: true
          });
        });
      } else {
        // save new address
        _this.factoryClients.saveAddressCallback(_this.address, function() {
          _this.$state.go('client.address', {
            client: _this.client
          }, {
            reload: true
          });
        });
      }
    }
  }

  angular.module('processAdminApp')
    .component('clientAddressForm', {
      templateUrl: 'app/clients/clientAddress/clientAddressForm/clientAddressForm.html',
      controller: ClientAddressFormComponent,
      controllerAs: '$cn'
    });

})();
