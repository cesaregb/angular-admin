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
      this.messageHandler.showError('Please enter the order number to search')
    }else{
      // search...
    }
  }

  constructor(Auth, factoryUtils, $log, messageHandler, appContext) {
    this.factoryUtils = factoryUtils;
    this.messageHandler = messageHandler;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.appContext = appContext;
    this.$log = $log;
    this.loadMenu();

  }

  loadMenu(){
    let t = this;
    this.appContext.getAppContext().then( (appContextObject) => {
      t.menu = appContextObject.menu;
      t.isLogged = true;
    });
  }

}

angular.module('processAdminApp').controller('NavbarController', NavbarController);
