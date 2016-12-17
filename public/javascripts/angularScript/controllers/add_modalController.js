(function () {
    "use strict";

    angular.module("inventoryApp").controller("add_modalController", add_modalController);


    add_modalController.$inject = [ "$scope", "$uibModalInstance", "items" ];

    function add_modalController($scope, $uibModalInstance, items) {
        $scope.title = items.title;
        $scope.vendors = items.vendors;


        $scope.accept_add = function() {

            items.newDevice = {dns_name: $('#name').val(),
                serial_number: $('#serial').val(),
                date_deployed: $('#deployed').val(),
                current_status: $('#status').val(),
                OS: $('#os').val(),
                vendor_id: $('#vendor option:selected').val(),
                start_date: $('#start').val(),
                end_date: $('#end').val()
            };


            try {
                $uibModalInstance.close(items.newDevice);
            }catch (e){
                console.log(e)
            }
        };

        $scope.close = function () {
            $uibModalInstance.close();
        };

    }

})();