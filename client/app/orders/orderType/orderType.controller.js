'use strict';
(function() {

  class OrderTypeComponent {
    orderTypes = [];

    constructor($stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal, NgTableParams) {
      this.NgTableParams = NgTableParams;
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      // this.getInfo();
      var _this = this;
      this.tableParams = new this.NgTableParams({}, {
        getData: function(params) {
          return _this.factoryServices.getResourcesForTable('orderType', params);
        }
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openOrderTypeForm(orderType){
      this.orderType = orderType;
      this.$state.go('orders.orderTypeForm', {orderType: orderType}, { reload: true });
    }

    delete(item){
      var _this = this;
      this.$confirm({
        text: 'Are you sure you want to delete?'
      })
      .then(function() {
        _this.factoryServices.deleteResource('orderType', item.idOrderType).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('orderType', {
      templateUrl: 'app/orders/orderType/orderType.html',
      controller: OrderTypeComponent,
      controllerAs: '$cn'
    });

})();
