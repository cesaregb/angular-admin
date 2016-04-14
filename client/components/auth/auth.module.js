'use strict';

angular.module('processAdminApp.auth', [
  'processAdminApp.constants',
  'processAdminApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
