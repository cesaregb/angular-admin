'use strict';

class NavbarController {
  menu = [];

  employee = {
    name: 'Cesar'
  };

  selectedOption = 'home';
  isCollapsed = true;
  isLogged = false;

  searchOrder() {
    if (!Boolean(this.orderSearch) || isNaN(this.orderSearch)) {
      this.messageHandler.showError('Favor de dar un numero de orden valido, tiene que ser numerico ');
    } else {
      this.$state.go('orders.orderDetails', {order: {idOrder: this.orderSearch}}, {reload: true});
    }
  }

  constructor(Auth, factoryUtils, $log, messageHandler, appContext, $state) {
    this.factoryUtils = factoryUtils;
    this.messageHandler = messageHandler;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.appContext = appContext;
    this.$log = $log;
    this.$state = $state;
    this.loadMenu();

  }

  loadMenu() {
    let t = this;
    this.appContext.getAppContext().then((appContextObject) => {
      t.menu = appContextObject.menu;
      t.isLogged = true;
    });
  }

}

angular.module('processAdminApp').controller('NavbarController', NavbarController);
