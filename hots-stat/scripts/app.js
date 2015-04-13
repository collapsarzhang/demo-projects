'use strict';

var app = angular
  .module('HotsStatApp', [
    'ngAnimate',
    'ngResource',    
    'ngRoute',    
    'firebase',
    'toaster',
    'angularMoment',
    'chart.js'
  ])
  .constant('FURL', 'https://hots-stat.firebaseio.com/')
  
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
        templateUrl: 'views/all.html',
        controller: 'AllController'         
      })
      .when('/personal', {
        templateUrl: 'views/personal.html',
        controller: 'PersonalController',
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
      .otherwise({
        redirectTo: '/'
      });
  });
