'use strict';

angular.module('processAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newOrder', {
        url: '/newOrder',
        template: '<new-order></new-order>'
      });
  });
