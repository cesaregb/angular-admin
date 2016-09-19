'use strict';

class LoginController {
  constructor(Auth, $state, $location, $window) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.$window = $window;
    this.$location = $location;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
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
