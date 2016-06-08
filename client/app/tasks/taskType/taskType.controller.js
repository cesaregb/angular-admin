'use strict';
(function() {

  class TaskTypeComponent {
    taskTypes = [];

    constructor($stateParams, $state, noty, factoryGeneral, $confirm, $log, $uibModal) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryGeneral = factoryGeneral;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      this.getInfo();
    }

    getInfo() {
      var _this = this;
      this.factoryGeneral.getTaskTypes().then(function(response) {
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
        templateUrl: '/app/tasks/taskType/taskTypeModal/taskTypeModal.html',
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
          _this.factoryGeneral.updateTaskTypeCallback(taskType, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryGeneral.saveTaskTypeCallback(taskType, function() {
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
        _this.factoryGeneral.deleteTaskType(item).then(function(info){
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
