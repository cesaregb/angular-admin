'use strict';
(function(){

class ClientComponent {

  title = "Clients";

  filters = [
      {name:'Name', value:'name'},
      {name:'Email', value:'email'},
      {name:'Phone Number', value:'phone'}
    ];

  constructor( factoryServices, serviceClients, $state, $log ) {
    this.$state = $state;
    this.$log = $log;
    this.factoryServices = factoryServices;
    this.serviceClients = serviceClients;
    this.client = null;
    this.gatherClients();
  }

  gatherClients(){
    this.clients = this.serviceClients.query();
    this.searchFilter = this.filters[0];
  }

  selectClient(client){
    this.client = client;
    this.$state.go('client.edit', {client: client}, { reload: true });
  }

  searchClient(){
    var _this = this;
    var text = this.searchText;
    var filter = this.searchFilter;

    var filterArray = [];
    var applyFilter = {'key':filter.value, 'value':text};
    filterArray.push(applyFilter);

    this.factoryServices.getClientByFilter(filterArray).then(function(response){
        _this.clients = response;
    });

  }

}

angular.module('processAdminApp')
  .component('client', {
    templateUrl: 'app/clients/client/client.html',
    controller: ClientComponent,
    authenticate: true,
    controllerAs: '$cn'
  });

})();
