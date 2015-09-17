app.controller('postController', function ($scope, $http, $routeParams)
{
     $scope.id='1';
     $scope.title ='';
     $scope.post_text = '';
     $scope.created = '';
                     $scope.postWasLoaded=false;


        $http.get("./app/api/request.php?action=read&id="+$routeParams.id)
            .success(function (response) {
                $scope.id=response.records.id;
                $scope.title = response.records.title;
                $scope.post_text = response.records.post_text;
                $scope.created = response.records.created;
                $scope.postWasLoaded=true;
                
            });
});

