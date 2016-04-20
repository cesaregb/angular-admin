'use strict';
(function(){

class NewOrderComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('newOrder', {
    templateUrl: 'app/newOrder/newOrder.html',
    controller: NewOrderComponent
  });

})();
