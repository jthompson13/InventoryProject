/**
 * Created by Jonathon on 12/9/2016.
 */

(function() {
    'use strict';

    angular.module('inventoryApp')
        .controller('indexController', indexController);

    indexController.$inject = ['$scope', 'serverService', 'watches', '$uibModal', 'pubsubService'];

    function indexController($scope, serverService, watches, $uibModal, pubsubService) {
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

        function getVendors() {
            serverService.getVendors()
                .then(function (response) {
                    var vendors = response.data;
                    displayModal_add(vendors);
                });
        }

        function deleteServer(server) {
            serverService.deleteServer(server)
                .then(function (res) {
                    if(res) {
                        setServers();
                    }
                });
        }

        function addServer(server) {
            serverService.addNewServer(server)
                .then(function (res) {
                    if(res) {
                        setServers();
                    }
                });
        }


        $scope.add = function () {
           getVendors(); // this will then display the modal
        };

        $scope.delete = function (device) {
            displayModal_delete(device);
        };

        $scope.edit = function () {

        };


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


        var displayModal_delete = function (device) {

            try {
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "delete_modal.html",
                    controller: "delete_modalController",
                    size: "lg",
                    backdrop: false,
                    resolve: {
                        items: function () {
                            return {
                                title: "Confirm Delete",
                                device: device
                            }
                        }
                    }
                }).result.then(function (x) {
                    if(x){
                        deleteServer(x);
                    }
                });

            } catch (e) {
                console.log(e)
            }
        };


        var displayModal_add = function (vendors) {

            try {
                $scope.modalInstance = $uibModal.open({
                    templateUrl: "add_modal.html",
                    controller: "add_modalController",
                    size: "lg",
                    backdrop: false,
                    resolve: {
                        items: function () {
                            return {
                                title: "Add Server",
                                vendors: vendors
                            }
                        }
                    }
                }).result.then(function (x) {
                    if(x){
                        addServer(x);
                    }
                });

            } catch (e) {
                console.log(e)
            }
        };
    }

})();