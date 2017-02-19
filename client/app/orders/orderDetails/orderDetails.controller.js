'use strict';
(function(){

class OrderDetailsComponent {

  orderHistory = false;

  constructor($scope, $stateParams, $state, $log, $confirm, factoryServices, _, constants, appContext, messageHandler) {
    this.$log = $log;
    this.factoryServices = factoryServices;
    this.$confirm = $confirm;
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this._ = _;
    this.store = constants.store;
    this.storeInfo = null;
    this.appContext = appContext;
    this.storeInfo = this.appContext.appContextObject.store;
  };

  $onInit() {
    this.$scope.message = 'Hola como esta? ';
    var t = this;
    this.order = {};
    if (Boolean(this.$stateParams.order)) {
      this.order = this.$stateParams.order;
    }

    t.orderTasks = [];
    this.factoryServices.getTaskForOrder(1).then( (result) =>{
      t.order = result;
      t.$log.info('[init] t.order: ' + JSON.stringify(t.order, null, 2));
      t.orderTasks = result.orderTasks;
    }).catch(function () {
      messageHandler.showError('Orden no encontrada')
    });
  }


}

angular.module('processAdminApp')
  .component('orderDetails', {
    templateUrl: 'app/orders/orderDetails/orderDetails.html',
    controller: OrderDetailsComponent,
    controllerAs: '$cn'
  });

})();
