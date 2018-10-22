// Main Javascript

var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {

    $routeProvider
    .when("/", {
        templateUrl : "views/main.html"
    })
    .when("/list", {
        templateUrl : "views/list.html"
    })
    .when("/green", {
        templateUrl : "views/green.htm"
    })
    .when("/blue", {
        templateUrl : "views/blue.htm"
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});

app.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.generateValue = 10;
    $scope.resultItems = [];

    var data = null;


    $http({method: 'GET', url: '../data/niches.json'})
        .then(function success(response) {
            data = response.data;
            $scope.items = data;
        }, function fail(response) {
            console.log(response);
        });

    $scope.addItem = function (item) {
        var itemIndex = $scope.resultItems.indexOf(item);

        if(itemIndex === -1) {
            $scope.resultItems.push(item);
        } else {
            $scope.resultItems.splice(itemIndex, 1);
        }
    };

    $scope.generateItems = function (count) {
        var finalItems = [],
            itemLength = $scope.items.length,
            randomIndexes = [];

        for(var i = 0; i < count; i++) {

            var isNewNumber = false;

            while(! isNewNumber ) {

                var randomNumber = Math.floor(Math.random() * itemLength);

                if(! randomIndexes.includes(randomNumber) ) {
                    // number is not duplicate
                    randomIndexes.push(randomNumber);
                    finalItems.push($scope.items[randomNumber].name);
                    isNewNumber = true;
                }
            }

        }

        $scope.resultItems = finalItems;
    }

    $scope.deleteItem = function (deletedItem) {
        $scope.items.map(function (item) {

            if(item.name === deletedItem) {

                var index = $scope.resultItems.indexOf(deletedItem);
                $scope.resultItems.splice(index, 1);
                
            }

        });
    }

}]);