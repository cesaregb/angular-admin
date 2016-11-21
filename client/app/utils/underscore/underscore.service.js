'use strict';

function underscoreService($window) {
  return $window._;
}

angular.module('processAdminApp')
  .factory('_', underscoreService);
