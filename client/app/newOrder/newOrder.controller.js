'use strict';
(function() {

  class NewOrderComponent {


    circlesVisible = false;
    circles = [{
      id: 3,
      center: {
        lat: 20.621335,
        lng: -103.418127
      },
      radius: 3200,
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
      radius: 1600,
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
      radius: 800,
      stroke: {
        color: '#08B21F'
      },
      fill: {
        color: '#08B21F'
      }
    }];

    markers = [];

    constructor($scope, $timeout) {
      var _this = this;
      this.place = null;
      this.$scope = $scope;
      this.objAddress = {};
      this.objAddress.country = "Mexico";
      this.objAddress.state = "Jalisco";
      this.objAddress.city = "Guadalajara";
      this.searchAddress();


      $timeout(function() {

        _this.initAutocomplete();

      }, 100);

      // this.initMap();

    }


    initAutocomplete() {
      var _this = this;
      this.tersusLatLng = new google.maps.LatLng(20.621335, -103.418127);
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 20.621335,
          lng: -103.418127
        },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });

      this.map = map;

      google.maps.event.addListener(map, 'click', function(event) {
        _this.placeMarker(event.latLng);
      });
    }



    placeMarker(location) {
      var _this = this;
      var marker = new google.maps.Marker({
        position: location,
        map: _this.map
      });

      map.panTo(location);
    }

    circleObj = [];
    createCircles() {
      var _this = this;

      if (this.circlesVisible){
        this.circlesVisible = false;
        _this.circleObj.forEach(function(item){
          item.setMap(null);
        });
      }else{
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
      this.map.setCenter(this.tersusLatLng);
    }

    selectTersus() {
      // var zac = new google.maps.LatLng(22.770925, -102.583254);
      this.map.setCenter(this.tersusLatLng);
    }

    placeChanged() {
      var place = this.getPlace();
      console.log('location', place.geometry.location);
      this.map.setCenter(place.geometry.location);
    }


    searchAddress() {
      var addressArr = [];
      if (this.objAddress.address2) addressArr.push(this.objAddress.address2);
      if (this.objAddress.address) addressArr.push(this.objAddress.address);
      if (this.objAddress.city) addressArr.push(this.objAddress.city);
      if (this.objAddress.state) addressArr.push(this.objAddress.state);
      if (this.objAddress.country) addressArr.push(this.objAddress.country);
      this.address = addressArr.join(", ");

      document.getElementById("pac-input").value = this.address;

    }

  }

  angular.module('processAdminApp')
    .component('newOrder', {
      templateUrl: 'app/newOrder/newOrder.html',
      controller: NewOrderComponent,
      controllerAs: '$cn'
    });

})();
