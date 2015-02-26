'use strict';
// added for better user experience, user would expect the modal to close upon submitting for certain tasks

app.directive('fadeOnSubmitModal', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
		scope.$parent.dismiss = function() {
			element.modal('hide');
       	};
       	scope.dismiss = function() {
			element.modal('hide');
       	};
     }
   } 
});