'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('services', {
        cache: false,
        abstract: true,
        controller: 'ServiceMainControllerCtrl',
        url: '/services',
        template: '<ui-view/>'
      }).state('services.serviceMenu', {
        url: '/serviceMenu',
        template: '<service-menu></service-menu>'
      }).state('services.serviceCategory', {
        url: '/serviceCategory',
        template: '<service-category></service-category>',
        params: {
          service: null
        }
      }).state('services.serviceType', {
        url: '/serviceType',
        template: '<service-type></service-type>',
        params: {
          serviceType: null
        }
      }).state('services.serviceTypeForm', {
        url: '/serviceTypeForm',
        template: '<service-type-form></service-type-form>',
        params: {
          serviceType: null
        }
      });
  });
