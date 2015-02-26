'use strict';

var app = angular
  .module('TaskNinjaApp', [
    'ngAnimate',
    'ngResource',    
    'ngRoute',    
    'firebase',
    'toaster',
    'angularMoment'
  ])
  .constant('FURL', 'https://taskbunny.firebaseio.com/')
  .run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {

      if(error === 'AUTH_REQUIRED') {
        $location.path('/login');
      }
    });
  })
  .config(function ($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController'         
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }       
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'        
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'        
      })
      .when('/browse/:taskId', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController'         
      })
      .otherwise({
        redirectTo: '/'
      });
  });
