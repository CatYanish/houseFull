myApp.controller('UserController', function($http, $location, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.completedTask = {
    username: '',
    code: '',
    houseName: '',
    room: '',
    time: '',
    date:'',
    description: ''
  };


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
  vm.postTask = function(user, houseName, code) {
    console.log(user);
      vm.completedTask.username = user;
      vm.completedTask.houseName = houseName;
      vm.completedTask.code = code;
      console.log('UserController -- task -- sending to server...', vm.completedTask);
      $http.put('/task', vm.completedTask).then(function(response) {
        console.log(response);
        vm.getTasks();
      }).catch(function(response){
        console.log('UserController -- post task -- failure: ', response);
        vm.message = "Uh-oh, Post not updated!";
      });
    }


    vm.getTasks = function() {
      $http.get('/task').then(function(response) {
      console.log('this is the task response from the server', response.data);
      vm.allTasks = response.data;
      })

    }

    vm.getTasks();


    //The toggle functions allow user to either join or create a house, depending on what button they select.
        vm.createVisible = false;

        vm.createToggle = function () {
          vm.createVisible = !vm.createVisible;
        }


        vm.joinVisible = false;

        vm.joinToggle = function () {
          vm.joinVisible = !vm.joinVisible;
        }

      ///end of toggle functions


    //create a house name.
    vm.createHouse = function() {
      console.log('LoginController -- createHouse');
      if(vm.house.houseName === ''|| vm.house.code === '') {
        vm.message = "Choose a house name and a secret house code!";
      } else {
        console.log('UserController -- createHouse -- sending to server...', vm.house);
        $http.post('/register/house', vm.house).then(function(response) {
          console.log('UserController -- createHouse -- success');
          $location.path('/user');
        })
      }
    } //end of create house post function



    vm.joinHouse = function() {
      console.log('LoginController -- createHouse');
      // if(vm.house.code === '') {
      //   vm.message = "Uh-oh, try your house code again!";
      // } else if (vm.house.houseName === '') {
      //   vm.message = "Check your house name and try again!"
      // } else {
        console.log('UserController -- joinHouse -- sending to server...', vm.join);
        $http.put('/register/join', vm.join).then(function(response) {
          console.log('UserController -- createHouse -- success');
          $location.path('/user');
        })
      }
    //end of create house post function

  }); //end of user.controller
