'use strict';
(function() {

  class AssetTypeComponent {
    assetTypes = [];

    constructor($stateParams, $state, noty, factoryGeneral, $confirm, $log, $uibModal) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryGeneral = factoryGeneral;
      this.$uibModal = $uibModal;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      this.getInfo();
    }

    getInfo() {
      var _this = this;
      this.factoryGeneral.getAssetTypes().then(function(response) {
        _this.assetTypes = response;
      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {
      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: 'app/assets/assetType/assetTypeModal/assetTypeModal.html',
        controller: 'AssetTypeModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var assetType = resultItem;
        if (assetType.idAssetType != null && assetType.idAssetType > 0) {
          _this.factoryGeneral.updateAssetTypeCallback(assetType, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryGeneral.saveAssetTypeCallback(assetType, function() {
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
        _this.factoryGeneral.deleteAssetType(item).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('assetType', {
      templateUrl: 'app/assets/assetType/assetType.html',
      controller: AssetTypeComponent,
      controllerAs: '$cn'
    });

})();
