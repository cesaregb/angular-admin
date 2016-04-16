'use strict';
(function(){

class ClientEditComponent {
  selectedPhone = null;

  constructor($stateParams, $state) {
    this.newClient = true;
    this.$state = $state;
    this.client = $stateParams.client;
    this.title = "New Client"
    this.validClient = null;
    this.settupClient();
  }

  // load initial client if any...
  settupClient(){
    var _this = this;

    if (this.client != null){
      this.newClient = false;
      this.title = "Edit: " + this.client.name;
    }

    this.selectedPhone = null;
    this.selectedAddress = null;
    // sett up initial phone
    if (this.selectedPhone == null
        && this.client != null
        && this.client.phoneNumbers.length > 0){

      this.selectedPhone = this.client.phoneNumbers[0];
      this.client.phoneNumbers.forEach(function(item){
        if (item.prefered == 1){
          _this.selectedPhone = item;
        }
      });

    }

    // sett up initial address
    if (this.selectedAddress == null
        && this.client != null
        && this.client.addresses.length > 0){

      this.selectedAddress = this.client.addresses[0];
      this.client.phoneNumbers.forEach(function(item){
        if (item.prefered == 1){
          _this.selectedPhone = item;
        }
      });

    }
  }

  // back handler...
  back(){
    this.$state.go('client',null , { reload: true });
  }

  updatePhone(){
    console.log("phone selected: " + JSON.stringify(this.selectedPhone));
  }
  updateAddress(){
    console.log("address selected: " + JSON.stringify(this.selectedAddress));
  }

  saveClient(){

    if (this.clientForm.$valid) {
        alert('our form is amazing');
    }
    this.temporalPhone;

    console.log("Saving client...!!!");
  }

}

angular.module('processAdminApp')
  .component('clientEdit', {
    templateUrl: 'app/clientEdit/clientEdit.html',
    controller: ClientEditComponent,
    controllerAs: '$cn'
  });

})();
