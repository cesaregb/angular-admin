'use strict';

angular.module('processAdminApp')
  .factory('AddressHandler', function (noty, $log, factoryServices, $timeout, messageHandler, googleMapsDirections, _, appContext, $q) {
    // TODO check == vs === for a lot of them

    let divContent = '<div class="col-lg-12" id="mapContainer"> <input id="pac-input" class="controls" type="text" placeholder="Enter a location"> <div id="type-selector" class="controls"> <input type="radio" name="type" id="changetype-all" checked="checked"> <label for="changetype-all">All<\/label> <input type="radio" name="type" id="changetype-establishment"> <label for="changetype-establishment">Establishments<\/label> <input type="radio" name="type" id="changetype-address"> <label for="changetype-address">Addresses<\/label><\/div><div id="map"><\/div>';

    let factory = {};
    let center = null;
    let distanceInfo = [];

    factory.circlesTemplates = [
      {
        id: 4,
        center: {
          lat: 20.621335,
          lng: -103.418127
        },
        radius: 1000 * 24, //  mts
        stroke: {
          color: '#800000',
          weight: 2,
        },
        fill: {
          color: '#800000',
          opacity: 0.5
        },
        geodesic: false,
        draggable: false,
        clickable: false,
        editable: false,
        visible: false,
        control: {}
      }, {
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
    factory.circles = [];

    /**
     * Call all the async gathering data methods.
     * initialize the gMap after is complete
     */
    function asyncInitialization(){
      let deferred = $q.defer();
      if (distanceInfo.length > 0 ){
        deferred.resolve();
      }
      let promises = [factoryServices.getResources('distanceInfo')];
      $q.all(promises).then((values) => {
        factory.setDistanceInfo(values[0]);
        deferred.resolve();
      });
      return deferred.promise;
    }

    function validateAHFactory() {
      if (!Boolean(distanceInfo) || distanceInfo.length < 1) {
        messageHandler.showError('No distanceInfo Found');
        return false;
      }
      if (!Boolean(factory.tersusLatLng)) {
        messageHandler.showError('No store info Found');
        return false;
      }
      return true;
    }

    function createCircleTemplates() {
      let i = 0;
      distanceInfo.forEach(function (item) {
        let circleTemplate = factory.circlesTemplates[i];
        i++;
        circleTemplate.radius = 1000 * item.distance;
        factory.circles.push(circleTemplate);
      });
    }

    function showMap(){
      $timeout(() => {
        initGMaps();
        factory.addExistingMarker();
      }, 100);
    }

    /**
     * google related logic
     */
    function initGMaps() {
      $('#' + factory.componentContainer).html(divContent);
      // google provided code...
      let map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        scrollwheel: false,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      let input = /** @type {!HTMLInputElement} */ (
        document.getElementById('pac-input'));

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      let types = document.getElementById('type-selector');
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

      let options = {
        componentRestrictions: {
          country: 'mx'
        }
      };

      let autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.bindTo('bounds', map);
      autocomplete.setTypes([]);

      let infowindow = new google.maps.InfoWindow();
      let marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      autocomplete.addListener('place_changed', function () {
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
        marker.setIcon(/** @type {google.maps.Icon} */ ({
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
        radioButton.addEventListener('click', function () {
          autocomplete.setTypes(types);
        });
      }

      setupClickListener('changetype-all', []);
      setupClickListener('changetype-address', ['address']);
      setupClickListener('changetype-establishment', ['establishment']);
      // setupClickListener('changetype-geocode', ['geocode']);

      factory.map = map;

      google.maps.event.addListener(factory.map, 'click', function (event) {
        addAddressMarker(event.latLng);
      });

    }

    factory.setStore = function (store) {
      if (Boolean(store.lat) && Boolean(store.lng)){
        factory.tersusLatLng = new google.maps.LatLng(store.lat, store.lng);
        center = {lat: store.lat, lng: store.lng};
        factory.circlesTemplates.forEach((it) => {
          it.center = center;
        });
      }

    };

    factory.setDistanceInfo = function (_distanceInfo) {
      distanceInfo = _.sortBy(_distanceInfo, 'distance');
    };

    factory.resetValues = function () {
      factory.circlesVisible = false;
      factory.address = {};
      factory.place = null;
      factory.markers = [];
      factory.existingMarker = false;
      factory.addressParsed = false;
      factory.distance = 0;
      factory.distancePrice = 0;

      // these variables settup the env.
      factory.map = null;
    };

    /**
     * initialize map with a address
     * @param address
     */
    factory.initMap = function (address) {
      factory.address = (Boolean(address))?address:null;
      asyncInitialization().then(()=>{
        createCircleTemplates();
        // initialize the component only once, after that only showing and hiding the component is enough
        showMap();
      });
    };

    factory.hideMap = function(){
      $("#map").hide();
    };

    factory.addExistingMarker = function () {
      if (factory.address == null || factory.address.lat == null || factory.address.lng == null) {
        return;
      }
      let selectedPlaceLatLng = new google.maps.LatLng(factory.address.lat, factory.address.lng);
      addMarker(selectedPlaceLatLng);
    };

    /**
     * gets a location and add the marker panning to the location.
     * @param location
     */
    function addMarker(location){
      // clear markers
      if (factory.existingMarker && factory.markers.length > 0) {
        factory.markers.forEach(function (item) {
          item.setMap(null);
        });
        factory.markers = [];
      }

      // add marker
      let marker = new google.maps.Marker({
        position: location,
        map: factory.map
      });

      factory.markers.push(marker);
      factory.existingMarker = true;
      factory.map.panTo(location);
    }

    /**
     * add Marker but + validations
     * @param location
     */
    function addAddressMarker(location) {
      if (factory.place == null) {
        messageHandler.showError('Please make a search before creating marker.');
        return;
      }
      addMarker(location);
      factory.address.lat = location.lat();
      factory.address.lng = location.lng();
    }

    let circleObj = [];
    /**
     * display price circles
     */
    factory.createCircles = function () {
      if (factory.circlesVisible) {
        factory.circlesVisible = false;
        circleObj.forEach(function (item) {
          item.setMap(null);
        });

      } else {
        factory.circlesVisible = true;
        factory.circles.forEach(function (item) {
          let priceCircle = new google.maps.Circle({
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

    // requires to have initialized the tersus address
    // require to have the endpoint address
    factory.calculateDistancePrice = function () {
      let deferred = $q.defer();
      asyncInitialization().then(()=>{
        factory.distancePrice = 0;
        factory.distance = 0;
        googleMapsDirections.calculateDistancePrice(factory.tersusLatLng, factory.address, distanceInfo).then((result) => {
          factory.distancePrice = result.distancePrice;
          factory.distance = result.distance;
          deferred.resolve();
        });
      });
      return deferred.promise;
    };

    /**
     * calculateDistancePrice entering address
     * @param address
     */
    factory.calculateDistancePriceByAddress = function (address) {
      factory.address = address;
      return factory.calculateDistancePrice();
    };

    factory.parseAddress = function () {
      factory.calculateDistancePrice();

      if (factory.place == null) {
        messageHandler.showError('Please search by address first');
      } else {
        let components = factory.place.address_components;
        factory.addressParsed = true;
        components.forEach(function (item) {
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

    };

    function initFactory() {
      factory.resetValues();
      factory.setStore(appContext.appContextObject.store);
    }
    initFactory();


    return factory;
  });
