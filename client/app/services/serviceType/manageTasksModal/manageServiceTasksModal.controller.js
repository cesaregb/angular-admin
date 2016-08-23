'use strict';

angular.module('processAdminApp')
  .controller('ManageServiceTasksModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;
    $scope.tasks = [];
    $scope.taskTypes = [];
    $scope.selected = {};
    $scope.serviceTypeTasks = [];

    this.init = function() {
      if (Boolean($scope.formItem)) {
        if (Boolean($scope.formItem.serviceTypeTasks)) {
          $scope.serviceTypeTasks = $scope.formItem.serviceTypeTasks;
        }
      }
      factoryServices.getTaskTypeBySection(false).then(function(response) {
        $scope.taskTypes = response;
      });
    };

    this.init();

    $scope.fromSelected = function(item, model) {
      if (indexOfElement(item) == -1) {
        var selectedTask = {};
        selectedTask.taskTypeName = $scope.selectTaskType.name;
        selectedTask.sortingOrder = $scope.serviceTypeTasks.length + 1;
        selectedTask.task = item;
        selectedTask.idServiceType = $scope.formItem.idServiceType;
        $scope.serviceTypeTasks.push(selectedTask);
      }
    }

    $scope.selectTaskType = null;
    $scope.taskTypeSelected = function(item, model) {
      $scope.selectTaskType = item;
      factoryServices.getTaskByType(item.idTaskType).then(function(response) {
        $scope.tasks = response;
      });
    }

    $scope.deleteItem = function(deleteItem) {
      var deleteIndex = indexOfElement(deleteItem.task);
      if (deleteIndex >= 0) {
        $scope.serviceTypeTasks.splice(deleteIndex, 1);
        // for (var i = deleteItem.sortingOrder; i++  )
      }
    };

    // helper
    function indexOfElement(findItem) {
      var index = -1;
      for (var i = 0; i < $scope.serviceTypeTasks.length; i++) {
        if ($scope.serviceTypeTasks[i].task.idTask == findItem.idTask) {
          index = i;
        }
      }
      return index;
    };

    // form actions...
    $scope.okAction = function() {
      $scope.formItem.serviceTypeTasks = $scope.serviceTypeTasks;
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
