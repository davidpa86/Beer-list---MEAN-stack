(function () {
	var beerListFactory = function ($http)
	{
		var Factory = {};
		var url = "http://localhost:3000/api/beers/";
		Factory.getAllBeers = function ()
		{
			return $http.get(url);
		}
		return Factory;
	};
	
	angular.module("appBeerList").factory("beerListFactory",["$http",beerListFactory]);

}());