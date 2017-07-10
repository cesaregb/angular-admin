'use strict';
(function() {

  class TaskTypeComponent {
    taskTypes = [];

    constructor($stateParams, $state, factoryServices, $confirm, $log, $uibModal) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.$state = $state;
      this.route = $stateParams.route;
      this.getInfo();
    }

    getInfo() {
      var _this = this;
      this.factoryServices.getResources('taskType').then(function(response) {
        _this.taskTypes = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/tasks/taskType/taskTypeModal/taskTypeModal.html',
        controller: 'TaskTypeModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var taskType = resultItem;
        if (taskType.idTaskType != null && taskType.idTaskType > 0) {
          _this.factoryServices.updateResource('taskType', taskType).then(()=>{
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResource('taskType', taskType).then(()=>{
            _this.getInfo();
          });
        }
      });
    }

    delete(item){
      var _this = this;
      this.$confirm({
        text: 'Estas seguro de borrar el registro??'
      })
      .then(function() {
        _this.factoryServices.deleteResource('taskType', item.idTaskType).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('taskType', {
      templateUrl: 'app/tasks/taskType/taskType.html',
      controller: TaskTypeComponent,
      controllerAs: '$cn'
    });

})();
