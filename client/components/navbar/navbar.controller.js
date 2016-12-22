'use strict';

class NavbarController {
  menu = [];

  employee = {
    name: 'Cesar'
  };

  selectedOption = 'home';
  isCollapsed = true;
  isLogged = true;

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
    var t = this;
    this.appContext.getAppContext().then((appContextObject) => {
      t.menu = appContextObject.menu;
      this.$log.info('[loadMenu] t.menu: ' + JSON.stringify(t.menu, null, 2));
    });
  }

}

angular.module('processAdminApp').controller('NavbarController', NavbarController);
