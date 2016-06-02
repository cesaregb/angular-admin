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
    // 'formlyMaterial',
    'angular-confirm',
    'ngMaterial'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }).run(function($location, $log, constants){
    var url = $location.absUrl();

    if (url.indexOf('localhost') > 0){
      constants.API_ENDPOINT = constants.LOCAL_API_ENDPOINT;
    }else{
      constants.API_ENDPOINT = constants.PROD_API_ENDPOINT;
    }
    $log.info('[run] $location: ' + $location.absUrl() + " -- " + constants.API_ENDPOINT);
  });
