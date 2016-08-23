'use strict';
(function(){

class ServiceTypeFormComponent {
  parentSelect = [];
  formItemFields = [];
  serviceType = {};
  title = "New Service Type";

  constructor($scope, $stateParams, $state, noty, $log, $uibModal, $confirm, factoryServices, formlyForms) {
    this.$log = $log;
    this.factoryServices = factoryServices;
    this.$confirm = $confirm;
    this.$uibModal = $uibModal;
    this.$scope = $scope;
    this.noty = noty;
    this.$state = $state;
    this.place = null;
    this.serviceType = $stateParams.serviceType;
    this.editMode = (Boolean(this.serviceType) && Boolean(this.serviceType.idServiceType));

    // assign form
    this.formItemFields = formlyForms.serviceType;
    // manage computed items.
    this.formItemFields.push({
      key: 'idServiceCategory',
      type: 'select',
      templateOptions: {
        label: 'Service Category',
        options: this.parentSelect
      }
    });

    var _this = this;
    this.init();
  };

  fillCategories(){
    var _this = this;
    // load dropdown properties....
    this.factoryServices.getResources('serviceCategory').then(function(response){
      response.forEach(function(item){
        _this.parentSelect.push({name : item.name, value: item.idServiceCategory});
      });
      if (!Boolean(_this.serviceType.idServiceCategory) ){
        _this.serviceType.idServiceCategory = 1;
      }
    });
  };

  init(){
    this.editMode = (Boolean(this.serviceType) && Boolean(this.serviceType.idServiceType));
    this.fillCategories();
    if (Boolean(this.editMode)) {
      this.title = "Edit Service Type";
    }
  }

  saveServiceType() {
    var _this = this;
    if (this.serviceType.idServiceType != null && this.serviceType.idServiceType > 0) {
      _this.factoryServices.updateResource('serviceType', this.serviceType).then(function(result) {
        _this.serviceType = result;
        _this.init();
      });
    } else {
      _this.factoryServices.saveResource('serviceType', this.serviceType).then(function(result) {
        _this.serviceType = result;
        _this.init();
      });
    }
  };

  delete() {
    var _this = this;
    this.$confirm({
      text: 'Are you sure you want to delete?'
    })
    .then(function() {
      _this.factoryServices.deleteResource('serviceType', _this.serviceType.idServiceType).then(function(info){
        _this.back();
      });
    });
  };

  back() {
    this.$state.go('services.serviceType', null, {
      reload: true
    });
  }


  openManageSpecsModal(formItem) {
    var _this = this;
    var modalInstance = this.$uibModal.open({
      animation: false,
      templateUrl: 'app/services/serviceType/manageSpecsModal/manageSpecsModal.html',
      controller: 'ManageSpecsModalCtrl',
      size: 'lg',
      resolve: {
        formItem: function() {
          return formItem;
        }
      }
    });

    modalInstance.result.then(function(resultItem) {
      var serviceType = resultItem;
      if (serviceType.serviceTypeSpecs.length > 0){
        serviceType.serviceTypeSpecs.forEach(function(serviceTypeSpec){
          _this.factoryServices.saveResource('serviceTypeSpec', serviceTypeSpec).then(function(response){
            // do nothing...
          })
        });
      }
      // all the info should be saved.
    });
  }

  openManageTaskModal(formItem) {
    var _this = this;
    var modalInstance = this.$uibModal.open({
      animation: false,
      templateUrl: 'app/services/serviceType/manageTasksModal/manageServiceTasksModal.html',
      controller: 'ManageServiceTasksModalCtrl',
      size: 'lg',
      resolve: {
        formItem: function() {
          return formItem;
        }
      }
    });

    modalInstance.result.then(function(resultItem) {
      var serviceType = resultItem;
      if (serviceType.serviceTypeTasks.length > 0){
        serviceType.serviceTypeTasks.forEach(function(serviceTypeTask){
          _this.factoryServices.saveResource('serviceTypeTask', serviceTypeTask).then(function(response){
            // do nothing..
          })
        });
      }
    });
  }
  // end class
}

angular.module('processAdminApp')
  .component('serviceTypeForm', {
    templateUrl: 'app/services/serviceTypeForm/serviceTypeForm.html',
    controller: ServiceTypeFormComponent,
    controllerAs: '$cn'
  });

})();
