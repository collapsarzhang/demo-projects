var app = angular.module('flapperNews', ['ui.router', 'templates']);

app.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: 'posts/_posts.html',
	  controller: 'PostsCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);