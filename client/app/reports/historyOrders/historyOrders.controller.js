'use strict';
(function () {

  class HistoryOrdersComponent {

    constructor(factoryServices, $log, NgTableParams) {
      this.NgTableParams = NgTableParams;
      this.$log = $log;
      this.factoryServices = factoryServices;
      this.report = {
        initDate: null,
        endDate: null
      };

    }

    initDateState = false;
    endDateState = false;

    openCalendar(e, m) {
      e.preventDefault();
      e.stopPropagation();
      if (m === 'initDate') {
        this.initDateState = !this.initDateState;
        this.endDateState = false;
      } else if (m === 'endDate') {
        this.endDateState = !this.endDateState;
        this.initDateState = false;
      }
    };

    $onInit() {
    }

    getTableFilter() {
      this.showResults = false;
      return this.factoryServices.getOrdersBetweenDates(this.report.initDate, this.report.endDate);
    }

    refreshTable() {
      this.tableParams.reload();
    }

    searchOrders() {
      this.tableParams = new this.NgTableParams({count: 10, page: 1}, {
        counts: [5, 10],
        getData: (params) => {
          return this.factoryServices.getResourcesForTableSpecific(this.getTableFilter(), params);
        }
      });
    }
  }

  angular.module('processAdminApp')
    .component('historyOrders', {
      templateUrl: 'app/reports/historyOrders/historyOrders.html',
      controller: HistoryOrdersComponent,
      controllerAs: '$cn'
    });

})();
