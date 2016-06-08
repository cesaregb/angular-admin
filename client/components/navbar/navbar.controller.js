'use strict';

class NavbarController {
  menu = [];
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

  constructor(Auth, factoryUtils) {
    this.factoryUtils = factoryUtils;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    var _this = this;
    this.factoryUtils.getMenu().then(function(result){
      _this.menu = result;
    });
  }
}

angular.module('processAdminApp').controller('NavbarController', NavbarController);
