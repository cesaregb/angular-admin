'use strict';

angular.module('processAdminApp')
  .factory('factoryServices', function (factoryCommon, noty, $log, $q, $filter) {
    let factory = {};

    let uris = {
      clients: {
        name: 'clients',
        uri: '/clients'
      },
      clientType: {
        name: 'clientType',
        uri: '/clients/client-type'
      },
      phoneNumber: {
        name: 'phoneNumber',
        uri: '/clients/phone-number'
      },
      address: {
        name: 'address',
        uri: '/clients/address'
      },
      clientPaymentInfo: {
        uri: '/clients/client-payment-info'
      },
      clientBag: {
        uri: '/client-bag'
      },
      services: {
        name: 'services',
        uri: '/services'
      },
      serviceType: {
        uri: '/services/service-type'
      },
      serviceTypeSpec: {
        uri: '/services/service-type/service-type-specs'
      },
      serviceTypeTask: {
        uri: '/services/service-type/service-type-task'
      },
      serviceCategory: {
        uri: '/services/service-category'
      },
      orderType: {
        uri: '/orders/order-type'
      },
      orderTypeTask: {
        uri: '/orders/order-type/order-type-task'
      },
      orders: {
        uri: '/orders'
      },
      taskType: {
        uri: '/tasks/task-type'
      },
      tasks: {
        uri: '/tasks'
      },
      specs: {
        uri: '/specs'
      },
      specsValue: {
        uri: '/specs/specs-values'
      },
      supplies: {
        uri: '/supplies'
      },
      supplyType: {
        uri: '/supplies/supply-type'
      },
      distanceInfo: {
        uri: '/distance-info'
      },
      products: {
        uri: '/products'
      },
      productType: {
        uri: '/products/product-type'
      },
      stores: {
        uri: '/stores'
      },
      routes: {
        uri: '/routes'
      },
      calendarRoutes: {
        uri: '/calendarRoutes'
      },
      stops: {
        uri: '/stops'
      },
      employees: {
        uri: '/employees'
      },
      employeeType: {
        uri: '/employees/employee-type'
      },
      assetType: {
        uri: '/asset-type'
      },
      assets: {
        uri: '/assets'
      },
      priceAdjustments: {
        uri: '/priceAdjustments'
      },
      cashOut: {
        uri: '/cash-outs'
      }
    };
    factory.uris = uris;

    factory.getResources = function (idUri) {
      return factoryCommon.get(uris[idUri].uri);
    };

    factory.getResourceById = function (idUri, idResource) {
      return factoryCommon.get(uris[idUri].uri + '/byId/' + idResource);
    };

    factory.saveResource = function (idUri, data) {
      return factoryCommon.save(data, uris[idUri].uri);
    };

    factory.patchResource = function (idUri, data) {
      return factoryCommon.patch(data, uris[idUri].uri);
    };

    factory.updateResource = function (idUri, data) {
      return factoryCommon.put(data, uris[idUri].uri);
    };
    factory.deleteResource = function (idUri, idResource) {
      return factoryCommon.delete(uris[idUri].uri + '/' + idResource);
    };

    // End General
    factory.getResourcesForTable = function (idUri, params) {
      var deferred = $q.defer();
      this.getResources(idUri).then(function (result) {
        var filterData = params.filter() ?
          $filter('filter')(result, params.filter()) :
          result;
        var orderedData = params.sorting() ?
          $filter('orderBy')(filterData, params.orderBy()) :
          filterData;

        var sortOrdResult = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
        deferred.resolve(sortOrdResult);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    //
    factory.getResourcesForTableSpecific = function (functionPromise, params) {
      let deferred = $q.defer();
      functionPromise.then(function (result) {
        let filterData = params.filter() ?
          $filter('filter')(result, params.filter()) :
          result;
        let orderedData = params.sorting() ?
          $filter('orderBy')(filterData, params.orderBy()) :
          filterData;

        let sortOrdResult = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        deferred.resolve(sortOrdResult);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    // ******* non repetetive...
    factory.getSpecValuesBySpec = function (idSpec) {
      let uri = uris.specs.uri + '/' + idSpec + '/specs-values';
      return factoryCommon.get(uri);
    };

    factory.getTaskByType = function (idTasktype) {
      let params = {idTaskType: idTasktype};
      return factoryCommon.get(uris.tasks.uri, params);
    };

    factory.getTaskTypeBySection = function (flag) {
      let params = {filterBy: flag};
      return factoryCommon.get(uris.taskType.uri, params);
    };

    factory.getServiceTypeSpecById = function (id) {
      let uri = uris.serviceTypeSpec.uri + '/byServiceType/' + id;
      return factoryCommon.get(uri);
    };

    factory.getServiceOrderDetails = function () {
      let uri = uris.orderType.uri + '/pre-order';
      return factoryCommon.get(uri);
    };

    factory.addOrderServiceType = function (orderType) {
      let uri = uris.orderType.uri + '/add/serviceType';
      return factoryCommon.put(orderType, uri);
    };

    factory.saveOrder = function (order) {
      let uri = uris.orderType.uri + '/create-order';
      return factoryCommon.post(order, uri);
    };

    factory.getTaskForOrder = function (idOrder) {
      let uri = uris.orders.uri + '/tasks/' + idOrder;
      return factoryCommon.get(uri);
    };

    factory.getActiveOrders = function () {
      const params = {pending: true};
      return factoryCommon.get(uris.orders.uri, params);
    };

    factory.getProductsByName = function (name) {
      return factoryCommon.get(uris.products.uri, {name: name});
    };

    factory.getProductsByType = function (idProductType) {
      return factoryCommon.get(uris.products.uri, {idProductType: idProductType});
    };

    factory.getProductsByProductTypes = function (ids) {
      let uri = uris.products.uri + '/byProductTypes';
      return factoryCommon.post(ids, uri);
    };

    factory.getClientByFilter = function (object) {
      return factoryCommon.get(uris.clients.uri, object);
    };

    factory.getClientByIdAddress = function (idAddress) {
      return factoryCommon.get(uris.clients.uri + '/addressId/' + idAddress);
    };
    factory.getAddressByStop = function (type, id) {
      return factoryCommon.get(uris.stops.uri + '/address/' + type + '/' + id);
    };

    factory.addServiceTypeProducts = function (idServiceType, productTypes) {
      let uri = uris.serviceType.uri + '/addProducts/' + idServiceType;
      return factoryCommon.post(productTypes, uri);
    };

    factory.addServiceTypeTasks = function (idServiceType, serviceTypeTasks) {
      let uri = uris.serviceType.uri + '/addTasks/' + idServiceType;
      return factoryCommon.post(serviceTypeTasks, uri);
    };

    factory.addServiceTypeSpecs = function (idServiceType, specs) {
      let uri = uris.serviceType.uri + '/addSpecs/' + idServiceType;
      return factoryCommon.post(specs, uri);
    };

    factory.taskAction = function (idOrder, action, task) {
      let uri = uris.tasks.uri + '/idOrder/' + idOrder + '/action/' + action;
      return factoryCommon.put(task, uri);
    };

    factory.getNextCashOut = function () {
      let uri = uris.cashOut.uri + '/next';
      return factoryCommon.get(uri);
    };

    factory.saveCashOut = function () {
      let uri = uris.cashOut.uri;
      return factoryCommon.post({}, uri);
    };

    factory.getOrdersPendingOfCashOut = function () {
      const params = {forCashOut: true};
      return factoryCommon.get(uris.orders.uri, params);
    };

    factory.payOrder = function (idOrder) {
      let order = {
        idOrder: idOrder,
        paymentStatus: true
      };
      let uri = uris.orders.uri;
      return factoryCommon.put(order, uri);
    };

    return factory;

  });
