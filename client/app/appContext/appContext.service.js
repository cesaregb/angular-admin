'use strict';

angular.module('processAdminApp.constants')
  .factory('appContext', function (factoryServices, factoryUtils, $log, $http, $q, localStorageService) {

    let factory = {};

    factory.init = function(){
      factory.appContextObject = {
        validate: false,
        sodToken: '',
        sodEndpoint: '',
        menu: [],
        store: null
      };
    };

    factory.init();

    factory.getAppContext = function() {
      let deferred = $q.defer();

      // get it from localstorage
      if(localStorageService.isSupported) {
        factory.appContextObject = localStorageService.get('appContextObject');
      }

      if (Boolean(factory.appContextObject) &&  Boolean(factory.appContextObject.validate)){
        // we have the object in context
        return $q.when(factory.appContextObject);

      }else{
        // fetch it from
        $http.get('/api/appContext/id').then(response => {
          factory.appContextObject = response.data;
          factory.appContextObject.validate = true;
          localStorageService.set('appContextObject', factory.appContextObject);
          $log.info('[getAppContext] factory.appContextObject.sodEndpoint: ' + factory.appContextObject.sodEndpoint);
          deferred.resolve(factory.appContextObject);

        });
      }
      return deferred.promise;
    };

    factory.distroy = function(){
      let deferred = $q.defer();

      // remove from local
      factory.init();

      // remove from local storage.
      localStorageService.remove('appContextObject');

      // remove from services.
      $http.delete('/api/appContext').then(res => {
        $log.info('[logout] res.data: ' + JSON.stringify(res.data, null, 2));
        deferred.resolve(factory.appContextObject);
      })
      .catch(err => {
        deferred.reject();
        $log.info('[logout] Error ');
      });

      return deferred.promise;
    };

    factory.sodEndpoint = "";
    factory.sodToken = "";
    factory.appMenu = [];
    factory.store = null;

    factory.store = {};
    factory.sodAuthToken = "";
    factory.siteMenu = [];

    return factory;

  });
