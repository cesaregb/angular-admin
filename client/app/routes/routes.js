'use strict';

angular.module('processAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('routes', {
        cache: false,
        abstract: true,
        controller: 'RoutesMainControllerCtrl',
        url: '/routes',
        template: '<ui-view/>'
      }).state('routes.edit', {
        url: '/admin',
        template: '<routes></routes>',
        params: {
          route: null
        }
      }).state('routes.all', {
        cache: false,
        url: '/all',
        template: '<routes-all></routes-all>'
      }).state('routes.calendar', {
        url: '/calendarRoute',
        template: '<calendar-route></calendar-route>',
        params: {
          route: null
        }
      }).state('routes.stopsAll', {
        url: '/stopsAll',
        template: '<stops-all></stops-all>',
        params: {
          route: null
        }
      }).state('routes.stopForm', {
        url: '/stopForm',
        template: '<stop-form></stop-form>',
        params: {
          route: null,
          stop: null
        }
      });
  });
