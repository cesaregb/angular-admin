'use strict';
(function () {

  class HistoryCashOutComponent {

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

    $onInit() { }

    getTableFilter() {
      return this.factoryServices.getCashOutBetweenDates(this.report.initDate, this.report.endDate);
    }

    refreshTable() {
      this.tableParams.reload();
    }

    searchCashOuts(){
      this.tableParams = new this.NgTableParams({}, {
        getData:  (params) => {
          return this.factoryServices.getResourcesForTableSpecific(this.getTableFilter(), params);
        }
      });
    }


  }

  angular.module('processAdminApp')
    .component('historyCashOut', {
      templateUrl: 'app/reports/historyCashOut/historyCashOut.html',
      controller: HistoryCashOutComponent,
      controllerAs: '$cn'
    });

})();
