'use strict';
(function(){

class ClientComponent {

  title = "Clients";

  constructor( factoryClients, serviceClients, $state, $stateParams ) {
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
  }

  selectClient(client){

    console.log("intoSelectClient");
    this.client = client;
    this.$state.go('clientEdit', {client: client}, { reload: true });
  }


}

angular.module('processAdminApp')
  .component('client', {
    templateUrl: 'app/client/client.html',
    controller: ClientComponent,
    controllerAs: '$cn'
  });

})();
