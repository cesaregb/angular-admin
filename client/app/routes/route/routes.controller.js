'use strict';
(function(){

class RoutesComponent {

  categories = [
      {name:'Apartments', value:1},
      {name:'Offices', value:2},
      {name:'Clients (Business)', value:3}
    ];

  constructor($stateParams, $state, noty, factoryServices, $log, $confirm) {
    this.$confirm = $confirm;
    this.factoryServices = factoryServices;
    this.noty = noty;
    this.$log = $log;
    this.newRoute = true;
    this.$state = $state;
    this.route = $stateParams.route;
    this.title = "New Route"
    this.validRoute = null;
    this.setupRoute();
  }

  // load initial route if any...
  setupRoute(){
    var _this = this;
    if (this.route != null) {
      this.newRoute = false;
      this.title = "Edit: " + this.route.name;
      // reloead route ...
      this.factoryServices.getRouteById(this.route.idRoutes).then(function(result){
        _this.route = result;
      });
    }else{
      this.route = {};
      this.route.category = 1;
    }
  }

  delete(){
    var _this = this;
    this.$confirm({
        text: 'Estas seguro de borrar el registro??'
      })
      .then(function() {
        _this.factoryServices.deleteRoute(_this.route).then(function(info){
          _this.back();
        });
      });
  }

  back() {
    this.$state.go('routes.all',null , { reload: true });
  }

  saveRoute(){
    var _this = this;
    if (this.routeForm.$valid) {
      if (this.newRoute){
        var myRoute = this.route;
        // not abstracting this piece cuz its only used here.
        _this.factoryServices.saveRoute( myRoute ).then( function( data ){ // saving new
          _this.route = data;
          _this.setupRoute();
        }),function(error){ // error saving new
          console.log("Error saving route " + JSON.stringify(error));
        };

      }else{
        _this.saveExistingRoute();
      }
    }else{
      noty.showNoty({
        text: "Form not valid ",
        ttl: 1000 * 2,
        type: "warning"
      });
    }
  }

  saveExistingRoute(){
    var _this = this;
    _this.factoryServices.updateRoute( _this.route ).then(function(data){ // updating existing
      _this.setupRoute();
    }),function(error){ // error saving existing
      console.log("Error updating route: " + JSON.stringify(error));
    };
  }



}

angular.module('processAdminApp')
  .component('routes', {
    templateUrl: 'app/routes/route/routes.html',
    controller: RoutesComponent,
    controllerAs: '$cn'
  });

})();
