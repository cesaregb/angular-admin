'use strict';
(function() {

  class TaskComponent {
    tasks = [];

    constructor($stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal, NgTableParams, $q) {
      this.$q = $q;
      this.$log = $log;
      this.NgTableParams = NgTableParams;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      var _this = this;
      this.tableParams = new this.NgTableParams({}, {
        getData: function(params) {
          return _this.factoryServices.getResourcesForTable('tasks', params);
        }
      });
    }

    createFilter() {
      var deferred = this.$q.defer();
      var filter = [];
      this.factoryServices.getResources('taskType').then(function(response) {
        response.forEach(function(item){
          filter.push({title: item.name, id:item.name});
        });
        deferred.resolve(filter);
      });
      return deferred.promise;
    }

    getInfo() {
      this.tableParams.reload();
      // var _this = this;
      // this.factoryServices.getResources('task').then(function(response) {
      //   _this.tasks = response;
      //
      // });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/tasks/task/taskModal/taskModal.html',
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
          _this.factoryServices.updateResource('tasks', task).then(function(result){
            _this.getInfo();
          });
        } else {
          _this.factoryServices.saveResource('tasks', task).then(function(result){
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
        _this.factoryServices.deleteResource('tasks', item.idTask).then(function(info){
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
