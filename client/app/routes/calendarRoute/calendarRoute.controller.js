'use strict';
(function(){

class CalendarRouteComponent {

  constructor($uibModal, $stateParams, $state, noty, factoryServices, $confirm, $log) {
    this.$log = $log;
    this.$confirm = $confirm;
    this.factoryServices = factoryServices;
    this.$uibModal = $uibModal;
    this.noty = noty;
    this.$state = $state;
    this.route = $stateParams.route;
    if (this.route == null) {
      this.$state.go('routes.all', null, {
        reload: true
      });
    } else {
      this.getRouteInfo();
    }
  }

  getRouteInfo() {
    var _this = this;
    _this.factoryServices.getResourceById('routes', this.route.idRoutes).then(function(response) {
        _this.route = response;
      }),
      function(err) {}
  }

  openNewModal() {
    this.openModal({
      idRoutes: this.route.idRoutes
    });
  }

  openModal(calendarRoute) {

    var _this = this;
    var modalInstance = this.$uibModal.open({
      animation: false,
      templateUrl: 'app/routes/calendarRoute/calendarRouteModal/calendarRouteModal.html',
      controller: 'CalendarRouteModalCtrl',
      size: 'md',
      resolve: {
        calendarRoute: function() {
          return calendarRoute;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      var calendarRoute = selectedItem;
      if (calendarRoute.idCalendarRoute != null && calendarRoute.idCalendarRoute > 0) {
        // update calendarRoute
        _this.factoryServices.updateResourceCallback('calendarRoute', calendarRoute, function() {
          _this.getRouteInfo();
        });
      } else {
        // save new calendarRoute
        _this.factoryServices.saveResourceCallback('calendarRoute', calendarRoute, function() {
          _this.getRouteInfo();
        });
      }
    });
  }

  delete(calendarRoute){
    var _this = this;
    this.$confirm({
        text: 'Estas seguro de borrar el registro??'
      })
      .then(function() {
        _this.factoryServices.deleteResource('calendarRoute', calendarRoute).then(function(info){
          _this.back();
        });
    });
  }

  back() {
    this.getRouteInfo();
  }
}

angular.module('processAdminApp')
  .component('calendarRoute', {
    templateUrl: 'app/routes/calendarRoute/calendarRoute.html',
    controller: CalendarRouteComponent,
    controllerAs: "$cn"
  });
})();
