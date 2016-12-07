'use strict';

class LoginController {
  constructor(Auth, $state, $location, $window, factoryServices, constants, $log, processAdminApp) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.$window = $window;
    this.$location = $location;

    this.constants = constants;
    this.factoryServices = factoryServices;
    this.$log = $log;

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

        this.$log.info('[abc] result: ' + JSON.stringify(result, null, 2));

        // set auth token
        var sodAuthToken = $cookies.get('sodAuthToken');
        if (Boolean(sodAuthToken)){
          constants.sodAuthToken = sodAuthToken;
          processAdminApp.authenticateRequests(constants.sodAuthToken);
        }

        // Logged in, redirect to home
        this.$location.path('/');
        this.$window.location.reload();
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
