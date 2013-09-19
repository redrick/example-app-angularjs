'use strict';


var services = ['articlesAppServices'];
var articlesApp = angular.module('articlesApp', services);

articlesApp.config(['$routeProvider', function($routeProvider) {
    // $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    // $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $routeProvider.when('/articles', {templateUrl: 'partials/article-list.html',   controller: ArticleListCtrl});
    $routeProvider.when('/articles/:articleId', {templateUrl: 'partials/article-detail.html', controller: ArticleDetailCtrl});
    $routeProvider.when('/articles/:articleId/edit', {templateUrl: 'partials/article-edit.html', controller: ArticleEditCtrl});
    $routeProvider.otherwise({redirectTo: '/articles'});
  }]);