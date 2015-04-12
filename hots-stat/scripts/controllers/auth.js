'use strict';

app.controller('AuthController', function($scope, $location, Auth, toaster) {

	$scope.register = function(user) {
		Auth.register(user).then(function() {
			toaster.pop('success', 'Registered successfully');
			$location.path('/personal');
		}, function(err) {
			toaster.pop('error', 'Oops, something went wrong');
		});
	};

	$scope.login = function(user) {
		Auth.login(user).then(function() {
			toaster.pop('success', 'Logged in successfully');
			$location.path('/personal');
		}, function(err) {
			toaster.pop('error', 'Oops, something went wrong');
		});
	};

	$scope.signedIn = Auth.signedIn;
	$scope.currentUser = Auth.user;

	$scope.logout = function() {
		Auth.logout();
		toaster.pop('success', 'Logged out successfully');
		$location.path('/');
	};

});