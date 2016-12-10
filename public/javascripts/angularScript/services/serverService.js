(function() {
    angular.module('inventoryApp')
        .factory('serverService', serverService);

    serverService.$inject = ['$http'];

    function serverService($http) {
        return {
            getServers : getServers,

            getServerCount: getServerCount,

            addServerToInventory: addServerToInventory
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

    }

})();