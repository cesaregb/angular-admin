'use strict';

angular.module('processAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('clientEdit', {
        url: '/clientEdit',
        template: '<client-edit></client-edit>',
        params : {client : null}
      });
  });
