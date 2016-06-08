'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('assets', {
        cache: false,
        abstract: true,
        controller: 'AssetMainControllerCtrl',
        url: '/assets',
        template: '<ui-view/>'
      }).state('assets.assetMenu', {
        url: '/assetMenu',
        template: '<asset-menu></asset-menu>'
      }).state('assets.assetType', {
        url: '/assetType',
        template: '<asset-type></asset-type>',
        params: {
          asset: null
        }
      }).state('assets.asset', {
        url: '/asset',
        template: '<asset></asset>',
        params: {
          asset: null
        }
      });
  });
