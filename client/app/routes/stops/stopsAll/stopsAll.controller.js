'use strict';
(function() {

  class StopAllComponent {

    constructor($uibModal, $stateParams, $state, noty, factoryRoutes, $scope, $log) {
      this.$log = $log;
      this.factoryRoutes = factoryRoutes;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.noty = noty;
      this.$state = $state;
      this.route = $stateParams.route;
      if (this.route == null) {
        this.$state.go('routes.all', null, {
          reload: true
        });
      } else {
        // this.getRoute();
      }
    }

    getRoute() {
      var _this = this;
      _this.factoryRoutes.getRouteById(this.route.idRoute).then(function(response) {
          _this.route = response;
        }),
        function(err) {}
    }

    addNewItem() {
      this.addEditItem({
        idRoutes: this.route.idRoutes
      });
    }

    addEditItem( stop ) {
      // stop.type = 1;
      this.$scope.$parent.openStopForm(this.route, stop);
    }
  }

  angular.module('processAdminApp')
    .component('stopsAll', {
      templateUrl: 'app/routes/stops/stopsAll/stopsAll.html',
       controller: StopAllComponent,
      controllerAs: '$cn'
    });

})();
