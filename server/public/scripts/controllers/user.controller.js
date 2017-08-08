myApp.controller('UserController', function($http, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.completedTask = {
    username: '',
    houseName: '',
    room: '',
    time: '',
    date:'',
    description: ''
  };

  vm.house = {
    houseName: '',
    members: [],
    tasks: []
  }

//modify this to post a completed chore
  vm.postTask = function(user, houseName) {
    console.log(user);
      vm.completedTask.username = user;
      vm.completedTask.houseName = houseName;
      console.log('UserController -- task -- sending to server...', vm.completedTask);
      $http.post('/task', vm.completedTask).then(function(response) {
        console.log(response);
        vm.getTasks();
      }).catch(function(response){
        console.log('UserController -- post task -- failure: ', response);
        vm.message = "Uh-oh, Post not updated!";
      });
    }


    vm.getTasks = function() {
      $http.get('/task').then(function(response) {
      console.log(response.data);
      vm.allTasks = response.data;
      })

    }

    vm.getTasks();


    //The toggle functions allow user to either join or create a house, depending on what button they select.
        vm.createVisible = false;

        vm.createToggle = function () {
          console.log('create toggle function called');
          vm.createVisible = !vm.createVisible;
          console.log(vm.createVisible);
        }


        vm.joinVisible = false;

        vm.joinToggle = function () {
          console.log('join toggle function called');
          vm.joinVisible = !vm.joinVisible;
          console.log(vm.joinVisible);
        }

      ///end of toggle functions


    //create a house name.
    vm.createHouse = function() {
      console.log('LoginController -- createHouse');
      if(vm.house.house === '') {
        vm.message = "Choose a house name!";
      } else {
        console.log('LoginController -- createHouse -- sending to server...', vm.house);
        $http.post('/register/house', vm.house).then(function(response) {
          console.log('LoginController -- createHouse -- success');
          $location.path('/home');
        }).catch(function(response) {
          console.log('LoginController -- createHouse -- error');
          vm.message = "Please try again."
        });
      }
    }

  }); //end of user.controller
