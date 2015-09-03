var app = angular.module('myApp', ['ngRoute']);

app.controller('homeController', function ($scope, $http,$location) {
            
            $scope.allPostDownloaded=true; //is using to hide loadMore button
            $http.get("./app/api/request.php?action=readAll&alreadyDownloadedQuantity=0")
            .success(function (response) {
                $scope.posts = response.records;
                $scope.allPostDownloaded=false;
                $scope.checkRequestIsNotEmpty(response.records);
            });
            $scope.loadPostContent=function(id)
            {
            $location.path('/post/'+id+'/') ; 
            };
            $scope.loadMore=function()
            {
            $http.get("./app/api/request.php?action=readAll&alreadyDownloadedQuantity="+$scope.posts.length)
            .success(function (response) {
                for(var i=0;i<response.records.length;++i)
                $scope.posts.push(response.records[i]);
                            $scope.checkRequestIsNotEmpty(response.records);

                
            });    
            };
            $scope.checkRequestIsNotEmpty=function(arr)
            {
                if(arr.length<3)
                $scope.allPostDownloaded=true;    
            };
});

app.config(function ($routeProvider) {
    $routeProvider
            // route for the home page
            .when('/', {
                templateUrl: './views/home.html',
                controller: 'homeController'
            }).when('/contact', {
                templateUrl: './views/contact.html',
                controller: 'contactController'
            })
            // route for the contact page
            .when('/post/:id/', {
                templateUrl: './views/post.html',
                controller: 'postController'
            }).when('/edit/:id/', {
                templateUrl: './views/edit.html',
                controller: 'editController'
            })
            .when('/after_register', {
                templateUrl: './views/afterregister.html',
                controller: 'afterRegisterController'
            })
            .otherwise({redirectTo:'/'});;
});


