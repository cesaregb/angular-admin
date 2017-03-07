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
      let idOrder = 0;
      if (Boolean(this.$stateParams) && Boolean(this.$stateParams.order)) {
        idOrder = this.$stateParams.order.idOrder;
        this.loadOrder(idOrder);
      }else{
        this.$state.go('orders.ordersList', null, { reload: true });
      }
    }

    loadOrder(idOrder) {
      let t = this;
      this.order = {};
      this.order.idOrder = idOrder;
      this.client = '';
      this.orderType = '';
      if (Boolean(this.$stateParams.order)) {
        this.order = this.$stateParams.order;
      }

      t.order.orderType = '';
      t.order.client = '';
      t.order.orderTasks = [];
      t.order.services = [];

      this.factoryServices.getTaskForOrder(this.order.idOrder).then((result) => {
        t.order = {
          client: result.clientName,
          orderType: result.orderTypeName,
          orderTasks: result.orderTasks,
          services: result.services
        };
        t.orderTaskInfo.setOrder(t.order);
      }).catch( (err) => {
        t.$log.info('[err] err: ' + JSON.stringify(err, null, 2));
        t.messageHandler.showError('Orden no encontrada')
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

  }

  angular.module('processAdminApp')
    .component('orderDetails', {
      templateUrl: 'app/orders/orderDetails/orderDetails.html',
      controller: OrderDetailsComponent,
      controllerAs: '$cn'
    });

})();
