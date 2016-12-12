(function() {
    angular.module('inventoryApp')
        .factory('serverService', serverService);

    serverService.$inject = ['$http'];

    function serverService($http) {
        return {
            getServers : getServers,

            getServerCount: getServerCount,

            addServerToInventory: addServerToInventory,

            deleteServer: deleteServer
        };

        function getServers() {
            return $http.get('/servers');
        }

        function getServerCount() {
            return $http.get('/serverCount');
        }

        function addServerToInventory(server) {
            return $http({
                url:'/inventory/submit',
                method: "GET",
                params: { serial_number: server }
            });
        }

        function deleteServer(server) {
            return $http({
                url:'/delete',
                method: "GET",
                params: { device_key: server.device_key }
            });
        }

    }

})();