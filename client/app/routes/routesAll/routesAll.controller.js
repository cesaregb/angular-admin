'use strict';
(function(){

class RoutesAllComponent {

  title = "Routes";

  constructor( factoryRoutes, $state, $stateParams ) {
    this.$state = $state;
    this.factoryRoutes = factoryRoutes;
    this.route = null;
    this.gatherRoutes();
  }

  gatherRoutes(){
    var _this = this;
    this.factoryRoutes.getAllRoutes().then(function(response) {
      _this.appRoutes = response;
    }), function(err) {}
  }

  selectRoute(route){
    this.route = route;
    this.$state.go('routes.edit', {route: route}, { reload: true });
  }
}

angular.module('processAdminApp')
  .component('routesAll', {
    templateUrl: 'app/routes/routesAll/routesAll.html',
    controller: RoutesAllComponent,
    controllerAs: '$cn'
  });

})();
