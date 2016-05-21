'use strict';
(function(){

class CalendarRouteComponent {

  constructor($uibModal, $stateParams, $state, noty, factoryRoutes) {
    this.factoryRoutes = factoryRoutes;
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
    _this.factoryRoutes.getRouteById(this.route.idRoutes).then(function(response) {
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
      templateUrl: '/app/routes/calendarRoute/calendarRouteModal/calendarRouteModal.html',
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
        _this.factoryRoutes.updateCalendarRouteCallback(calendarRoute, function() {
          _this.getRouteInfo();
        });
      } else {
        // save new calendarRoute
        _this.factoryRoutes.saveCalendarRouteCallback(calendarRoute, function() {
          _this.getRouteInfo();
        });
      }
    });
  }
}

angular.module('processAdminApp')
  .component('calendarRoute', {
    templateUrl: 'app/routes/calendarRoute/calendarRoute.html',
    controller: CalendarRouteComponent,
    controllerAs: "$cn"
  });
})();
