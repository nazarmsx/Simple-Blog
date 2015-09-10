app.controller('loginController', function ($scope, $location)
{
//Model values    
    $scope.email = '';
    $scope.password = '';
    $scope.proceedLogin = function ()
    {
        console.log("User loged in,and I'am so happy!");
        $location.path('/after_login/');
    };
});

app.controller('afterLoginController', function ($scope) 
{
   
});

app.controller('homeController', function ($scope, $http) 
{
    
});