'use strict';

app.controller('AllController', function($scope, toaster, All) {


	$scope.heroInfo = All.all;

});