
var app = angular.module("myApp", []);
app.controller("ResourceController", function($scope) {


    $scope.resources = [{'ResourceAddress': 'http://www.discoversdk.com', 'ResourceDescription':'Great site'}];


    $scope.RemoveResource = function (index) {
        $scope.resources.splice(index, 1);
    }

        $scope.AddResource = function (newres) {
            if ($scope.resources == null) {
                $scope.resources = {};
                $scope.resources = [];
            }

            $scope.resources.push(
                {
                    ResourceAddress: newres.ResourceAddress,
                    ResourceDescription: newres.ResourceDescription,
                });

            newres.ResourceAddress = "";
            newres.ResourceDescription = "";
        }

        $scope.ShowRes = function () {
            alert(JSON.stringify($scope.resources));
        }

});


