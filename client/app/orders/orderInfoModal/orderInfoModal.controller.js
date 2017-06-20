'use strict';

angular.module('processAdminApp')
  .controller('OrderInfoModalController', function($scope, factoryServices, $uibModalInstance, wrapper, $log) {

    $scope.wrapper = wrapper;

    this.init = function() {
      const type = wrapper.typeTask;
      $scope.prefix = "Orden";
      if (type === 0){
        $scope.prefix = "Servicio";
      }


      if (Boolean(wrapper.tasks)){
        $scope.tasks = wrapper.tasks;
      }else{
        // TODO get tasks for service or order.
      }

    };

    $scope.parentSelect = [];

    this.init();

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };


  });
