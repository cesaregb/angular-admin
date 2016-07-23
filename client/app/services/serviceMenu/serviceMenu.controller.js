'use strict';
(function(){

class ServiceMenuComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('serviceMenu', {
    templateUrl: 'app/services/serviceMenu/serviceMenu.html',
    controller: ServiceMenuComponent,
    controllerAs: '$cn'
  });

})();
