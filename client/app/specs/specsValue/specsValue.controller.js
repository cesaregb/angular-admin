'use strict';
(function() {

  class SpecsValueComponent {
    specsValues = [];
    specs = [{idSpecs: 0, name: 'All'}];
    specSelectedFilter = null;

    constructor($stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      this.getInfo();
    }

    getInfo() {
      var _this = this;
      this.factoryServices.getResources('specsValue').then(function(response) {
        _this.specsValues = response;
      });
      _this.specs = [{idSpecs: 0, name: 'All'}];
      this.factoryServices.getResources('spec').then(function(response) {
        _this.specs = _this.specs.concat(response);
        _this.specSelectedFilter = _this.specs[0];
      });
    }

    filterList(){
      var _this = this;
      if (this.specSelectedFilter.name == 'All'){
        this.factoryServices.getResources('specsValue').then(function(response) {
          _this.specsValues = response;
        });
      }else {
        this.factoryServices.getSpecValuesBySpec(this.specSelectedFilter.idSpecs).then(function(response) {
          _this.specsValues = response;
        });
      }
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {

      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: '/app/specs/specsValue/specsValueModal/specsValueModal.html',
        controller: 'SpecsValueModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var specsValue = resultItem;
        if (specsValue.idSpecsValue != null && specsValue.idSpecsValue > 0) {
          _this.factoryServices.updateResourceCallback('specsValue', specsValue, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryServices.saveResourceCallback('specsValue', specsValue, function() {
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
        _this.factoryServices.deleteResource('specsValue', item.idSpecsValue).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('specsValue', {
      templateUrl: 'app/specs/specsValue/specsValue.html',
      controller: SpecsValueComponent,
      controllerAs: '$cn'
    });

})();
