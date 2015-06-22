(function() {
    var BeerController = function(beerListFactory, $modal) {
        var vmBeer = this;
        vmBeer.selected_country = "";
        vmBeer.beers = [];

        var init = function() {
            vmBeer.sorter = "name";
            vmBeer.getAllBeers();
        };
        vmBeer.getAllBeers = function() {
            beerListFactory.getAllBeers().success(function(data) {
                vmBeer.beers = data;
            });
        };
        vmBeer.removeBeer = function(beer) {
            var promiseModal = $modal.open({
                templateUrl: "views/remove-beer.html",
                controller: "removeBeerController"
            });
            promiseModal.result.then(function() {
                console.log("Removing " + beer.name);
                beerListFactory.removeBeer(beer);
                //TODO : REmove vmBeer.beers.push(vmBeer.newBeer);
            }, function() {
                console.log("Cancel removing");
            });
        };
        vmBeer.addBeer = function() {
            vmBeer.newBeer = {};
            var promiseModal = $modal.open({
                templateUrl: "views/add-new-beer.html",
                controller: "addNewBeerController",
                resolve: {
                    newBeerFn: function() {
                        return vmBeer.newBeer;
                    }
                }
            });
            promiseModal.result.then(function() {
                console.log("Adding " + vmBeer.newBeer.name);
                beerListFactory.postBeer(vmBeer.newBeer);
                vmBeer.beers.push(vmBeer.newBeer);
            }, function() {
                //console.log();
            });
        };

        init.call(this);
    };

    angular.module("appBeerList").controller("beerListController", ["beerListFactory", "$modal", BeerController]);
}());