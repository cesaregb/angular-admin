'use strict';

class LoginController {
  constructor(Auth, $state, factoryServices, constants, $log, factoryCommon, appContext) {
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

    this.user.email = "user@tersuslavanderia.com";
  }

  login(form) {
    this.submitted = true;
    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then((result) => {
        this.$log.info('[abc] result: ' + result);

        // Logged in, redirect to home
        var redirect = true;
        if ( redirect ){
          this.appContext.initializeAppMenu();
          this.$state.go('main', null , { reload: true });
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
