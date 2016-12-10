/**
 * Created by Jonathon on 12/9/2016.
 */

(function() {
    angular.module('inventoryApp')
        .controller('indexController', indexController);

    indexController.$inject = ['$scope', 'serverService', 'watches', 'pubsubService'];

    function indexController($scope, serverService, watches, pubsubService) {
        $scope.sortType = "device_key";
        $scope.sortReverse = false;
        $scope.searchFilter = "";
        $scope.statusFilter = "";
        $scope.inventoryCount = 0;

        setServers();

        function setServers() {
            serverService.getServers()
                .then(function (response) {
                    $scope.servers = response.data;
                    getCount();
                });
        }


        function getCount() {
            serverService.getServerCount()
                .then(function (c) {
                    $scope.inventoryCount = c.data.count;
                });
        }

        $scope.clear = function () {
            $scope.searchFilter = "";
            $scope.statusFilter = "";
            pubsubService.clearFilter();

        };

        $scope.$watch(function () {
            return watches.getFilter();
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) $scope.searchFilter = newValue;
        });

        $scope.$watch(function () {
            return watches.getStatus();
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) $scope.statusFilter = newValue;
        });

        pubsubService.onClearFilter($scope, function (message) {
            $scope.searchFilter = message.filter;
            $scope.statusFilter = message.status;
        });
    }

})();