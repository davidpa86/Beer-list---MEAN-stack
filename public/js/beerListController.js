(function() {
    var BeerController = function(beerListFactory, $modal,alertServiceFactory) {
        var vmBeer = this;
        vmBeer.selected_country = "";
        vmBeer.beers = [];
		vmBeer.alerts = alertServiceFactory.alerts;

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
                beerListFactory.removeBeer(beer, alertServiceFactory);
                for (var i=0; i<vmBeer.beers.length; ++i)
				{
					if (vmBeer.beers[i].name === beer.name)
					{
						vmBeer.beers.splice(i, 1);
						break;
					}
				}
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
                beerListFactory.postBeer(vmBeer.newBeer, alertServiceFactory);
                vmBeer.beers.push(vmBeer.newBeer);
            }, function() {
                //console.log();
            });
        };
		vmBeer.removeAlerts = function(type){
			alertServiceFactory.removeAlerts(type);
		};

        init.call(this);
    };

    angular.module("appBeerList").controller("beerListController", ["beerListFactory", "$modal", "alertServiceFactory", BeerController]);
}());