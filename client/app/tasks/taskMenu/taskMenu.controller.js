'use strict';
(function(){

class TaskMenuComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('processAdminApp')
  .component('taskMenu', {
    templateUrl: 'app/tasks/taskMenu/taskMenu.html',
    controller: TaskMenuComponent,
    controllerAs: '$cn'
  });

})();
