var app = angular.module('myApp', ['ngRoute']);

app.controller('homController', function ($scope,$http,$location) {
            
            $scope.allPostDownloaded=true; //is using to hide loadMore button
            $scope.postsAreBeingDownloading=true;
            

            $http.get("./app/api/request.php?action=readAll&alreadyDownloadedQuantity=0")
            .success(function (response) {
                $scope.posts = response.records;
                $scope.allPostDownloaded=false;
                $scope.postsAreBeingDownloading=false;
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
            $scope.loadComments=function(post)
            {
            $http.get("./app/api/request.php?action=loadComments&post_id="+post.id)
            .success(function (response) {
                post.comments = response.records;
                post.commentsDownloaded=true;
            });    
            };
            $scope.hideComments=function(post)
            {
                post.commentsDownloaded=false;
                post.comments =[];
              
            };
});


app.config(function ($routeProvider) {
    $routeProvider
            // route for the home page
            .when('/', {
                templateUrl: './views/home.html',
                controller: 'homController'
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
            }).when('/login', {
                templateUrl: './views/login.html',
                controller: 'loginController'
            })
            .when('/register', {
                templateUrl: './views/register.html',
                controller: 'registerController'
            })
            .when('/after_register/:email/', {
                templateUrl: './views/afterregister.html',
                controller: 'afterRegisterController'
            }) .when('/after_login/', {
                templateUrl: './views/after_login.html',
                controller: 'afterLoginController'
            })
            .otherwise({redirectTo:'/'});;
});

app.run(function($rootScope)
{
    $rootScope.title="Simple blog: Main page";
    $rootScope.stringToSearch="";
    $rootScope.search=function()
    {
        console.log($rootScope.stringToSearch);
    };
});

