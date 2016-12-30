'use strict';
(function(){

class OrderTypeFormComponent {
  parentSelect = [];
  formItemFields = [];
  orderType = {};
  title = "New Order Type";

  constructor($scope, $stateParams, $state, noty, $log, $uibModal, $confirm, factoryServices, formlyForms) {
    this.$log = $log;
    this.factoryServices = factoryServices;
    this.$confirm = $confirm;
    this.$uibModal = $uibModal;
    this.$scope = $scope;
    this.noty = noty;
    this.$state = $state;
    this.place = null;
    this.orderType = $stateParams.orderType;
    this.editMode = (Boolean(this.orderType) && Boolean(this.orderType.idOrderType));

    // assign form
    this.formItemFields = formlyForms.orderType;
    this.init();
  };

  init(){
    this.editMode = (Boolean(this.orderType) && Boolean(this.orderType.idOrderType));
    if (Boolean(this.editMode)) {
      this.title = "Edit Order Type";
    }
  }

  saveOrderType() {
    let _this = this;
    if (this.orderType.idOrderType != null
        && this.orderType.idOrderType > 0) {
      _this.factoryServices.updateResource('orderType', this.orderType).then(function(result) {
        _this.orderType = result;
        _this.init();
      });
    } else {
      _this.factoryServices.saveResource('orderType', this.orderType).then(function(result) {
        _this.orderType = result;
        _this.init();
      });
    }
  };

  delete() {
    var _this = this;
    this.$confirm({
      text: 'Are you sure you want to delete?'
    })
    .then(function() {
      _this.factoryServices.deleteResource('orderType', _this.orderType.idOrderType).then(function(info){
        _this.back();
      });
    });
  };

  back() {
    this.$state.go('orders.orderType', null, {
      reload: true
    });
  }

  openManageTaskModal(formItem) {
    var _this = this;
    let modalInstance = this.$uibModal.open({
      animation: false,
      templateUrl: 'app/tasks/manageTasksModal/manageTasksModal.html',
      controller: 'ManageOrderTasksModalCtrl',
      size: 'lg',
      resolve: {
        formItem: function() {
          return formItem;
        },
        requester: function () {
          return 2;
        }
      }
    });

    modalInstance.result.then(function(resultItem) {
      let orderType = resultItem;
      // delete all tasks.
      if (orderType.orderTypeTasks.length > 0){
        _this.factoryServices.patchResource('orderType', orderType).then(()=>{
          // do nothing
        });
      }
    });
  }

  openManageOrderServiceTypeModal(formItem) {
    var _this = this;
    var modalInstance = this.$uibModal.open({
      animation: false,
      templateUrl: 'app/orders/orderType/manageOrderServiceTypeModal/manageOrderServiceTypeModal.html',
      controller: 'ManageOrderServiceTypeModalCtrl',
      size: 'lg',
      resolve: {
        formItem: function() {
          return formItem;
        }
      }
    });

    modalInstance.result.then(function(resultItem) {
      var orderType = resultItem;
      if (orderType.serviceTypes.length > 0){
        _this.factoryServices.addOrderServiceType(orderType).then(function(response){
          // do nothing..
        })
      }
    });
  }
  // end class
}

angular.module('processAdminApp')
  .component('orderTypeForm', {
    templateUrl: 'app/orders/orderTypeForm/orderTypeForm.html',
    authenticate: true,
    controller: OrderTypeFormComponent,
    controllerAs: '$cn'
  });

})();
