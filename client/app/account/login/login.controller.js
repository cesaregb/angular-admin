'use strict';

class LoginController {
  constructor(Auth, $state, factoryServices, constants, $log, factoryCommon, appContext, $location, $window) {
    this.user = {};
    this.errors = {};
    this.submitted = false;
    this.Auth = Auth;
    this.$state = $state;
    this.constants = constants;
    this.factoryServices = factoryServices;
    this.$log = $log;
    this.factoryCommon = factoryCommon;
    this.appContext = appContext;
    this.$location = $location;
    this.$window = $window;
    this.user.email = "user@tersuslavanderia.com";
  }

  login(form) {
    this.submitted = true;
    var t = this;
    if (form.$valid) {

      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then((result) => {
        this.$log.info('[abc] result: ' + result);

        let reloadFn = function(){
          // $state.go(referrer);
          // $location.path('/login');
          // this.$state.go('main', null , { reload: true });
          t.$location.path('/');
          t.$window.location.reload();
        };

        // Logged in, redirect to home
        var redirect = true;
        if ( redirect ){
          reloadFn();
        }

        // this.$state.go('main', null , { reload: true });
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('processAdminApp')
  .controller('LoginController', LoginController);
