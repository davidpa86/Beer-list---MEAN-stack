(function() {
    var beerListFactory = function($http) {
        var Factory = {};
        var url = "http://localhost:3000/api/beers/";
        Factory.getAllBeers = function() {
            return $http.get(url);
        };
        Factory.postBeer = function(data, alertServiceFactory) {
            $http.post(url, data)
                .success(function(data, status, headers, config) {
                    alertServiceFactory.addAlert(data.name+" saved to DB","alert-success");
                    console.log("Saved in DB");
                }).
            error(function(data, status, headers, config) {
                //TODO : Show message UI
                console.log("Error " + status);
            });
        };
        Factory.removeBeer = function(data, alertServiceFactory) {
            var name = data.name;
			$http.delete(url + name)
                .success(function(data, status, headers, config) {
                    alertServiceFactory.addAlert(name+" removed to DB","alert-danger");
                    console.log("Removed from DB");
                }).
            error(function(data, status, headers, config) {
                //TODO : Show message UI
                console.log("Error " + status);
            });
        };

        return Factory;
    };

    angular.module("appBeerList").factory("beerListFactory", ["$http", beerListFactory]);

}());