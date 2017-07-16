'use strict';
(function(){

class ReportsMenuComponent {
  constructor() {
  }
}

angular.module('processAdminApp')
  .component('reportsMenu', {
    templateUrl: 'app/reports/reportsMenu/reportsMenu.html',
    controller: ReportsMenuComponent,
    controllerAs: '$cn'
  });

})();
