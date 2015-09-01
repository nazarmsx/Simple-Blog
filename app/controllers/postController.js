app.controller('postController', function ($scope, $http, $routeParams)
{
     $scope.title ='1';
     $scope.post_text = '2';
     $scope.created = "3";

        $http.get("./app/api/request.php?action=read&id="+$routeParams.id)
            .success(function (response) {
                $scope.title = response.records.title;
                $scope.post_text = response.records.post_text;
                $scope.created = response.records.created;

                
            });
});

