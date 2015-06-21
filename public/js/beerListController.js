(function() {
    var BeerController = function(beerListFactory) {
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
        vmBeer.deleteBeer = function() {
            //vmBeer.beers = [];
        };
        init.call(this);
    };

    angular.module("appBeerList").controller("beerListController", ["beerListFactory", BeerController]);
}());