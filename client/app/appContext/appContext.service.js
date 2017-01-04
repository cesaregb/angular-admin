'use strict';

function appContextCtl($log, localServices, $q, localStorageService) {

  var factory = {};

  // Main app context object

  factory.appContextObject = {
    validate: false
  };

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

        }).catch(() => {
        deferred.reject();
        $log.info('[logout] Error ');
      });

    }
    return deferred.promise;

  };

  factory.destroy = function(){
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
}

angular.module('processAdminApp')
  .factory('appContext', appContextCtl);
