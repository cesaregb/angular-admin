'use strict';

angular.module('processAdminApp')
  .controller('ManageTasksModalCtrl', function($scope, factoryServices, $uibModalInstance, formItem, $log) {

    $scope.formItem = formItem;
    $scope.tasks = [];
    $scope.taskTypes = [];
    $scope.selected = {};
    $scope.serviceTypeTasks = [];

    this.init = function() {
      $scope.title = "Agregar Tareas";
      if (Boolean($scope.formItem)) {
        if (Boolean($scope.formItem.serviceTypeTasks)){
            $scope.serviceTypeTasks = $scope.formItem.serviceTypeTasks;
        }
        // placeholder
      }
      factoryServices.getResources('taskType').then(function(response) {
        $scope.taskTypes = response;
      });
    };

    this.init();

    $scope.fromSelected = function(item, model) {
      if (indexOfElement(item) == -1){
        var selectedSpec = {};
        selectedSpec.spec = item;
        selectedSpec.idServiceType = $scope.formItem.idServiceType;
        $scope.serviceTypeTasks.push(selectedSpec);
      }
    }

    $scope.taskTypeSelected = function(item, model) {
      factoryServices.getTaskByType(item.idTaskType).then(function(response) {
        $scope.tasks = response;
      });


    }

    $scope.deleteItem = function(deleteItem){
      var deleteIndex = indexOfElement(deleteItem.spec);
      if (deleteIndex >= 0){
          $scope.serviceTypeTasks.splice(deleteIndex, 1);
      }
    };

    function indexOfElement(findItem){
      var index = -1;
      for (var i = 0; i < $scope.serviceTypeTasks.length; i++){
        if ($scope.serviceTypeTasks[i].spec.idSpecs == findItem.idSpecs){
          index = i;
        }
      }
      return index;
    };

    $scope.okAction = function() {
      $scope.formItem.serviceTypeTasks = $scope.serviceTypeTasks;
      $uibModalInstance.close($scope.formItem);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
