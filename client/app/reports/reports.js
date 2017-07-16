'use strict';

angular.module('processAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reports', {
        cache: false,
        abstract: true,
        authenticate: true,
        url: '/reports',
        template: '<ui-view/>'
      }).state('reports.reportsMenu', {
        url: '/reportsMenu',
        template: '<reports-menu></reports-menu>'
      }).state('reports.historyCashOut', {
        url: '/historyCashOut',
        template: '<history-cash-out></history-cash-out>'
      }).state('reports.historyOrders', {
        url: '/historyOrders',
        template: '<history-orders></history-orders>'
      });
  });
