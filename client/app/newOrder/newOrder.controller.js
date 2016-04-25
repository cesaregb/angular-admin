'use strict';
(function() {

  class NewOrderComponent {

    clientMap = {
      center: {
        latitude: 20.621335,
        longitude: -103.418127
      },
      zoom: 15
    };
    options = {
      scrollwheel: false
    };

    constructor($scope, uiGmapGoogleMapApi) {
      var _this = this;
      this.$scope = $scope;
      this.uiGmapGoogleMapApi = uiGmapGoogleMapApi;

      this.add = {};
      this.add.country = "Mexico";
      this.add.state = "Jalisco";
      this.add.city = "Guadalajara";
      this.add.address = "Bosques de la victoria";
      this.add.address2 = "Peninsula";

      this.fullAddressString = "Mexico, Gudalajara, Catedral";

      // this.$scope.markersAndCircleFlag = true;
      // this.$scope.$watch('markersAndCircleFlag', this.watchCallback);
    }

    searchAddress() {
      var _this = this;
      var fullAddressArr = [this.add.country, this.add.state, this.add.city, this.add.address, this.add.address2];
      this.fullAddressString = fullAddressArr.join(", ");

      console.log("address: " + this.fullAddressString);

      this.uiGmapGoogleMapApi.then(function(maps) {
        var geocoder = new maps.Geocoder();
        geocoder.geocode({
          'address': "Mexico, Zacatecas, Zacatecas"
        }, function(results, status) {
          console.log("result!!!! " + JSON.stringify(results));
          if (status == google.maps.GeocoderStatus.OK && results.length > 0) {

            _this.clientMap.map.panTo(results[0].geometry.location.lat(), results[0].geometry.location.lng());


            _this.clientMap.center.latitude = results[0].geometry.location.lat();
            _this.clientMap.center.longitude = results[0].geometry.location.lng();
            console.log("lat: " + _this.clientMap.center.latitude);
            console.log("lng: " + _this.clientMap.center.longitude);
          }
        });
      });

      // this.clientMap.control.refresh({latitude: , longitude: });

    }

    circles = [{
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
      geodesic: false, // optional: defaults to false
      draggable: false, // optional: defaults to false
      clickable: false, // optional: defaults to true
      editable: false, // optional: defaults to false
      visible: false, // optional: defaults to true
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
      geodesic: false, // optional: defaults to false
      draggable: false, // optional: defaults to false
      clickable: false, // optional: defaults to true
      editable: false, // optional: defaults to false
      visible: false, // optional: defaults to true
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
      geodesic: false, // optional: defaults to false
      draggable: false, // optional: defaults to false
      clickable: false, // optional: defaults to true
      editable: false, // optional: defaults to false
      visible: true, // optional: defaults to true
      control: {}
    }];

    watchCallback(oldV, newV) {
      return () => {}
    }

  }

  angular.module('processAdminApp')
    .component('newOrder', {
      templateUrl: 'app/newOrder/newOrder.html',
      controller: NewOrderComponent,
      controllerAs: '$cn'
    });

})();
