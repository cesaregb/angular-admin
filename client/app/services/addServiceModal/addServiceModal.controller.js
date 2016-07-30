'use strict';

angular.module('processAdminApp')
  .controller('AddServicesModalCtrl', function($scope, factoryServices, $uibModalInstance, orderType, $log, selectedService) {

    $scope.service = null;
    $scope.serviceCategories = [];
    $scope.specOptionHolder = {};

    if (Boolean(selectedService)) {
      $scope.service = selectedService;
    }

    this.init = function() {

      factoryServices.getServiceOrderDetails().then(function(response) {
        $scope.serviceCategories = response;

        if (Boolean(selectedService)) {
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
          $scope.service = selectedService;
        }
      });
    };

    this.init();

    $scope.selectService = function(serviceType){
      $scope.service =  {};

      $scope.service = serviceType;
      $scope.service.subtotalPrice = $scope.service.price;
      $scope.service.totalPrice = $scope.service.price;

      $scope.service.specs.forEach(function(item){
        item.price = 0;
        item.amt = 0;
        item.qty = 1;
      });

      $scope.service.price = parseFloat(serviceType.price);
      preselectValues();
      calculatePrice();
    }

    $scope.selectSpecOption = function(workingWithSpec, specsValue){
      // spec price ==
      var amount = 0;

      $scope.service.specs.forEach(function(item){
        if (item.idSpecs == workingWithSpec.idSpecs){
          // TOBE used....
          // item.specsValue = specsValue;
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
          if (item.primarySpec && !Boolean(item.type) ){

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
      $scope.service.subtotalPrice = $scope.service.price;

      // get base price... based on $
      $scope.service.specs.forEach(function(item){
          if (item.primarySpec && item.type == "$" ){
            item.price = item.amt * item.qty;
            $scope.service.subtotalPrice = $scope.service.subtotalPrice + item.price;
          }
      });

      // both base add up to the price... the rest to the totalPrice
      // get base price... based on $
      $scope.service.specs.forEach(function(item){
          if (item.primarySpec && item.type == "%" ){
              item.price = ((item.amt * item.qty) / 100) * $scope.service.price;
              $scope.service.subtotalPrice = $scope.service.subtotalPrice + item.price;
          }
      });

      // calculate the percentage for the rest of the elements..
      $scope.service.totalPrice = $scope.service.subtotalPrice;

      $scope.service.specs.forEach(function(item){
        if (!item.primarySpec && item.type == "%"){
          // calculate line price before adding it to the total.
          item.price = ((item.amt * item.qty)/100) * $scope.service.subtotalPrice;
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
