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
    const t = this;
    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      }).then((result) => {
        // $state.go(referrer);
        // $location.path('/login');
        // this.$state.go('main', null , { reload: true });
        // TODO change page differently
        t.$location.path('/');
        t.$window.location.reload();
      }).catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('processAdminApp')
  .controller('LoginController', LoginController);
