'use strict';

function appContextCtl($log, localServices, $q, localStorageService) {
  let factory = {};

  factory.appContextObject = {};
  function cleanAppContext() {
    factory.appContextObject = {
      validate: false,
      sodToken: '',
      sodEndpoint: '',
      menu: [],
      store: null
    };
  }

  cleanAppContext();

  function isContextObjectExisting() {
    return Boolean(factory.appContextObject) && Boolean(factory.appContextObject.validate);
  }

  factory.getAppContext = function () {
    let deferred = $q.defer();

    if (localStorageService.isSupported) {
      factory.appContextObject = localStorageService.get('appContextObject');
    }

    if (isContextObjectExisting()) {
      return $q.when(factory.appContextObject);
    } else {
      // fetch it from
      localServices.getAppContext()
        .then((response) => {
          factory.appContextObject = response;
          factory.appContextObject.validate = true;
          localStorageService.set('appContextObject', factory.appContextObject);

          deferred.resolve(factory.appContextObject);
        }).catch(() => {
        deferred.reject();
      });

    }
    return deferred.promise;
  };

  factory.destroy = function () {
    let deferred = $q.defer();
    cleanAppContext();
    localStorageService.remove('appContextObject');
    localServices.deleteAppContext().then((res) => {
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
