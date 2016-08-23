'use strict';

(function(){

class OrdersListComponent {
  orderTypes = [];

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
      getData: function(params) {
        return _this.factoryServices.getResourcesForTableSpecific(
          _this.factoryServices.getActiveOrders(),
          params);
      }
    });
  }

  createFilter = function(url) {
    var deferred = this.$q.defer();

    var filter = [];
    this.factoryServices.getResources('orderType').then(function(response) {
      response.forEach(function(item){
        filter.push({title: item.name, id:item.name});
      });
      deferred.resolve(filter);
    });
    return deferred.promise;
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
