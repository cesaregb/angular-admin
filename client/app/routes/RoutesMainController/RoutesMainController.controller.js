'use strict';

angular.module('processAdminApp')
  .controller('RoutesMainControllerCtrl', function ($scope, $state) {


    $scope.appModule = "routes"

    $scope.openStopForm = function(route, stop){
      if (stop == null){
        stop = {};
        stop.idRoutes = route.idRoutes;
      }
      $state.go('routes.stopForm', {route: route, stop: stop}, { reload: true });
    }

    $scope.getRoute = function( id ){
      var _this = this;
      this.factoryRoutes.getRouteById(id).then(function(data){
        _this.route = data;
      });
    }

  });
