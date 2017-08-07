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

  }); //end of user.controller
