'use strict';
(function(){

class ClientComponent {

  title = "Clients";

  constructor( factoryClients, serviceClients, $state ) {
    this.$state = $state;
    this.factoryClients = factoryClients;
    this.serviceClients = serviceClients;
    this.client = null;
    this.message = 'Hello';
    console.log("---> " + factoryClients.getURL());
    this.gatherClients();
  }

  gatherClients(){
    this.clients = this.serviceClients.query();
    this.clients.forEach(function(client){
      client.phone = "";
      client.address = "";

      // add default phone..
      client.phoneNumbers.forEach(function(phone){
        var dPhone = "";
        if (phone.prefered == 1){
          dPhone = phone;
        }
        client.phone = dPhone;
      });

      if (client.address.length > 0){
        client.address = client.address[0];
      }
      console.log("client: " + JSON.stringify(client));
    });
  }

  selectClient(client){
    console.log("intoSelectClient");
    this.client = client;
    this.$state.go('client.edit', {}, { reload: true });
  }


}

angular.module('processAdminApp')
  .component('client', {
    templateUrl: 'app/client/client.html',
    controller: ClientComponent,
    controllerAs: 'cntr'
  });

})();
