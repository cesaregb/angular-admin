'use strict';
(function() {

  class NewOrderComponent {


    // var marker = new google.maps.Marker({
    // // The below line is equivalent to writing:
    // // position: new google.maps.LatLng(-34.397, 150.644)
    //   position: {lat: -34.397, lng: 150.644},
    //   map: map
    // });

    constructor($scope, uiGmapGoogleMapApi) {
      var _this = this;
      this.place = null;
      this.uiGmapGoogleMapApi = uiGmapGoogleMapApi;
      this.$scope = $scope;
      this.objAddress = {};
      this.objAddress.country = "Mexico";
      this.objAddress.state = "Jalisco";
      this.objAddress.city = "Guadalajara";
      this.searchAddress();

      uiGmapGoogleMapApi.then(function(maps) {
        _this.tersusLatLng = new google.maps.LatLng(20.621335, -103.418127);
      });

      this.$scope.mySearchValue = null;
      this.$scope.$watch('mySearchValue', this.searchValueChanged());

      this.initMap();
    }

    searchValueChanged(newValue, oldValue){
      return () => {
        if (newValue == oldValue) {
          return null;
        } else {
          console.log("the value changed to " + newValue);
        }
      }
    }

    initMap() {
      var _this = this;
      this.$scope.map = {
        center: {
          latitude: 20.621335,
          longitude: -103.418127
        },
        zoom: 15,
        searchbox: {
          template: 'searchbox.tpl.html',
          events: {
            places_changed: function(searchBox) {
              console.log("place changed: " + JSON.stringify(searchBox));
            }
          }
        }
      };
      this.$scope.options = {
        scrollwheel: false
      };
      this.$scope.circles = [{
        id: 3,
        center: {
          latitude: 20.621335,
          longitude: -103.418127
        },
        radius: 3200,
        stroke: {
          color: '#FF0000',
          weight: 2,
          opacity: 1
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
          latitude: 20.621335,
          longitude: -103.418127
        },
        radius: 1600,
        stroke: {
          color: '#E8AD3C',
          weight: 2,
          opacity: 1
        },
        fill: {
          color: '#E8AD3C',
          opacity: 0.5
        },
        geodesic: false,
        draggable: false,
        clickable: false,
        editable: false,
        visible: false,
        control: {}
      }, {
        id: 1,
        center: {
          latitude: 20.621335,
          longitude: -103.418127
        },
        radius: 800,
        stroke: {
          color: '#08B21F',
          weight: 2,
          opacity: 1
        },
        fill: {
          color: '#08B21F',
          opacity: 0.5
        },
        geodesic: false,
        draggable: false,
        clickable: false,
        editable: false,
        visible: true,
        control: {}
      }];

      this.$scope.marker = {
        id: Date.now()
      }

      var events = {
        places_changed: function(searchBox) {
          var place = searchBox.getPlaces()[0];
          console.log(place.geometry.location.lat());
          var lat = place.geometry.location.lat(),
            lon = place.geometry.location.lng();
          _this.$scope.marker = {
            id: Date.now(),
            coords: {
              latitude: lat,
              longitude: lon
            }
          };
          _this.$scope.map.center = {
            latitude: lat,
            longitude: lon
          };
        }
      }
      this.$scope.searchbox = {
        template: 'searchbox.tpl.html',
        events: events
      };

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

      console.log("mySearchValue: " + this.$scope.mySearchValue);

      this.$scope.mySearchValue = 'porfaaaa';

    }

  }

  angular.module('processAdminApp')
    .component('newOrder', {
      templateUrl: 'app/newOrder/newOrder.html',
      controller: NewOrderComponent,
      controllerAs: '$cn'
    });

})();
