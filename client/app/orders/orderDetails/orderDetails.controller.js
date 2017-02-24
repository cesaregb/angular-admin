'use strict';
(function () {

  class OrderDetailsComponent {

    constructor($scope, $stateParams, $state, $log, $confirm, factoryServices, _, constants, appContext, messageHandler, orderTaskInfo) {
      this.$log = $log;
      this.factoryServices = factoryServices;
      this.$confirm = $confirm;
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this._ = _;
      this.messageHandler = messageHandler;
      this.store = constants.store;
      this.storeInfo = null;
      this.appContext = appContext;
      this.storeInfo = this.appContext.appContextObject.store;
      this.orderTaskInfo = orderTaskInfo;
    };

    $onInit() {
      this.$scope.message = 'Hola como esta? ';
      let t = this;
      this.order = {};
      this.client = '';
      this.orderType = '';
      if (Boolean(this.$stateParams.order)) {
        this.order = this.$stateParams.order;
      }

      t.order.orderType = '';
      t.order.client = '';
      t.order.orderTasks = [];
      t.order.services = [];

      this.factoryServices.getTaskForOrder(1).then((result) => {
        t.order.client = result.clientName;
        t.order.orderType = result.orderTypeName;
        t.order.orderTasks = result.orderTasks;
        t.order.services = result.services;
        t.orderTaskInfo.setOrder(t.order);
      }).catch(function () {
        messageHandler.showError('Orden no encontrada')
      });
    }

    taskAction(actionInfo) {
      this.$log.info('[actionInfo] task: ' + JSON.stringify(actionInfo, null, 2));
    }

  }

  angular.module('processAdminApp')
    .component('orderDetails', {
      templateUrl: 'app/orders/orderDetails/orderDetails.html',
      controller: OrderDetailsComponent,
      controllerAs: '$cn'
    });

})();
