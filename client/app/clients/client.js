'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('client', {
        cache: false,
        abstract: true,
        controller: 'ClientMainControllerCtrl',
        url: '/client',
        template: '<ui-view/>'
      }).state('client.all', {
        cache: false,
        url: '/all',
        template: '<client></client>'
      }).state('client.edit', {
        url: '/edit',
        template: '<client-edit></client-edit>',
        params: {
          client: null
        }
      }).state('client.address', {
        url: '/address',
        template: '<client-address></client-address>',
        params: {
          client: null
        }
      }).state('client.addressForm', {
        url: '/addressForm',
        template: '<client-address-form></client-address-form>',
        params: {
          client: null,
          address: null
        }
      }).state('client.payment', {
        url: '/payment',
        template: '<client-payment-info></client-payment-info>',
        params: {
          client: null
        }
      }).state('client.phone', {
        url: '/phone',
        template: '<client-phone></client-phone>',
        params: {
          client: null
        }
      });
  });
