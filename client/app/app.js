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
  'ui.select',
  'ngSanitize',
  'angular-loading-bar',
  'ngTable',
  'ui.bootstrap.datetimepicker',
  'LocalStorageModule',
  'ui.sortable',
  'ngAnimate'
])
  .config(function ($urlRouterProvider, $locationProvider,
                    cfpLoadingBarProvider,
                    formlyConfigProvider, localStorageServiceProvider,
                    $httpProvider, $qProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    // configure loading-bar
    // cfpLoadingBarProvider.parentSelector = '#loadingContainer';
    // cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.includeSpinner = false;

    //********  custom formly elements
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

    formlyConfigProvider.extras.removeChromeAutoComplete = true;
    formlyConfigProvider.setType({
      name: 'async-ui-select',
      extends: 'select',
      templateUrl: 'async-ui-select-type.html'
    });

    // set prefix for local storege, best practice
    localStorageServiceProvider.setPrefix('processAdmin');

    // storage last as much as the session
    localStorageServiceProvider.setStorageType('sessionStorage');

    // avoid storing the info in the cookie, security concern
    localStorageServiceProvider.setDefaultToCookie(false);

    // timeout for login request
    $httpProvider.defaults.timeout = 5000;

    // avoid error Possibly unhandled rejection: undefined
    $qProvider.errorOnUnhandledRejections(false);

  })
  .run(function ($location, $log, $rootScope, Auth, appContext) {
    let url = $location.absUrl();
    $rootScope.$on('$stateChangeStart', function (event, next) {

      // SET AUTH FOR ALL THE APP
      // we may require to skip some screens.
      Auth.isLoggedIn(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          appContext.destroy();
          $location.path('/login');
        } else {
          // once is logged...
          appContext.getAppContext().then((appContext) => { });
          if (url.includes('login')) {
            $location.path('/main');
          }
        }
      });

    });

  });
