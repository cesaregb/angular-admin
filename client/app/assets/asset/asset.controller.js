'use strict';
(function() {

  class AssetComponent {
    assets = [];

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
      this.factoryGeneral.getAssets().then(function(response) {
        _this.assets = response;

      });
    }

    openNewModal() {
      this.openModal({});
    }

    openModal(formItem) {

      var _this = this;
      var modalInstance = this.$uibModal.open({
        animation: false,
        templateUrl: '/app/assets/asset/assetModal/assetModal.html',
        controller: 'AssetModalCtrl',
        size: 'md',
        resolve: {
          formItem: function() {
            return formItem;
          }
        }
      });

      modalInstance.result.then(function(resultItem) {
        var asset = resultItem;
        if (asset.idAsset != null && asset.idAsset > 0) {
          _this.factoryGeneral.updateAssetCallback(asset, function() {
            _this.getInfo();
          });
        } else {

          _this.factoryGeneral.saveAssetCallback(asset, function() {
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
        _this.factoryGeneral.deleteAsset(item).then(function(info){
          _this.back();
        });
      });
    }

    back() {
      this.getInfo();
    }
  }

  angular.module('processAdminApp')
    .component('asset', {
      templateUrl: 'app/assets/asset/asset.html',
      controller: AssetComponent,
      controllerAs: '$cn'
    });

})();
