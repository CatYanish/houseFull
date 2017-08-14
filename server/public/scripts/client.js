var myApp = angular.module('myApp', ['ngRoute', 'chart.js']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider, ChartJsProvider) {
  ChartJsProvider.setOptions
  ({ colors : [ '#FF6666', '#6699CC', '#CC9966', '#66CCCC', '#66CC99', '#669999', '#CC6666'] });
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/create', {
      templateUrl: '/views/templates/create.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });


});
