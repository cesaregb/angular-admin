'use strict';

angular.module('processAdminApp', [
    'processAdminApp.auth',
    'processAdminApp.admin',
    'processAdminApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'angular-noty',
    'formly',
    'formlyBootstrap',
    'uiGmapgoogle-maps'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  }).config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
       key: 'AIzaSyCkf62CueLleu2_yaZqfL_lxKvTQm-srS0',
       v: '3.22',
       libraries: 'geometry,places'
    });
  });
