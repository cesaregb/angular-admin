'use strict';
(function(){

class ClientComponent {

  title = "Clients";

  filters = [
      {name:'Name', value:'name'},
      {name:'Email', value:'email'},
      {name:'Phone Number', value:'phone'}
    ];

  constructor( factoryServices, serviceClients, $state, $log, NgTableParams ) {
    var _this = this;
    this.$state = $state;
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.factoryServices = factoryServices;
    this.serviceClients = serviceClients;
    this.client = null;
    this.searchFilter = this.filters[0];
    this.tableParams = new this.NgTableParams({}, {
      getData: function(params) {
        return _this.factoryServices.getResourcesForTableSpecific(_this.gatherClients(), params);
      }
    });
    this.gatherClients();
  }

  gatherClients(){
    // clients not being used.
    this.clients = this.serviceClients.query();

    let _this = this;
    let text = this.searchText;

    if(Boolean(text)){
      let filter = this.searchFilter;
      let filterArray = {};
      filterArray[filter.value] = text;
      return this.factoryServices.getClientByFilter(filterArray);
    }else{
      return this.factoryServices.getResources('clients');
    }

  }

  selectClient(client){
    this.client = client;
    this.$state.go('client.edit', {client: client}, { reload: true });
  }

  searchClient(){
    this.tableParams.reload();
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
