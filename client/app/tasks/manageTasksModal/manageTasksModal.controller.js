'use strict';

angular.module('processAdminApp')
  .controller('ManageOrderTasksModalCtrl', function ($scope, factoryServices, $uibModalInstance, formItem, requester, $log) {

    $scope.formItem = formItem;
    $scope.tasks = [];
    $scope.taskTypes = [];
    $scope.selected = {};
    $scope.itemTypeTasks = [];

    $scope.items = ["One", "Two", "Three"];

    // $scope.sortableOptions = {
    //   update: function(e, ui) {  },
    //   axis: 'x'
    // };

    this.init = function () {

      if (requester == 2) { // orders module
        if (Boolean($scope.formItem) && Boolean($scope.formItem.orderTypeTask)) {
          $scope.itemTypeTasks = $scope.formItem.orderTypeTask;
        }
        factoryServices.getResources('taskType').then(function (response) {
          $scope.taskTypes = response;
        });
      } else {
        if (Boolean($scope.formItem) && Boolean($scope.formItem.serviceTypeTasks)) {
          $scope.itemTypeTasks = $scope.formItem.serviceTypeTasks;
        }

        // send ordersOnly flag, is true if need to be displayed only in orders.
        factoryServices.getTaskTypeBySection(false).then(function (response) {
          $scope.taskTypes = response;
        });
      }
    };

    this.init();

    $scope.fromSelected = function (item) {

      if (indexOfElement(item) == -1) {
        var selectedTask = {};
        selectedTask.taskTypeName = $scope.selectTaskType.name;
        selectedTask.sortingOrder = $scope.itemTypeTasks.length + 1;
        selectedTask.task = item;
        if (requester == 2) {
          selectedTask.idOrderType = $scope.formItem.idOrderType;
        }else{
          selectedTask.idServiceType = $scope.formItem.idServiceType;
        }
        $scope.itemTypeTasks.push(selectedTask);
      }
    };

    $scope.selectTaskType = null;

    $scope.taskTypeSelected = function (item, model) {
      $scope.selectTaskType = item;
      factoryServices.getTaskByType(item.idTaskType).then(function (response) {
        $scope.tasks = response;
      });
    };

    $scope.deleteItem = function (deleteItem) {
      var deleteIndex = indexOfElement(deleteItem.task);
      if (deleteIndex >= 0) {
        $scope.itemTypeTasks.splice(deleteIndex, 1);
        // for (var i = deleteItem.sortingOrder; i++  )
      }
    };

    // helper
    function indexOfElement(findItem) {
      var index = -1;
      for (var i = 0; i < $scope.itemTypeTasks.length; i++) {
        if ($scope.itemTypeTasks[i].task.idTask == findItem.idTask) {
          index = i;
        }
      }
      return index;
    };

    // form actions...
    $scope.okAction = function () {
      $scope.itemTypeTasks.forEach(function (item, index) {
        item.sortingOrder = index;
      });

      if (requester == 2) {
        $scope.formItem.orderTypeTasks = $scope.itemTypeTasks;
      }else{
        $scope.formItem.serviceTypeTasks = $scope.itemTypeTasks;
      }

      $uibModalInstance.close($scope.formItem);

    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
