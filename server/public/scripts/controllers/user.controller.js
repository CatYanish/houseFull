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


  //modify this to post a completed chore
    //move to a separate controller.
    vm.completedTask = {
      username: '',
      code: '',
      houseName: '',
      room: '',
      time: '',
      date:'',
      description: ''
    };


//put request to add a completed task, move to a separate controller.
  vm.postTask = function(user, houseName, code) {
    console.log(user);
      vm.completedTask.username = user;
      vm.completedTask.houseName = houseName;
      vm.completedTask.code = code;
      console.log('UserController -- task -- sending to server...', vm.completedTask);
      $http.put('/task', vm.completedTask).then(function(response) {
        console.log(response);
        vm.getTasks();
        vm.reset();
      }).catch(function(response){
        console.log('UserController -- post task -- failure: ', response);
        vm.message = "Uh-oh, Post not updated!";
      });
    }


  //this reset function clears the input field after the user submits the form.
    vm.reset = function() {
    vm.completedTask = {
      username: '',
      code: '',
      houseName: '',
      room: '',
      time: '',
      date:'',
      description: ''
    };
    vm.form.$setPristine();
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
    vm.example = "this is some text";

    vm.emailUser = function() {
      $http.post('/mailer', vm.example).then(function(response) {
        console.log('posted to send email');
      })
    }

  }); //end of user.controller
