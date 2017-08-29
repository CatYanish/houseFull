myApp.controller('NavController', function($http, $location, UserService) {
    console.log('NavController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;


  }); //end of Controller
