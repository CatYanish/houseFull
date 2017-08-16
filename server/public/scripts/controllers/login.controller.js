myApp.controller('LoginController', function($http, $location, UserService) {
    console.log('LoginController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;

    vm.user = {
      username: '',
      password: '',
    };


    vm.message = '';


  ///allows existing users to login, checks to see if they need to create or join a house,
  // if they have a house, directed to user page.
    vm.login = function() {
      console.log('LoginController -- login');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Enter your username and password!";
      } else {
        console.log('LoginController -- login -- sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.houseName === undefined) {
            console.log('LoginController -- login -- success: ', response.data);
            $location.path('/create');
          } else if (response.data.houseName !== undefined) {
            console.log('This user already has a house, direct to /complete');
            $location.path('/complete');
          }  else {
            console.log('LoginController -- login -- failure: ', response);
            vm.message = "Wrong!!";
          }
        }).catch(function(response){
          console.log('LoginController -- registerUser -- failure: ', response);
          vm.message = "Uh-oh, check your username and password and try again";
        });
      }
    };



    //allows user to register their account
    vm.registerUser = function() {
      console.log('LoginController -- registerUser');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Choose a username and password!";
      } else {
        console.log('LoginController -- registerUser -- sending to server...', vm.user);
        $http.post('/register', vm.user).then(function(response) {
          console.log('LoginController -- registerUser -- success');
          $location.path('/');
        }).catch(function(response) {
          console.log('LoginController -- registerUser -- error');
          vm.message = "Please try again."
        });
      }
    }




}); //end of controller
