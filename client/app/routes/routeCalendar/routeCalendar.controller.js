'use strict';
(function(){

class RouteCalendarComponent {

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
    _this.factoryRoutes.getRouteById(this.route.idRoute).then(function(response) {
        _this.route = response;
      }),
      function(err) {}
  }

  openNewModal() {
    this.openModal({
      idRoute: this.route.idRoute
    });
  }

  openModal(routePaymentInfo) {

    var _this = this;
    var modalInstance = this.$uibModal.open({
      animation: false,
      templateUrl: '/app/routes/routePaymentInfo/routePaymentInfoModal/routePaymentInfo.html',
      controller: 'RoutePaymentInfoModalCtrl',
      size: 'md',
      resolve: {
        routePaymentInfo: function() {
          return routePaymentInfo;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {

      var routePaymentInfo = selectedItem;
      if (routePaymentInfo.idRoutePaymentInfo != null && routePaymentInfo.idRoutePaymentInfo > 0) {
        // update routePaymentInfo
        _this.factoryRoutes.updateRoutePaymentInfoCallback(routePaymentInfo, function() {
          _this.getRouteInfo();
        });
      } else {
        // save new routePaymentInfo
        _this.factoryRoutes.saveRoutePaymentInfoCallback(routePaymentInfo, function() {
          _this.getRouteInfo();
        });
      }
    });
  }
}

angular.module('processAdminApp')
  .component('routeCalendar', {
    templateUrl: 'app/routes/routeCalendar/routeCalendar.html',
    controller: RouteCalendarComponent
  });

})();
