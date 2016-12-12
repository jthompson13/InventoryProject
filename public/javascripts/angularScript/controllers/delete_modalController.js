(function () {
    "use strict";

    angular.module("inventoryApp").controller("delete_modalController", delete_modalController);


    delete_modalController.$inject = [ "$scope", "$uibModalInstance", "items" ];

    function delete_modalController($scope, $uibModalInstance, items) {
        $scope.title = items.title;
        $scope.device = items.device.dns_name;

        $scope.accept_delete = function() {
            try {
                $uibModalInstance.close(items.device);
            }catch (e){
                console.log(e)
            }
        };

        $scope.close = function () {
            $uibModalInstance.close();
        };

    }

})();