'use strict';

angular.module('processAdminApp.constants')
  .factory('appContext', function ($log, localServices, $q, localStorageService) {

    let factory = {};
    // Main app context object
    factory.appContextObject = {validate: false};

    /**
     * init method
     * body of the object
     */
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
        localServices.getAppContext()
          .then((response) => {
            factory.appContextObject = response;
            factory.appContextObject.validate = true;
            localStorageService.set('appContextObject', factory.appContextObject);
            $log.info('[getAppContext] factory.appContextObject.sodEndpoint: ' + factory.appContextObject.sodEndpoint);
            deferred.resolve(factory.appContextObject);

          }).catch((err) => {
            deferred.reject();
            $log.info('[logout] Error ');
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
      localServices.deleteAppContext().then(res => {
        deferred.resolve(factory.appContextObject);
      }).catch((err) => {
        deferred.reject();
      });

      return deferred.promise;
    };

    return factory;
  });
