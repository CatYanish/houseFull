var myApp = angular.module('myApp', ['ngRoute', 'chart.js', 'ui.bootstrap']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider, ChartJsProvider) {
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
  }).when('/new', {
    templateUrl: '/views/templates/newNote.html',
    controller: 'NoteController as nc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/invite', {
    templateUrl: '/views/templates/mail.html',
    controller: 'UserController as uc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/note', {
    templateUrl: '/views/templates/notes.html',
    controller: 'NoteController as nc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/complete', {
    templateUrl: '/views/templates/complete.task.html',
    controller: 'CompleteController as cc',
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


});  //end of info controller
