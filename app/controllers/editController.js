
app.controller('editController', function ($scope,$http) {
    $scope.hideForm=true;
    $scope.downloading=true;
    $scope.getCustomerForm = function ()
    {
        var customer = {
            id: $scope.id,
            title: $scope.title,
            post_text: $scope.post_text,
            created: $scope.created            
        };
        return customer;
    };
    $scope.master = {id: "", title: "", post_text: "", created: ""};
    $scope.reset = function () {
        $scope.customer = angular.copy($scope.master);
        $scope.myForm.$setPristine();
    };
    
    $http.get("./app/api/request.php?action=readAll&alreadyDownloadedQuantity=0")
            .success(function (response) {
                $scope.posts = response.records;
                $scope.filteredPosts = response.records.slice(0, 10);
                $scope.downloading=false;
            });

    $scope.currentPage = 0;
    $scope.rowsQuantity = 5;
    $scope.nextButtonDisable=false;
    $scope.next = function ()
    {
        $http.get("./app/api/request.php?action=readAll&alreadyDownloadedQuantity="+$scope.posts.length)
            .success(function (response) {
                if(response.records.length===0)
                {
                    $scope.nextButtonDisable=true;
                }
                else
                {
                $scope.posts=$scope.posts.concat(response.records);
                $scope.currentPage++;
                if ($scope.currentPage > $scope.posts.length / $scope.rowsQuantity)
                {
                    $scope.currentPage--;
                }
                $scope.filteredPosts = $scope.posts.slice($scope.currentPage * $scope.rowsQuantity, ($scope.currentPage * $scope.rowsQuantity) + $scope.rowsQuantity);}
            });
        };
    $scope.previous = function ()
    {
        $scope.currentPage--;
        if ($scope.currentPage < 0)
            $scope.currentPage = 0;
        $scope.filteredPosts = $scope.posts.slice($scope.currentPage * $scope.rowsQuantity, ($scope.currentPage * $scope.rowsQuantity) + $scope.rowsQuantity);
    };
    $scope.refresh = function ()
    {
        $scope.filteredUsers = $scope.users.slice($scope.currentPage * $scope.rowsQuantity, ($scope.currentPage * $scope.rowsQuantity) + $scope.rowsQuantity);
    };
   
    $scope.edit = false;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.closeForm=function()
    {
                $scope.hideForm=true;

    };
    $scope.editPost = function (id,title,text) {
        $scope.hideForm=false;
        $scope.post={
        id:id,
        post_title:title,
        post_text:text
        };
    };
    $scope.updateUser = function ()
    {
        for (var i = 0; i < $scope.users.length; i++)
        {
            if ($scope.users[i].id == $scope.customer.id)
            {
                $scope.users[i] = $scope.getCustomerForm(); //update table
                $scope.cancelSavingPersonalInfo();//clear form
                
                $http.get('./app/api/request.php?action=update&user=' + JSON.stringify($scope.users[i])).success(function () {
                    console.log('./app/api/request.php?action=update&user=' + JSON.stringify($scope.users[i]));
                });//exucute request to server 
                $scope.refresh();
                break;
            }
        }
    };

    $scope.deleteCustomer = function (id)
    {
        //delete from model
        for (var i=0,length=$scope.users.length;i<length;++i)
        {
        if($scope.users[i].id==id){
            console.log(window.location.href+'./app/api/request.php?action=delete&user=' + JSON.stringify($scope.users[i]));
            $http.get('./app/api/request.php?action=delete&user=' + JSON.stringify($scope.users[i])).success(function () {
                    
                });       
        }    
        }
        //delete from view
        $scope.users = $scope.users
                .filter(function (el) {
                    return el.id !== id;
                });
        $scope.refresh();
    };
    $scope.cancelSavingPersonalInfo = function ()
    {
        $scope.reset();
        $scope.edit = true;
    };
    $scope.createUser=function()
    {
    console.log(window.location.href+'./app/api/request.php?action=create&user=' + JSON.stringify($scope.getCustomerForm()));
            $http.get('./app/api/request.php?action=create&user=' + JSON.stringify($scope.getCustomerForm())).success(function (response) {
                 //console.log(JSON.parse(response));
                 $scope.users.push(response); 
                 $scope.refresh();   
                });
    
    };
});