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
  'angular-confirm',
  'ngMaterial',
  'ui.select',
  'ngSanitize',
  'angular-loading-bar',
  'ngTable',
  'ui.bootstrap.datetimepicker',
  'dndLists',
  'LocalStorageModule'
])
  .config(function ($urlRouterProvider, $locationProvider, cfpLoadingBarProvider, formlyConfigProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    // configure loading-bar
    // cfpLoadingBarProvider.parentSelector = '#loadingContainer';
    // cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.includeSpinner = false;

    // cfpLoadingBarProvider.spinnerTemplate = '<div class="spinning-wheel-container"><div class="spinning-wheel"></div></div>';

    // set templates here
    formlyConfigProvider.setWrapper({
      name: 'horizontalBootstrapLabel',
      template: [
        '<label for="{{::id}}" class="col-sm-2 control-label">',
        '{{to.label}} {{to.required ? "*" : ""}}',
        '</label>',
        '<div class="col-sm-8">',
        '<formly-transclude></formly-transclude>',
        '</div>'
      ].join(' ')
    });

    formlyConfigProvider.setWrapper({
      name: 'horizontalBootstrapCheckbox',
      template: [
        '<div class="col-sm-offset-2 col-sm-8">',
        '<formly-transclude></formly-transclude>',
        '</div>'
      ].join(' ')
    });

    formlyConfigProvider.setType({
      name: 'horizontalInput',
      extends: 'input',
      wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
    });

    formlyConfigProvider.setType({
      name: 'horizontalCheckbox',
      extends: 'checkbox',
      wrapper: ['horizontalBootstrapCheckbox', 'bootstrapHasError']
    });

  })
  .run(function ($location, $log, appContext, $rootScope, Auth, constants) {

    var url = $location.absUrl();

    $log.info('[info] API_ENDPOINT: ' + constants.API_ENDPOINT);
    $rootScope.$on('$stateChangeStart', function (event, next) {
      // SET AUTH FOR ALL THE APP
      // we may require to skip some screens.
      var flag = true || (next.authenticate);

      Auth.isLoggedIn(function (loggedIn) {

        if (flag && !loggedIn) {
          $log.info('[run] Access not granted');
          $location.path('/login');

        }else{
          // once is logged...

          appContext.initializeStore();

          if (url.includes('login')){
            $location.path('/main');
          }
        }
      });

    });

});
