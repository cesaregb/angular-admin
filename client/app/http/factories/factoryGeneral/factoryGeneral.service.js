'use strict';

angular.module('processAdminApp')
  .factory('factoryGeneral', function (factoryCommon, noty) {

    var factory = {};

    var employeeURI = "/employee";
    factory.getEmployees = function () {
       return factoryCommon.get(employeeURI);
    };
    factory.getEmployeeById = function (id) {
       return factoryCommon.get(employeeURI + "/" + id);
    };
    factory.saveEmployee = function (data) {
       return factoryCommon.save(data, employeeURI);
    };
    factory.updateEmployee = function (data) {
       return factoryCommon.put(data, employeeURI);
    };
    factory.deleteEmployee = function (data) {
       return factoryCommon.delete(employeeURI + "/" + data.idEmployee);
    };

    factory.saveEmployeeCallback = function(dataInput, callback){
      this.saveEmployee(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    factory.updateEmployeeCallback = function(dataInput, callback){
      this.updateEmployee(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    var employeeTypeURI = "/employee-type";
    factory.getEmployeeTypes = function () {
       return factoryCommon.get(employeeTypeURI);
    };
    factory.getEmployeeTypeById = function (id) {
       return factoryCommon.get(employeeTypeURI + "/" + id);
    };
    factory.saveEmployeeType = function (data) {
       return factoryCommon.save(data, employeeTypeURI);
    };
    factory.updateEmployeeType = function (data) {
       return factoryCommon.put(data, employeeTypeURI);
    };
    factory.deleteEmployeeType = function (data) {
       return factoryCommon.delete(employeeTypeURI + "/" + data.idEmployeeType);
    };

    factory.saveEmployeeTypeCallback = function(dataInput, callback){
      this.saveEmployeeType(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    factory.updateEmployeeTypeCallback = function(dataInput, callback){
      this.updateEmployeeType(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    var assetURI = "/asset";
    factory.getAssets = function () {
       return factoryCommon.get(assetURI);
    };
    factory.getAssetById = function (id) {
       return factoryCommon.get(assetURI + "/" + id);
    };
    factory.saveAsset = function (data) {
       return factoryCommon.save(data, assetURI);
    };
    factory.updateAsset = function (data) {
       return factoryCommon.put(data, assetURI);
    };
    factory.deleteAsset = function (data) {
       return factoryCommon.delete(assetURI + "/" + data.idAsset);
    };

    factory.saveAssetCallback = function(dataInput, callback){
      this.saveAsset(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    factory.updateAssetCallback = function(dataInput, callback){
      this.updateAsset(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    var assetTypeURI = "/asset-type";
    factory.getAssetTypes = function () {
       return factoryCommon.get(assetTypeURI);
    };
    factory.getAssetTypeById = function (id) {
       return factoryCommon.get(assetTypeURI + "/" + id);
    };
    factory.saveAssetType = function (data) {
       return factoryCommon.save(data, assetTypeURI);
    };
    factory.updateAssetType = function (data) {
       return factoryCommon.put(data, assetTypeURI);
    };
    factory.deleteAssetType = function (data) {
       return factoryCommon.delete(assetTypeURI + "/" + data.idAssetType);
    };

    factory.saveAssetTypeCallback = function(dataInput, callback){
      this.saveAssetType(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    factory.updateAssetTypeCallback = function(dataInput, callback){
      this.updateAssetType(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    var productTypeURI = "/product-type";
    factory.getProductTypes = function () {
       return factoryCommon.get(productTypeURI);
    };
    factory.getProductTypeById = function (id) {
       return factoryCommon.get(productTypeURI + "/" + id);
    };
    factory.saveProductType = function (data) {
       return factoryCommon.save(data, productTypeURI);
    };
    factory.updateProductType = function (data) {
       return factoryCommon.put(data, productTypeURI);
    };
    factory.deleteProductType = function (data) {
       return factoryCommon.delete(productTypeURI + "/" + data.idProductType);
    };

    factory.saveProductTypeCallback = function(dataInput, callback){
      this.saveProductType(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }
    factory.updateProductTypeCallback = function(dataInput, callback){
      this.updateProductType(dataInput).then(function(result){
        callback();
      }), function(error){
        callback();
      }
    }

    return factory;

  });
