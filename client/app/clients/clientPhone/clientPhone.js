'use strict';

angular.module('processAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('clientPhone', {
        url: '/clientPhone',
        template: '<client-phone></client-phone>'
      });
  });
