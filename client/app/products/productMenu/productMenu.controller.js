'use strict';
(function(){

class ProductMenuComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('productMenu', {
    templateUrl: 'app/products/productMenu/productMenu.html',
    controller: ProductMenuComponent,
    controllerAs: '$cn'
  });

})();
