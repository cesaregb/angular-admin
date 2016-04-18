'use strict';
(function(){

class ClientPhoneComponent {

  constructor($uibModal) {
    this.$uibModal = $uibModal;
    this.message = 'Hello';
  }

  openModal(){
    console.log("opeening modal.... ");
    var _this = this;
    _this.items = [{key:"key"}];
    var modalInstance = this.$uibModal.open({
      animation: false,
      templateUrl: '/app/clients/clientPhone/clientPhoneModal/addPhoneModal.html',
      controller: 'ClientPhoneModalCtrl',
      size: 'lg',
      resolve: {
        items: function () {
          return _this.items;
        },
        phone : function(){
          return _this.phone;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log("selectedItem: " + JSON.stringify(selectedItem));
      _this.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }


}

angular.module('processAdminApp')
  .component('clientPhone', {
    templateUrl: 'app/clients/clientPhone/clientPhone.html',
    controller: ClientPhoneComponent,
    controllerAs: '$cn'
  });

})();
