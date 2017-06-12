'use strict';
(function () {

  class CashOutComponent {
    orderTypes = [];
    includeFinished = false;

    constructor($q, $stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal, NgTableParams) {
      this.$q = $q;
      this.NgTableParams = NgTableParams;
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;

      var _this = this;
      this.tableParams = new this.NgTableParams({}, {
        getData: function (params) {
          return _this.factoryServices.getResourcesForTableSpecific(_this.getTableFilter(), params);
        }
      });
    }

    getTableFilter() {
      return this.factoryServices.getNextCashOut();
    }

    refreshTable() {
      this.tableParams.reload();
    }

    openNewModal() {
      this.openModal({});
    }

    openOrderTypeForm(orderType) {
      this.orderType = orderType;
      this.$state.go('orders.orderTypeForm', {orderType: orderType}, {reload: true});
    }

    delete(item) {
      var _this = this;
      this.$confirm({
        text: 'Are you sure you want to delete?'
      })
        .then(function () {
          _this.factoryServices.deleteResource('orderType', item.idOrderType).then(function (info) {
            _this.back();
          });
        });
    }

    payOrder(order) {
      this.$log.info('[payOrder] order: ' + JSON.stringify(order, null, 2));
    }

    back() {
      this.tableParams.reload();
    }
  }

  angular.module('processAdminApp')
    .component('cashOut', {
      templateUrl: 'app/cashOut/cashOut.html',
      controller: CashOutComponent,
      controllerAs: '$cn'
    });

})();
