'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('specs', {
        cache: false,
        abstract: true,
        controller: 'SpecMainControllerCtrl',
        url: '/specs',
        template: '<ui-view/>'
      }).state('specs.specMenu', {
        url: '/specMenu',
        template: '<spec-menu></spec-menu>'
      }).state('specs.spec', {
        url: '/spec',
        template: '<spec></spec>',
        params: {
          spec: null
        }
      }).state('specs.specsValue', {
        url: '/specaValue',
        template: '<specs-value></specs-value>',
        params: {
          spec: null
        }
      });
  });
