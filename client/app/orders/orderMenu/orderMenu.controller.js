'use strict';
(function(){

class OrderMenuComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('orderMenu', {
    templateUrl: 'app/orders/orderMenu/orderMenu.html',
    controller: OrderMenuComponent,
    controllerAs: '$cn'
  });

})();
