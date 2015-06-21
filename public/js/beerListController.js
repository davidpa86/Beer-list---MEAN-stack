(function (){
	var BeerController = function (beerListFactory)
	{
		var vmBeer = this;
		vmBeer.selected_country = "";
		vmBeer.beers = [];
		var init = function ()
		{
			console.log("INIT!");
			vmBeer.getAllBeers();
		};
		vmBeer.getAllBeers = function ()
		{
			beerListFactory.getAllBeers().success(function (data){
				vmBeer.beers = data;
			});
		};
		init.call(this);
	};
	
	angular.module("appBeerList").controller("beerListController",["beerListFactory", BeerController]);
}());