'use strict';

angular.module('processAdminApp')
  .controller('ManageOrderTasksModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;
    $scope.tasks = [];
    $scope.taskTypes = [];
    $scope.selected = {};
    $scope.orderTypeTasks = [];

    this.init = function() {
      var showAll = false;

      if (Boolean($scope.formItem) && Boolean($scope.formItem.orderTypeTasks)) {
          $scope.orderTypeTasks = $scope.formItem.orderTypeTasks;
      }

      if (showAll){
        factoryServices.getResources('taskType').then(function(response) {
          $scope.taskTypes = response;
        });
      }else{
        factoryServices.getTaskTypeBySection(true).then(function(response) {
          $scope.taskTypes = response;
        });
      }
    };

    this.init();

    $scope.fromSelected = function(item, model) {
      if (indexOfElement(item) == -1) {
        var selectedTask = {};
        selectedTask.taskTypeName = $scope.selectTaskType.name;
        selectedTask.sortingOrder = $scope.orderTypeTasks.length + 1;
        selectedTask.task = item;
        selectedTask.idOrderType = $scope.formItem.idOrderType;
        $scope.orderTypeTasks.push(selectedTask);
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
        $scope.orderTypeTasks.splice(deleteIndex, 1);
        // for (var i = deleteItem.sortingOrder; i++  )
      }
    };

    // helper
    function indexOfElement(findItem) {
      var index = -1;
      for (var i = 0; i < $scope.orderTypeTasks.length; i++) {
        if ($scope.orderTypeTasks[i].task.idTask == findItem.idTask) {
          index = i;
        }
      }
      return index;
    };

    // form actions...
    $scope.okAction = function() {
      $scope.formItem.orderTypeTasks = $scope.orderTypeTasks;
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
