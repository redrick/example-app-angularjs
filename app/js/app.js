'use strict';


// Declare app level module which depends on filters, and services
angular.module('articlesApp', ['articlesAppServices']).
  config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    // $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $routeProvider.
      when('/articles', {templateUrl: 'partials/article-list.html',   controller: ArticleListCtrl}).
      when('/articles/:articleId', {templateUrl: 'partials/article-detail.html', controller: ArticleDetailCtrl}).
      when('/articles/:articleId/edit', {templateUrl: 'partials/article-edit.html', controller: ArticleEditCtrl}).
      otherwise({redirectTo: '/articles'});
  }]);