'use strict';
(function(){

class SupplyMenuComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('supplyMenu', {
    templateUrl: 'app/supplies/supplyMenu/supplyMenu.html',
    controller: SupplyMenuComponent,
    controllerAs: '$cn'
  });

})();
