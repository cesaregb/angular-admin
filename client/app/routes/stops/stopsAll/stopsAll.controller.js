'use strict';
(function() {

  class StopAllComponent {

    constructor($uibModal, $stateParams, $state, noty, factoryServices, $scope, $log, $confirm) {
      this.$log = $log;
      this.$confirm = $confirm;
      this.factoryServices = factoryServices;
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
        this.getRoute();
      }
    }

    getRoute() {
      var _this = this;
      _this.factoryServices.getRouteById(this.route.idRoutes).then(function(response) {
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

    delete(stop){
      var _this = this;
      this.$confirm({
          text: 'Are you sure you want to delete?'
        })
        .then(function() {
          _this.factoryServices.deleteStop(stop).then(function(info){
            _this.back();
          });
        });
    }

    back() {
      this.getRoute();
    }
  }

  angular.module('processAdminApp')
    .component('stopsAll', {
      templateUrl: 'app/routes/stops/stopsAll/stopsAll.html',
       controller: StopAllComponent,
      controllerAs: '$cn'
    });

})();
