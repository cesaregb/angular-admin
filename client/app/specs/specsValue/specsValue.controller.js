'use strict';
(function() {

  class SpecsValueComponent {

    constructor($stateParams, $state, noty, factoryServices, $confirm, $log, $uibModal, NgTableParams) {
      this.$log = $log;
      this.NgTableParams = NgTableParams;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      this.specSelectedFilter = null;
      this.specsValues = [];
      this.specs = [];
      // this.getInfo();
      var _this = this;

      this.factoryServices.getResources('specs').then(function(response) {
        // _this.specs = [{idSpecs: 0, name: 'All'}];
        _this.specs = _this.specs.concat(response);
        if (!Boolean(_this.specSelectedFilter)){
          _this.specSelectedFilter = _this.specs[0];
        }
        _this.filterList();
      });
    }

    getInfo() {
      let _this = this;
      _this.filterList();
    }

    filterList(){
      let _this = this;
      if (!Boolean(this.specSelectedFilter) || this.specSelectedFilter.name == 'All'){
        this.noty.showNoty({
          text: "Please select a Category ",
          ttl: 1000 * 2,
          type: "warning"
        });
      }else {
        _this.factoryServices.getSpecValuesBySpec(_this.specSelectedFilter.idSpecs).then(function(response){
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
        templateUrl: 'app/specs/specsValue/specsValueModal/specsValueModal.html',
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
        if (Boolean(specsValue.idSpecsValues) && specsValue.idSpecsValues > 0) {
          _this.factoryServices.updateResource('specsValue', specsValue).then(()=>{
            _this.back();
          });
        } else {
          _this.factoryServices.saveResource('specsValue', specsValue).then(()=>{
            _this.back();
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
        _this.factoryServices.deleteResource('specsValue', item.idSpecsValues).then(() => {
          _this.back();
        });
      });
    }

    back() {
      this.filterList();
    }
  }

  angular.module('processAdminApp')
    .component('specsValue', {
      templateUrl: 'app/specs/specsValue/specsValue.html',
      controller: SpecsValueComponent,
      controllerAs: '$cn'
    });

})();
