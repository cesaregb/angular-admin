'use strict';
(function () {

  class OrderDetailsComponent {

    constructor($scope, $stateParams, $state, $log, $confirm, factoryServices, _, constants, messageHandler, orderTaskInfo, uiUtils) {
      this.$log = $log;
      this.factoryServices = factoryServices;
      this.$confirm = $confirm;
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this._ = _;
      this.messageHandler = messageHandler;
      this.store = constants.store;
      this.orderTaskInfo = orderTaskInfo;
      this.uiUtils = uiUtils;
    };

    $onInit() {
      let idOrder = 0;
      if (Boolean(this.$stateParams) && Boolean(this.$stateParams.order)) {
        idOrder = this.$stateParams.order.idOrder;
        this.loadOrder(idOrder);
      } else {
        this.$state.go('orders.ordersList', null, {reload: true});
      }
    }

    loadOrder(idOrder) {
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
      idOrder = (parseInt(idOrder) > 0 ) ? idOrder : t.order.idOrder;
      this.factoryServices.getTaskForOrder(idOrder).then((result) => {
        this.$log.info('[init] result: ' + JSON.stringify(result, null, 2));
        t.order = {
          idOrder: idOrder,
          paymentStatus: result.paymentStatus,
          client: result.clientName,
          orderType: result.orderTypeName,
          orderTasks: result.orderTasks,
          services: result.services
        };
        t.orderTaskInfo.setOrder(t.order);
      }).catch((e) => {
        t.messageHandler.showError('Orden no encontrada, probablemente ya se termino');
        this.$state.go('orders.ordersList', null, {reload: true});
      });
    }

    taskAction(actionInfo) {
      let t = this;
      this.factoryServices.taskAction(this.order.idOrder, actionInfo.action, actionInfo.task).then(function (response) {
        t.loadOrder(response.idOrder);
      }).catch(function () {
        t.messageHandler.showError('Error avanzando en accion de tarea! ');
      });
    }

    // repeated code with the orderList module
    payOrder() {
      const order = this.order;
      this.$confirm({
        text: `Estas seguro de pagar la orden ${order.idOrder}`
      }).then(() => {
        this.factoryServices.payOrder(order.idOrder).then(() => {
        });
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
