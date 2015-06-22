(function() {
    var AddNewBeerController = function($scope, $modalInstance, newBeer) {
        $scope.newBeer = newBeer;

        $scope.saveNewBeer = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss("cancel");
        };
    };

    angular.module("appBeerList").controller("addNewBeerController", ["$scope", "$modalInstance", "newBeerFn", AddNewBeerController]);
}());