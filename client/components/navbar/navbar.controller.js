'use strict';

class NavbarController {
  menu = [];

  employee = {
    name: 'Cesar'
  };

  selectedOption = 'home';
  isCollapsed = true;
  isLogged = false;

  searchOrder(){
    if (!Boolean(this.orderSearch)){
      this.messageHandler.showError('Plese enter the order number to search')
    }else{
      // search...
    }
  }

  constructor(Auth, factoryUtils, $log, messageHandler) {
    this.factoryUtils = factoryUtils;
    this.messageHandler = messageHandler;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    var _this = this;
    Auth.isLoggedIn(function(result){
      this.isLogged = result;
      if (Auth.isAdmin()){
        this.factoryUtils.getMenuByAccessLevel(1).then(function(result){
          _this.menu = result;
        });
      }else{
        this.factoryUtils.getMenuByAccessLevel(2).then(function(result){
          _this.menu = result;
        });
      }
    }.bind(this));

  }
}

angular.module('processAdminApp').controller('NavbarController', NavbarController);
