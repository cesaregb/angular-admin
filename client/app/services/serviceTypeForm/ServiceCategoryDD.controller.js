'use strict';

angular.module('processAdminApp')
  .controller('ServiceCategoryDD', function ($scope, factoryServices) {

    $scope.to.loading = factoryServices.getResources('serviceCategory').then((response) => {
      let holder = [];
      response.forEach((item) => {
        holder.push({name: item.name, value: item.idServiceCategory});
      });
      $scope.to.options = holder;
      return response;
    });

  });
