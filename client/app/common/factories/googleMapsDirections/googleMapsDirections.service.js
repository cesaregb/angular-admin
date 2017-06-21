'use strict';

function googleMapsDirectionsService($log, $q) {
  let factory = {};
  let directionsService = new google.maps.DirectionsService();
  factory.getLatLng = function (lat, lng) {
    return new google.maps.LatLng(lat, lng);
  };

  factory.getRequestObject = function (start, end) {
    let request = {
      origin: start,
      destination: end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    return request;
  };

  factory.getDistance = function (request) {
    let deferred = $q.defer();
    directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        deferred.resolve(response.routes[0].legs[0].distance.value);
      } else {
        deferred.reject(status);
      }
    });
    return deferred.promise;
  };


  // requires to have initialized the tersus address
  // require to have the endpoint address
  factory.calculateDistancePrice = function(init, address, distanceInfo){
    let deferred = $q.defer();
    let result = {};
    let end = new google.maps.LatLng(address.lat, address.lng);
    let request = factory.getRequestObject(init, end);
    factory.getDistance(request).then((distance) => {
      result.distance = Math.round(distance / 1000);
      result.distancePrice = 0;
      distanceInfo.forEach( (item) => {
        if (item.distance > result.distance && result.distancePrice === 0) {
          result.distancePrice = item.price;
        }
      });
      // get the last price if is not covered ...
      if (result.distancePrice == 0 && distanceInfo.length > 0) {
        result.distancePrice = distanceInfo[distanceInfo.length - 1].price;
      }

      deferred.resolve(result);

    }, ()=>{
      deferred.reject();

    });

    return deferred.promise;
  };

  return factory;
}


angular.module('processAdminApp')
  .factory('googleMapsDirections', googleMapsDirectionsService);
