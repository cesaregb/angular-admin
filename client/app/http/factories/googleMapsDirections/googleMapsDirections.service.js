'use strict';

function googleMapsDirectionsService($log, $q) {

  var factory = {};

  var directionsService = new google.maps.DirectionsService();

  factory.getLatLng = function(lat, lng){
    return new google.maps.LatLng(lat, lng);
  };

  factory.getRequestObject = function (start, end){
    var request = {
      origin      : start,
      destination : end,
      travelMode  : google.maps.DirectionsTravelMode.DRIVING
    };
    return request;
  };

  factory.getDistance = function(request){
    var deferred = $q.defer();
    directionsService.route(request, function(response, status) {
      if ( status == google.maps.DirectionsStatus.OK ) {
        deferred.resolve(response.routes[0].legs[0].distance.value);
      }
      else {
        deferred.reject(status);
      }
    });
    return deferred.promise;
  };

  return factory;
}


angular.module('processAdminApp')
  .factory('googleMapsDirections', googleMapsDirectionsService);
