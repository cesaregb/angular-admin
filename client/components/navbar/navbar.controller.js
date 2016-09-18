'use strict';

class NavbarController {
  menu = [];

  employee = {
    name: 'Cesar'
  };

  selectedOption = 'home';

  isCollapsed = true;

  searchOrder(){
    if (!Boolean(this.orderSearch)){
      this.messageHandlerService.showError('Plese enter the order number to search')
    }else{
      // search...
    }
  }

  constructor(Auth, factoryUtils, $log, messageHandlerService) {
    this.factoryUtils = factoryUtils;
    this.messageHandlerService = messageHandlerService;
    $log.info('[constructor] Auth: ' + JSON.stringify(Auth, null, 2));
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    var _this = this;
    // if (this.isLoggedIn){
      this.factoryUtils.getMenu().then(function(result){
        _this.menu = result;
      });
    // }

  }
}

angular.module('processAdminApp').controller('NavbarController', NavbarController);
