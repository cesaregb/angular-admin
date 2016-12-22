'use strict';

(function() {

function authInterceptor($rootScope, $q, $cookies, $injector, Util, $log) {
  var state;
  return {
    // Add authorization token to headers
    request(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token')) {

        if (Util.isSameOrigin(config.url)){
          // $log.info('[Token 1]');
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }else{
          config.headers.Authorization = 'Bearer ' + $cookies.get('sodAuthToken');
        }
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      if (response.status === 401) {
        (state || (state = $injector.get('$state'))).go('login');
        // remove any stale tokens
        $cookies.remove('token');
      }
      return $q.reject(response);
    }
  };
}

angular.module('processAdminApp.auth')
  .factory('authInterceptor', authInterceptor);

})();
