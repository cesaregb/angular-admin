'use strict';

angular.module('processAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('client', {
        cache: false,
        url: '/client',
        template: '<client></client>'
      })
    ;
  });
