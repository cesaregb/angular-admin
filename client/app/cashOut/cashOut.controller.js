'use strict';
(function () {

  class CashOutComponent {
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
      this.cashOut = {};
      let _this = this;
      this.tableParams = new this.NgTableParams({}, {
        getData: function (params) {
          return _this.factoryServices.getResourcesForTableSpecific(_this.getTableFilter(), params);
        }
      });
    }

    $onInit() {
      this.factoryServices.getNextCashOut().then((cashOut) => {
        this.cashOut = cashOut;
      });
    }

    getTableFilter() {
      return this.factoryServices.getOrdersPendingOfCashOut();
    }

    refreshTable() {
      this.tableParams.reload();
    }

    createCashOut() {
      this.$confirm({
        text: 'Seguro quieres guardar el corte de caja?'
      }).then(() => {
        this.factoryServices.saveCashOut().then((cashOut) => {
          this.$state.go('orders.ordersList', null, {reload: true});
        });
      });
    }
  }

  angular.module('processAdminApp')
    .component('cashOut', {
      templateUrl: 'app/cashOut/cashOut.html',
      controller: CashOutComponent,
      controllerAs: '$cn'
    });

})();
