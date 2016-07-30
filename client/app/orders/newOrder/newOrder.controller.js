'use strict';
(function() {

  class NewOrderComponent {
    parentSelect = [];
    order = {};
    title = "Nueva Orden.";
    orderTypes = [];
    pickupShow = false;
    showDeliver = false;

    status = { isopen: false };

    constructor($scope, $stateParams, $state, noty, $log, $uibModal, $confirm, factoryServices, formlyForms, NgTableParams) {
      this.NgTableParams = NgTableParams;
      this.$log = $log;
      this.factoryServices = factoryServices;
      this.$confirm = $confirm;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.noty = noty;
      this.$state = $state;
      this.place = null;
      if (Boolean($stateParams.order)) {
        this.order = $stateParams.order;
      }

      if (!Boolean(this.order.services)){
        this.order.services = [];
      }
      if (!Boolean(this.order.client)){
        this.order.client = {};
      }

      var _this = this;
      this.init();
    };

    init() {
      var _this = this;
      this.editMode = (Boolean(this.orderType) && Boolean(this.orderType.idOrder));
      if (Boolean(this.editMode)) {
        // do nothing
      }

      this.factoryServices.getResources('orderType').then(function(result) {
        _this.orderTypes = result;
      });

      this.tableParams = new this.NgTableParams({}, {
        dataset: _this.order.services
      });
    }

    validateOrderType() {
      this.pickupShow = false;
      this.showDeliver = false;
      var both = false;
      if (this.selectedOrderType.transportInfo == 3) {
        both = true;
      }
      if (this.selectedOrderType.transportInfo == 1 || both) {
        this.pickupShow = true;
      }
      if (this.selectedOrderType.transportInfo == 2 || both) {
        this.showDeliver = true;
      }
    }

    saveOrderType() {
      var _this = this;

    };

    delete() {
      var _this = this;
      this.$confirm({
          text: 'Are you sure you want to delete?'
        })
        .then(function() {
          _this.factoryServices.deleteResource('orderType', _this.orderType.idOrder).then(function(info) {
            _this.back();
          });
        });
    };

    removeService(service){
      var _this = this;
      _this.order.services.forEach(function(item, index){
        if (service.idServiceType == item.idServiceType && service.totalPrice == item.totalPrice){
          _this.order.services.splice(index, 1);
          _this.tableParams.reload();
        }
      });
    }

    openService(service){
      var _this = this;
      this.addService(service);
    }

    back() {
      this.$state.go('orders.orderType', null, {
        reload: true
      });
    }

    addService(selectedService){
      var _this = this;
      var orderType = this.selectedOrderType;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/services/addServiceModal/addServiceModal.html',
        controller: 'AddServicesModalCtrl',
        size: 'lg',
        resolve: {
          orderType: function() {
            return orderType;
          },
          selectedService: function() {
            return selectedService;
          }
        }
      });

      modalInstance.result.then(function(service) {
        _this.order.services.push(service);
        _this.tableParams.reload();
      });
    }

    openClientSearch() {
      var clientSearchInfo = null;
      if (Boolean(this.order.client) && Boolean(this.order.client.name)){
          clientSearchInfo = this.order.client.name;
      }
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/clients/clientSearchModal/clientSearchModal.html',
        controller: 'ClientSearchModalCtrl',
        size: 'lg',
        resolve: {
          clientSearchInfo: function() {
            return clientSearchInfo;
          }
        }
      });

      modalInstance.result.then(function(client) {
        _this.order.client = client;
      });
    }

    pickUpDate = new Date();
    deliverDate = new Date();

    pickUpOpen = false;
    deliverOpen = false;

    openCalendar(e, m) {
      e.preventDefault();
      e.stopPropagation();
      if (m === 'pickUpDate') {
        this.pickUpOpen = !this.pickUpOpen;
        this.deliverOpen = false;
      } else if (m === 'deliverDate') {
        this.deliverOpen = !this.deliverOpen;
        this.pickUpOpen = false;
      }
    };

    // end class
  }

  angular.module('processAdminApp')
    .component('newOrder', {
      templateUrl: 'app/orders/newOrder/newOrder.html',
      controller: NewOrderComponent,
      controllerAs: '$cn'
    });
})();
