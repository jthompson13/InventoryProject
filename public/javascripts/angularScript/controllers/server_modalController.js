(function () {
    "use strict";

    angular.module("inventoryApp").controller("server_modalController", server_modalController);


    server_modalController.$inject = [ "$scope", "$uibModalInstance", "items" ];

    function server_modalController($scope, $uibModalInstance, items) {
        $scope.title = items.title;
        $scope.s = items.Server;

        $scope.close = function () {
            $uibModalInstance.close();
        };

    }

})();