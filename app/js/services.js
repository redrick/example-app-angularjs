'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('articlesAppServices', ['ngResource']).
  factory('Article', function($resource) {
    return $resource('http://localhost\\:3003/api/v2/articles/:articleId', {articleId: '@articleId'}, {
      // save: {method:'PATCH', isArray: true, headers: {
      //     'Accept': 'application/json, text/plain, */*'
      //   }
      // } 
      index: {method:'GET', isArray:true},
      show: {method:'GET'},
      create: {method:'POST'},
      save: {method:'PUT'},
      update: {method:'PUT'},
      remove: {method:'DELETE'}
    })
  });
