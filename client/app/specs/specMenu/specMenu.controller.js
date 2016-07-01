'use strict';
(function(){

class SpecMenuComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('specMenu', {
    templateUrl: 'app/specs/specMenu/specMenu.html',
    controller: SpecMenuComponent,
    controllerAs: '$cn'
  });

})();
