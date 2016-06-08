'use strict';
(function(){

class AssetMenuComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('assetMenu', {
    templateUrl: 'app/assets/assetMenu/assetMenu.html',
    controller: AssetMenuComponent,
    controllerAs: '$cn'
  });

})();
