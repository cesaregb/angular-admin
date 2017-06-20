'use strict';

angular.module('processAdminApp')
  .factory('uiUtils', function (factoryCommon, $uibModal, $log, messageHandler) {

    let factory = {};

    factory.showOrderHistory = function (idOrder) {
      $log.info('[showOrderHistory] idOrder: ' + idOrder);
      factoryCommon.getResourceById('orders', idOrder).then((order) => {
        let modalInstance = $uibModal.open({
          animation: false,
          templateUrl: 'app/orders/orderInfoModal/orderInfoModal.html',
          controller: 'OrderInfoModalController',
          size: 'lg',
          resolve: {
            order: function () {
              return order;
            }
          }
        });

        modalInstance.result.then(function (resultItem) {
          // nothid to do...
        });

      }, () => {
        messageHandler.showError(`Orden ${idOrder} no encontrada`);
      });


    };


    return factory;

  });
