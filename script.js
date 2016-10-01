// create the module and name it SpringBoardApp
var SpringBoardApp = angular.module('SpringBoardApp', ['ngRoute']);


// configure our routes
SpringBoardApp.config(function ($routeProvider) {

    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'pages/Home.html',
            controller: 'mainController'
        })

        // route for the contact page
        .when('/Catalog', {
            templateUrl: 'pages/Catalog.html',
            controller: 'mainController'
        })

                // route for the about page
        .when('/Developer', {
            templateUrl: 'pages/Developer.html',
            controller: 'mainController'
        });
});

// create the controller and inject Angular's $scope
SpringBoardApp.controller('mainController', function ($scope, $http) {
    $scope.loading = false;
    //$scope.change = function (text) {
    //    $http({
    //        method: 'GET',
    //        url: 'http://cors.io/?https://api.coursera.org/api/courses.v1?q=search&query=' + $scope.search + '&limit=10',
    //    })
    //        .success(function (result) {
    //            $scope.entries = result.elements;
    //        })
    //    .error(function (error) { });
    //};


    $scope.SearchQuery = function () {
        $scope.loading = true;
        $http({
            method: 'GET',
            url: 'http://cors.io/?https://api.coursera.org/api/courses.v1?q=search&query=' + $scope.search + '&includes=instructorIds,partnerIds&fields=instructorIds,partnerIds,instructors.v1(firstName),partners.v1(name,logo)',
        })
           .success(function (result) {
               $scope.entries = result.elements;
               //debugger;
               $scope.partners = [];
               $scope.instructors = [];
               if (result.linked != undefined && result.linked != null) {
                   angular.forEach(result.linked['partners.v1'], function (value, key) {
                       $scope.partners[value.id] = value;
                   });

                   angular.forEach(result.linked['instructors.v1'], function (value, key) {
                       $scope.instructors[value.id] = value;
                   });
               }
               window.location.href = '#/Catalog';
               $scope.loading = false;
           })
       .error(function (error) { });
    };
});

