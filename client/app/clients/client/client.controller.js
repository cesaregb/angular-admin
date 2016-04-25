'use strict';
(function(){

class ClientComponent {

  title = "Clients";

  constructor( factoryClients, serviceClients, $state, $stateParams, uiGmapIsReady ) {
    this.$state = $state;
    this.factoryClients = factoryClients;
    this.serviceClients = serviceClients;
    this.client = null;
    this.gatherClients();
  }

  gatherClients(){
    this.clients = this.serviceClients.query();
  }

  selectClient(client){
    this.client = client;
    this.$state.go('clientEdit', {client: client}, { reload: true });
  }

}

angular.module('processAdminApp')
  .component('client', {
    templateUrl: 'app/clients/client/client.html',
    controller: ClientComponent,
    controllerAs: '$cn'
  });

})();
