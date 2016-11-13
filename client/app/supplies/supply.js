'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('supplies', {
        cache: false,
        abstract: true,
        controller: 'SupplyMainControllerCtrl',
        url: '/supplies',
        template: '<ui-view/>'
      }).state('supplies.supplyMenu', {
        url: '/supplyMenu',
        template: '<supply-menu></supply-menu>'
      }).state('supplies.supplyType', {
        url: '/supplyType',
        template: '<supply-type></supply-type>',
        params: {
          supply: null
        }
      }).state('supplies.supply', {
        url: '/supply',
        template: '<supply></supply>',
        params: {
          supply: null
        }
      });
  });
