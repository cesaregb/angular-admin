'use strict';
(function(){

class SubproductMenuComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('subproductMenu', {
    templateUrl: 'app/subproducts/subproductMenu/subproductMenu.html',
    controller: SubproductMenuComponent,
    controllerAs: '$cn'
  });

})();
