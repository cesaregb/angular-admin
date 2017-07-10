'use strict';

(function () {

  class OrdersListComponent {
    includeFinished = false;

    constructor($q, $stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal, NgTableParams, uiUtils) {
      this.$q = $q;
      this.NgTableParams = NgTableParams;
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      this.uiUtils = uiUtils;

      let _this = this;
      this.tableParams = new this.NgTableParams({}, {
        getData: function (params) {
          return _this.factoryServices.getResourcesForTableSpecific(
            _this.getTableFilter(),
            params);
        }
      });
    }

    createFilter = function (url) {
      let deferred = this.$q.defer();
      let filter = [];
      this.factoryServices.getResources('orderType').then((response) => {
        response.forEach(function (item) {
          filter.push({title: item.name, id: item.name});
        });
        deferred.resolve(filter);
      });
      return deferred.promise;
    };

    getTableFilter() {
      if (!this.includeFinished) {
        return this.factoryServices.getActiveOrders();
      } else {
        return this.factoryServices.getResources('orders');
      }
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
        text: 'Estas seguro de borrar el registro??'
      }).then(function () {
        _this.factoryServices.deleteResource('orderType', item.idOrderType).then(function (info) {
          _this.back();
        });
      });
    }

    payOrder(order) {
      this.$confirm({
        text: `Estas seguro de pagar la orden ${order.idOrder}`
      }).then(() => {
        this.factoryServices.payOrder(order.idOrder).then(() => {
          this.refreshTable();
        });
      });
    }

    back() {
      this.tableParams.reload();
    }
  }

  angular.module('processAdminApp')
    .component('ordersList', {
      templateUrl: 'app/orders/ordersList/ordersList.html',
      controller: OrdersListComponent,
      controllerAs: '$cn'
    });

})();
