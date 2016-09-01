'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('subproducts', {
        cache: false,
        abstract: true,
        controller: 'SubproductMainControllerCtrl',
        url: '/subproducts',
        template: '<ui-view/>'
      }).state('subproducts.subproductMenu', {
        url: '/subproductMenu',
        template: '<subproduct-menu></subproduct-menu>'
      }).state('subproducts.subproductType', {
        url: '/subproductType',
        template: '<subproduct-type></subproduct-type>',
        params: {
          subproduct: null
        }
      }).state('subproducts.subproduct', {
        url: '/subproduct',
        template: '<subproduct></subproduct>',
        params: {
          subproduct: null
        }
      });
  });
