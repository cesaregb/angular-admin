'use strict';

angular.module('processAdminApp')
  .controller('AddServicesModalCtrl', function($scope, factoryServices, $uibModalInstance, orderType, $log, selectedService, noty) {

    // This object should be the response from modal.
    // should map to whatever is on the database object
    $scope.service = null;

    $scope.serviceCategories = [];
    $scope.serviceId = 0;

    if (Boolean(selectedService)) {
      // cast object into service.
      $scope.service = selectedService;
    }

    this.init = function() {

      factoryServices.getServiceOrderDetails().then(function(response) {

        $scope.serviceCategories = response;

        if (Boolean(selectedService)) {
          // if open selected service...
          $scope.service = selectedService;
          var indexCat = -1;
          var indexSt = -1;

          response.forEach(function(item, index){

              item.serviceTypes.forEach(function(st, index2){
                if (st.idServiceType == $scope.service.idServiceType){
                  indexCat = index;
                  indexSt = index2;
                }
              });
          });

          $scope.serviceCategorie = response[indexCat];
          $scope.serviceType = response[indexCat].serviceTypes[indexSt];

          if (Boolean(selectedService.savedService)){
            calculatePrice();

          }else{
            $scope.service = {};
          }
        }
      });

    };

    this.init();

    $scope.selectService = function(serviceType){
      $scope.service =  {};

      $scope.service = serviceType;
      $scope.service.composedPrice = $scope.service.price;
      $scope.service.totalPrice = $scope.service.price;

      if (Boolean($scope.service.specs)){
        // sort to ensure consistency
        $scope.service.specs.sort(function(a, b) {
            return parseFloat(a.idSpecs) - parseFloat(b.idSpecs);
        });

        $scope.service.specs.forEach(function(item){
          item.price = 0;
          item.amt = 0;
          item.qty = 1;
        });

        $scope.service.price = parseFloat(serviceType.price);
        preselectValues();
        calculatePrice();
      }else{
        noty.showNoty({
          text: "Servicio no tiene productos.... ",
          ttl: 1000 * 2,
          type: "warning"
        });
      }

    }

    $scope.selectSpecOption = function(workingWithSpec, specsValue){
      // spec price ==
      var amount = 0;

      $scope.service.specs.forEach(function(item){
        if (item.idSpecs == workingWithSpec.idSpecs){
          if (specsValue.costType === 0){
            item.amt = specsValue.serviceIncrement;
            item.type = "%";
          }else{
            item.amt = specsValue.specPrice;
            item.type = "$";
          }
        }
      });

      calculatePrice();
    }

    function preselectValues(){
      // preselect all the base elements...
      $scope.service.specs.forEach(function(item){
          if ( ( item.primarySpec ||  item.optional == 0 ) && !Boolean(item.type) ){

            item.specsValue = item.options[item.idSpecs][0];

            if (item.specsValue.costType === 0){
              item.amt = item.specsValue.serviceIncrement;
              item.type = "%";
            }else{
              item.amt = item.specsValue.specPrice;
              item.type = "$";
            }

          }
      });
    }

    function calculatePrice(){
      $scope.service.totalPrice = $scope.service.price;
      $scope.service.composedPrice = $scope.service.price;

      // get base price... based on $
      $scope.service.specs.forEach(function(item){
          if (item.primarySpec && item.type == "$" ){
            item.price = item.amt * item.qty;
            $scope.service.composedPrice = $scope.service.composedPrice + item.price;
          }
      });

      // both base add up to the price... the rest to the totalPrice
      // get base price... based on $
      $scope.service.specs.forEach(function(item){
          if (item.primarySpec && item.type == "%" ){
              item.price = ((item.amt * item.qty) / 100) * $scope.service.price;
              $scope.service.composedPrice = $scope.service.composedPrice + item.price;
          }
      });

      // calculate the percentage for the rest of the elements..
      $scope.service.totalPrice = $scope.service.composedPrice;

      $scope.service.specs.forEach(function(item){
        if (!item.primarySpec && item.type == "%"){
          // calculate line price before adding it to the total.
          item.price = ((item.amt * item.qty)/100) * $scope.service.composedPrice;
          // add calculated to the total
          $scope.service.totalPrice = $scope.service.totalPrice + item.price;
        }else if (!item.primarySpec && item.type == "$"){
          item.price = item.amt * item.qty;
          $scope.service.totalPrice = $scope.service.totalPrice + item.price;
        }
      });
    }

    $scope.changeQty = function(workingWithSpec, qty){
      calculatePrice();
    }

    $scope.okAction = function() {
      $uibModalInstance.close($scope.service);
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
