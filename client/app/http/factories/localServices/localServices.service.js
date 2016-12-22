'use strict';

angular.module('processAdminApp')
  .factory('localServices', function ($http, $q, constants, messageHandler, $log) {

    let factory = {};

    factory.getAppContext = function(){
      let deferred = $q.defer();
      $http.get( '/api/appContext/id' )
        .success( (data, status, headers, config)=>{
          deferred.resolve(data);
        })
        .error(function(response){
          messageHandler.showError('Error getting data ' + response.message);
          deferred.reject(response);
        });

      return deferred.promise;
    };

    factory.deleteAppContext = function(){
      let deferred = $q.defer();

      $http.delete( '/api/appContext' )
        .success( (data, status, headers, config) => {
          deferred.resolve(data);
        })
        .error(function(response){
          messageHandler.showError('Error getting data ' + response.message);
          deferred.reject(response);
        });

      return deferred.promise;
    };

    return factory;

  });
