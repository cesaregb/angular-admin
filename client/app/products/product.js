'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('products', {
        cache: false,
        abstract: true,
        controller: 'ProductMainControllerCtrl',
        url: '/products',
        template: '<ui-view/>'
      }).state('products.productMenu', {
        url: '/productMenu',
        template: '<product-menu></product-menu>'
      }).state('products.productType', {
        url: '/productType',
        template: '<product-type></product-type>',
        params: {
          product: null
        }
      }).state('products.product', {
        url: '/product',
        template: '<product></product>',
        params: {
          product: null
        }
      });
  });
