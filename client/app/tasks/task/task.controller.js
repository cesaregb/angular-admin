'use strict';
(function() {

  class TaskComponent {
    tasks = [];

    constructor($stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      this.getInfo();
    }

    getInfo() {
      var _this = this;
      this.factoryServices.getResources('task').then(function(response) {
        _this.tasks = response;

      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {

      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: '/app/tasks/task/taskModal/taskModal.html',
        controller: 'TaskModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var task = resultItem;
        if (task.idTask != null && task.idTask > 0) {
          _this.factoryServices.updateResourceCallback('task', task, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResourceCallback('task', task, function() {
            _this.getInfo();
          });
        }
      });
    }

    delete(item){
      var _this = this;
      this.$confirm({
        text: 'Are you sure you want to delete?'
      })
      .then(function() {
        _this.factoryServices.deleteResource('task', item.idTask).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('task', {
      templateUrl: 'app/tasks/task/task.html',
      controller: TaskComponent,
      controllerAs: '$cn'
    });

})();
