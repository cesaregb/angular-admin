'use strict';

angular.module('processAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('clientAddress', {
        url: '/clientAddress',
        template: '<client-address></client-address>'
      });
  });
