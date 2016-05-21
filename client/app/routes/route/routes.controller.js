'use strict';
(function(){

class RoutesComponent {

  categories = [
      {name:'Apartments', value:1},
      {name:'Offices', value:2},
      {name:'Clients (Business)', value:3}
    ];

  constructor($stateParams, $state, noty, factoryRoutes, $log) {
    this.factoryRoutes = factoryRoutes;
    this.noty = noty;
    this.$log = $log;
    this.newRoute = true;
    this.$state = $state;
    this.route = $stateParams.route;
    this.$log.info("Route: " + JSON.stringify(this.route));
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
    }else{
      this.route = {};
      this.route.category = 1;
    }

  }

  back() { // back handler...
    this.$state.go('route.all',null , { reload: true });
  }

  getRoute( id ){
    var _this = this;
    this.factoryRoutes.getRouteById(id).then(function(data){
      _this.route = data;
    });
  }

  saveRoute(){
    var _this = this;

    if (this.routeForm.$valid) {
      if (this.newRoute){
        var myRoute = this.route;
        // not abstracting this piece cuz its only used here.
        _this.factoryRoutes.saveRoute( myRoute ).then( function( data ){ // saving new
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
    _this.factoryRoutes.updateRoute( _this.route ).then(function(data){ // updating existing
      console.log("Route updated. " + JSON.stringify(data));
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
