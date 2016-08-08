'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('orders', {
        cache: false,
        abstract: true,
        controller: 'OrderMainControllerCtrl',
        url: '/orders',
        template: '<ui-view/>'
      }).state('orders.orderMenu', {
        url: '/orderMenu',
        template: '<order-menu></order-menu>'
      }).state('orders.orderType', {
        url: '/orderType',
        template: '<order-type></order-type>',
        params: {
          orderType: null
        }
      }).state('orders.orderTypeForm', {
        url: '/orderTypeForm',
        template: '<order-type-form></order-type-form>',
        params: {
          orderType: null
        }
      }).state('orders.newOrder', {
        url: '/newOrder',
        template: '<new-order></new-order>',
        params: {
          order: null
        }
      }).state('orders.ordersList', {
        url: '/ordersList',
        template: '<orders-list></orders-list>'
      });
  });
