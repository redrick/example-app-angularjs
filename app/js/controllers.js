'use strict';

/* Controllers */

// function ArticleListCtrl($scope, $http, Article) {
function ArticleListCtrl($scope, Article) {
  // $http({method: 'GET', url: 'http://localhost:3003/api/articles'}).success(function(data) {
  //   $scope.articles = data;
  // });
    $scope.articles = Article.query();
}
// ArticleListCtrl.$inject = ['$scope', '$http'];

// function ArticleDetailCtrl($scope, $routeParams, $http) {
function ArticleDetailCtrl($scope, $routeParams, Article) {
  // $http({method: 'GET', url: 'http://localhost:3003/api/articles/'+$routeParams.articleId}).success(function(data) {
  //   $scope.article = data;
  // });
  $scope.article = Article.get({articleId: $routeParams.articleId});
}
// ArticleDetailCtrl.$inject = ['$scope', '$routeParams'];

function ArticleEditCtrl($scope, $routeParams, Article, $http) {
  // $http({method: 'GET', url: 'http://localhost:3003/api/articles/'+$routeParams.articleId}).success(function(data) {
  //   $scope.article = data;
  // });
  $scope.article = Article.get({articleId: $routeParams.articleId});
  // $scope.update = function(article) {
  //   var arr = new Array();
  //   // arr['article'] = [];
  //   // A: object to array conversion
  //   $.map(article, function (value, key) { return arr[key] = value; });
  //   // var params = new Array();
  //   // $.map(arr, function (value, key) { console.log(value); return params['article'][key] = value; });
  //   // params['article'] = arr;
  //   // console.log(arr['article']['name']);
  //   // article.$save({port: ':3003', articleId: $routeParams.articleId});

  //   // $.ajax({
  //   //     url: 'http://localhost:3003/api/articles/'+$routeParams.articleId,
  //   //     type: "PATCH",
  //   //     data: arr,
  //   // }).done(function() {
  //   //     console.log("saved", $scope.article);
  //   // }).fail(function(jqXHR, textStatus) {
  //   //     alert( "Request failed: " + textStatus );
  //   // });
  //   article.$save();
  //   // $http({method: 'PATCH', url: 'http://localhost:3003/api/articles/'+$routeParams.articleId, params: arr }).success(function(data) {
  //   //   article.$save();
  //   //   $scope.article = data;
  //   // });
  // };

  $scope.save = function() {
 
        //Create the forum object to send to the back-end
        var article = new Article($scope.article);  
        // var array = [];
        // array['article'] = new Array();
        // $.map(article, function(k, v) {
        //   return array[v] = k;
        // });

        // console.log(array);
        article.$save({articleId: $routeParams.articleId}, function() {
            $scope.article = Article.get({articleId: $routeParams.articleId});
        }, function(response) {
            $scope.errors = response.data.errors;
        });

        // $http({method: 'PATCH', url: 'http://localhost:3003/api/articles/'+$routeParams.articleId, 
        //     headers: {
        //       "X-Requested-With": "XMLHttpRequest",
        //       'Accept': 'application/json, text/plain, */*'
        //     }
        //   }).success(function(data) {
        //   $scope.article = data;
        // });

        // $.ajax({
        //     url: 'http://localhost:3003/api/articles/'+$routeParams.articleId,
        //     type: "PATCH",
        //     // data: aticle,
        // }).done(function() {
        //     console.log("saved", $scope.article);
        // }).fail(function(jqXHR, textStatus) {
        //     alert( "Request failed: " + textStatus );
        // });
    }
}
// ArticleEditCtrl.$inject = ['$scope', '$routeParams', 'Article', '$http'];