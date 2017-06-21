'use strict';

angular.module('processAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cashOut', {
        url: '/cashOut',
        template: '<cash-out></cash-out>'
      });
  });
