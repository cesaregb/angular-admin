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
  'dndLists', // remove me
  'LocalStorageModule',
  'ui.sortable'
])
  .config(function ($urlRouterProvider, $locationProvider, cfpLoadingBarProvider, formlyConfigProvider, localStorageServiceProvider, $httpProvider) {
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

    // set prefix for local storege, best practice
    localStorageServiceProvider
      .setPrefix('processAdmin');

    // storage last as much as the session
    localStorageServiceProvider
      .setStorageType('sessionStorage');

    // avoid storing the info in the cookie, security concern
    localStorageServiceProvider
      .setDefaultToCookie(false);

    $httpProvider.defaults.timeout = 5000;

  })
  .run(function ($location, $log, $rootScope, Auth, appContext, factoryCommon) {

    let url = $location.absUrl();

    $rootScope.$on('$stateChangeStart', function (event, next) {

      // SET AUTH FOR ALL THE APP
      // we may require to skip some screens.
      let flag = true || (next.authenticate);

      Auth.isLoggedIn(function (loggedIn) {

        if (flag && !loggedIn) {
          appContext.destroy();
          $location.path('/login');
        }else{
          // once is logged...
          // appContext.getAppContext().then((appContext) => { });
          if (url.includes('login')){
            $location.path('/main');
          }
        }
      });

    });

});
