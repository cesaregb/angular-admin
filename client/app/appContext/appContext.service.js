'use strict';

angular.module('processAdminApp.constants')
  .factory('appContext', function (factoryServices, factoryUtils, $log, Auth) {

    var factory = {};

    factory.sodEndpoint = "";
    factory.sodToken = "";
    factory.appMenu = [];
    factory.store = null;





    factory.store = {};
    factory.sodAuthToken = "";
    factory.siteMenu = [];

    factory.initializeStore = function(){
      // TODO load user store, or how can we select the correct one.
      factoryServices.getResources('stores').then((stores) => {
        // select the valid store.
        factory.store = stores[0];
        $log.info('[run] idStore: ' + factory.store.idStore);
      });
    };

    function processMenu(result){
      $log.info('[initializeMenu] menu.size:: ' + result.length);
      factory.siteMenu = result;
    }

    factory.initializeAppMenu =function(){

      // TODO what is the access level of the logged user...
      Auth.isLoggedIn(function(result){
        if (result){
          var level = (Auth.isAdmin())?2:1;
          factoryUtils.getMenuByAccessLevel( level ).then( processMenu );
        }
      });
    };

    return factory;

  });
