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
        url: '/routeCalendar',
        template: '<route-calendar></route-calendar>'
      });
  });
