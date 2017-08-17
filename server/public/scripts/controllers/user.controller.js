myApp.controller('UserController', function($http, $location, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;




  vm.house = {
    houseName: '',
    code: '',
    members: [],
    tasks: []
  }

  vm.join = {
    houseName: '',
    code: '',
  }



    //The toggle functions allow user to either join or create a house, depending on what button they select.
        vm.createVisible = false;
        vm.joinVisible = false;


        vm.createToggle = function () {
          vm.createVisible = !vm.createVisible;
        }


        vm.joinToggle = function () {
          vm.joinVisible = !vm.joinVisible;
        }

      ///end of toggle functions


  //user can create house name.
    vm.createHouse = function() {
      console.log('LoginController -- createHouse');
      if(vm.house.houseName === ''|| vm.house.code === '') {
        vm.message = "Choose a house name and a secret house code!";
      } else {
        console.log('UserController -- createHouse -- sending to server...', vm.house);
        $http.post('/register/house', vm.house).then(function(response) {
          console.log('UserController -- createHouse -- success');
          $location.path('/complete');
        })
      }
    } //end of create house post function



//user can join an existing house
    vm.joinHouse = function() {
      console.log('LoginController -- createHouse');

        console.log('UserController -- joinHouse -- sending to server...', vm.join);
        $http.put('/register/join', vm.join).then(function(response) {
          console.log('UserController -- createHouse -- success');
          $location.path('/complete');
        })
      }
    //end of create house post function



    //info to email with nodemailer

vm.invite = {
  email: ''
}

    vm.emailUser = function(houseName, code) {
      vm.invite.houseName = houseName;
      vm.invite.code = code;
    console.log('object to send in email', vm.invite); 
      $http.post('/mailer', vm.invite).then(function(response) {
        console.log('posted to send email', vm.invite);
      })
    }

  }); //end of user.controller
