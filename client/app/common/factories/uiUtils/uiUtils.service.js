'use strict';

angular.module('processAdminApp')
  .factory('uiUtils', function (factoryServices, $uibModal, $log, messageHandler) {

    let factory = {};

    factory.showOrderHistory = function (idOrder) {
      if (!Boolean(idOrder)) {
        messageHandler.showError(`Orden ${idOrder} no encontrada`);
        return;
      }

      factoryServices.getResourceById('orders', idOrder).then((order) => {
        let modalInstance = $uibModal.open({
          animation: false,
          templateUrl: 'app/orders/orderInfoModal/orderInfoModal.html',
          controller: 'OrderInfoModalCtrl',
          size: 'md',
          resolve: {
            injectData: function () {
              return order;
            }
          }
        });
        modalInstance.result.then(function (resultItem) {
        });
      }, () => {
        messageHandler.showError(`Orden ${idOrder} no encontrada`);
      });

    };

    return factory;

  });
