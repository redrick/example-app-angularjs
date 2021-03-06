'use strict';

/* Directives */

/**
 * inline pre text input a textareu ucenie sa zo zdrojaku.cz :)
 */
articlesApp.directive('inline', function(){
  var KEY_CODE_ENTER = 13;
  return {
    restrict: 'E',
    replace: true,
    scope: {
      action: '=action',
      model: '=model',
      textarea: '@textarea'
    },
    template: 
      '<div>' +
        '<span ng-hide="mode">{{model}}</span>' +
        '<input type="text" ng-show="mode && !textarea" ng-model="model" required>' +
        '<textarea style="width:600px;height:100px;" ng-show="mode && textarea" ng-model="model"></textarea>' +
      '</div>',
    link: function(scope, element) {
      var children = element.children();
      var span  = angular.element(children[0]);
      var input = angular.element(children[1]);
      var area  = angular.element(children[2]);
      
      //puvodni obsah
      var oldContent;
      
      //zmenit editaci na text a zavolat akci po editaci
      function send() {
        var newContent = element.text().trim();
        if (newContent !== '') {
          scope.$apply('mode=false');    
        }
        if (newContent !== oldContent) {
          scope.action();  
        }    
      }
      
      function focusInput() {
        input[0].focus();    
      }
      
      function focusArea() {
        area[0].focus();    
      }
      
      function focus() {
        scope.textarea ? focusArea(): focusInput();
      }
      
      function blur() {
        if (!scope.mode) return;
        send();      
      }
      
      function enter(e) {
        if (!scope.mode) return;
        if (e.charCode === KEY_CODE_ENTER) {
          send();       
        }  
      }
      
      //ztrata focusu, ulozit zmenu
      input.bind('blur', blur);
      area.bind('blur', blur);
      
      //uzivatel kliknul na enter, ulozit zmenu
      input.bind('keypress', enter);
      
      //po kliknuti na text zobrazit input pro editaci
      span.bind('click', function(){
        oldContent = element.text().trim();
        scope.$apply('mode=true');
        focus();
      });
    }
  }
});

// text input pole s save a cancel buttonami
articlesApp.directive('inputtext', function(){
  var KEY_CODE_ENTER = 13;
  return {
    restrict: 'E',
    replace: true,
    scope: {
      action: '=action',
      model: '=model'
    },
    template:
      '<div>' +
        '<span ng-hide="mode">{{model}}</span>' +
        '<input type="text" ng-show="mode" ng-model="model" required>' +
        '<input type="submit" ng-show="mode" value="SAVE!">' +
        '<input type="button" ng-show="mode" value="Cancel">' +
      '</div>',
    link: function(scope, element) {
      var children = element.children();
      var span  = angular.element(children[0]);
      var input = angular.element(children[1]);
      var submit = angular.element(children[2]);
      var cancel = angular.element(children[3]);
      var oldContent;

      span.bind('click', function(){
        oldContent = element.text().trim();
        scope.$apply('mode=true');
        input[0].focus();
      });

      submit.bind('click', function(){
        var newContent = element.text().trim();
        scope.$apply('mode=false');
        if (newContent != oldContent) {
          scope.action();
        }
      });

      cancel.bind('click', function() {
        scope.model = oldContent;
        scope.$apply('mode=false');
      });
    }
  }
});

// articlesApp.directive('inputcheckbox', function(){
//   var KEY_CODE_ENTER = 13;
//   return {
//     restrict: 'E',
//     replace: true,
//     scope: {
//       action: '=action',
//       model: '=model'
//     },
//     template:
//       '<div>' +
//         '<span ng-hide="mode">{{model||"Not Sticky!"}}</span>' +
//         '<input id="sticky" type="checkbox" ng-show="mode" ng-model="model">' +
//         '<label for="sticky" ng-show="mode">Mark as Sticky!</label>' +
//         '<input type="submit" ng-show="mode" value="SAVE!">' +
//         '<input type="button" ng-show="mode" value="Cancel">' +
//       '</div>',
//     link: function(scope, element) {
//       var children = element.children();
//       var span  = angular.element(children[0]);
//       var input = angular.element(children[1]);
//       var submit = angular.element(children[2]);
//       var cancel = angular.element(children[3]);
//       var oldContent;

//       span.bind('click', function(){
//         oldContent = element.text().trim();
//         console.log(oldContent);
//         scope.$apply('mode=true');
//         input[0].focus();
//       });

//       submit.bind('click', function(){
//         var newContent = element.text().trim();
//         scope.$apply('mode=false');
//         if (newContent != oldContent) {
//           scope.action();
//         }
//       });

//       cancel.bind('click', function() {
//         scope.model = oldContent;
//         scope.$apply('mode=false');
//       });
//     }
//   }
// });