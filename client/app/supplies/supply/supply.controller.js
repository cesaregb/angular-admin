'use strict';
(function() {

  class SupplyComponent {
    supplies = [];
    supplyTypes = [];
    // supplyTypes = [{title: 'detergente', id:'detergente'}];

    constructor($q, $stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal, NgTableParams, $scope) {
      this.$scope = $scope;
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

      this.getInfo();
    }

    createFilter = function() {
      var deferred = this.$q.defer();

      var filter = [];
      this.factoryServices.getResources('supplyType').then(function(response) {
        response.forEach(function(item){
          filter.push({title: item.name, id:item.name});
        });
        deferred.resolve(filter);
      });
      return deferred.promise;
    }

    getInfo() {
      var _this = this;

      this.tableParams = new this.NgTableParams({}, {
        getData: function(params) {
          return _this.factoryServices.getResourcesForTable('supplies', params);
        }
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {

      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/supplies/supply/supplyModal/supplyModal.html',
        controller: 'SupplyModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var supply = resultItem;
        if (supply.idSupply != null && supply.idSupply > 0) {
          _this.factoryServices.updateResource('supplies', supply).then( function(response) {
            _this.getInfo();
          });
        } else {
          _this.factoryServices.saveResource('supplies', supply).then(function(response) {
            _this.getInfo();
          });
        }
      });
    }

    delete(item){
      var _this = this;
      this.$confirm({
        text: 'Are you sure you want to delete?'
      })
      .then(function() {
        _this.factoryServices.deleteResource('supplies', item.idSupply).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('supply', {
      templateUrl: 'app/supplies/supply/supply.html',
      controller: SupplyComponent,
      controllerAs: '$cn'
    });

})();
