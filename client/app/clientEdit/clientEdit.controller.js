'use strict';
(function(){

class ClientEditComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('clientEdit', {
    templateUrl: 'app/clientEdit/clientEdit.html',
    controller: ClientEditComponent
  });

})();
