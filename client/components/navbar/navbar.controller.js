'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    {
      'title': 'Clients',
      'state': 'client.all',
    }, {
      title: 'Specs',
      state: 'specs'
    }, {
      title: 'Service',
      state: 'services'
    }, {
      title: 'Orders',
      state: 'orders'
    }, {
      title: 'Tasks',
      state: 'tasks'
    }];

  employee = {
    name: 'Cesar'
  };

  selectedOption = 'home';

  isCollapsed = true;

  myEventListener = function () {
    console.log("this is being fired!!!");
    $interval(function() {
        aler("alert!!!!!");
    }, 1000);
  };

  //end-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('processAdminApp').controller('NavbarController', NavbarController);
