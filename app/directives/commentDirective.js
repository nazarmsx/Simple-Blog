app.directive('spbComments',function($http){
return {
restrict:'AEC',
replace:true,
scope: {
      id: '=postid'
    },
     controller: function($scope) {
     $scope.addComment=function()
     {
         
         var comment={text:$scope.text,author_name:$scope.author_name,created:new Date()};
     $scope.comments.push(comment);
     
     };}
     ,
link:function(scope,elem,attrs){

$http.get("./app/api/request.php?action=loadComments&post_id="+scope.id)
            .success(function (response) {
                console.log(response);
                scope.comments = response.records;
                //scope.post.commentsDownloaded=true;
            }); 
           

},
templateUrl:'./views/comments.html'
}
});