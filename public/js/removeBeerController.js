(function() {
    angular.module("appBeerList").controller("removeBeerController", function($scope, $modalInstance) {
        $scope.cancel = function() {
            $modalInstance.dismiss("cancel");
        };
        $scope.removeBeer = function() {
            $modalInstance.close();
        };
    });
}());