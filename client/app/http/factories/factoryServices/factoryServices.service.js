'use strict';

angular.module('processAdminApp')
  .factory('factoryServices', function(factoryCommon, noty, $log, $q, $filter) {

    var factory = {};

    var uris = {
      service: {
        uri: '/service'
      },
      serviceType: {
        uri: '/service-type'
      },
      orderType: {
        uri: '/order-type'
      },
      serviceCategory: {
        uri: '/service-category'
      },
      taskType: {
        uri: '/task-type'
      },
      task: {
        uri: '/task'
      },
      spec: {
        uri: '/spec'
      },
      specsValue: {
        uri: '/specs-value'
      },
      product: {
        uri: '/product'
      },
      productType: {
        uri: '/product-type'
      },
      distanceInfo: {
        uri: '/distance-info'
      },
      serviceTypeSpec: {
        uri: '/service-type-specs'
      },
      serviceTypeTask: {
        uri: '/service-type-task'
      },
      orderTypeTask: {
        uri: '/order-type-task'
      },
    };

    factory.getResources = function(idUri) {
      return factoryCommon.get(uris[idUri].uri);
    };

    factory.getResourceById = function(idUri, idResource) {
      return factoryCommon.get(uris[idUri].uri + '/' + idResource);
    };

    factory.saveResource = function(idUri, data) {
      return factoryCommon.save(data, uris[idUri].uri);
    };
    factory.updateResource = function(idUri, data) {
      return factoryCommon.put(data, uris[idUri].uri);
    };
    factory.deleteResource = function(idUri, idResource) {
      return factoryCommon.delete(uris[idUri].uri + '/' + idResource);
    };

    factory.saveResourceCallback = function(idUri, dataInput, callback) {
      this.saveResource(idUri, dataInput).then(function(result) {
          callback();
        }),
        function(error) {
          callback();
        }
    }

    factory.updateResourceCallback = function(idUri, dataInput, callback) {
      this.updateResource(idUri, dataInput).then(function(result) {
          callback();
        }),
        function(error) {
          callback();
        }
    };

    factory.getResourcesForTable = function(idUri, params) {
      var deferred = $q.defer();
      this.getResources(idUri).then(function(result) {
        var filterData = params.filter() ?
          $filter('filter')(result, params.filter()) :
          result;
        var orderedData = params.sorting() ?
          $filter('orderBy')(filterData, params.orderBy()) :
          filterData;

        var sortOrdResult = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
        deferred.resolve(sortOrdResult);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };


    // ******* non repetetive...
    factory.getSpecValuesBySpec = function(idSpec) {
      var uri = uris.specsValue.uri;
      return factoryCommon.get(uri + "/spec/" + idSpec);
    };

    factory.getTaskByType = function(idTasktype) {
      var uri = uris.task.uri + '/taskType/' + idTasktype;
      return factoryCommon.get(uri);
    }

    return factory;

  });
