myApp.controller('CompleteController', function($http, $location, UserService) {
  console.log('CompleteTaskController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;


  //modify this object to post a completed chore
  vm.completedTask = {
    username: '',
    code: '',
    houseName: '',
    room: '',
    time: '',
    date:'',
    description: ''
  };

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
  }

  //put request to add a completed task.
  vm.postTask = function(user, houseName, code) {
    console.log(user);
    vm.completedTask.username = user;
    vm.completedTask.houseName = houseName;
    vm.completedTask.code = code;
    console.log('UserController -- task -- sending to server...', vm.completedTask);
    $http.put('/task', vm.completedTask).then(function(response) {
      console.log(response);
      vm.reset();
      //sweetalert msg
      swal({
        title: 'Success!',
        text: 'Way to go! Your task was posted!',
        type: 'success',
        confirmButtonText: 'Awesome'
      }) //end of sweetAlert
      $location.path('/info');
    }).catch(function(response){
      console.log('UserController -- post task -- failure: ', response);
      vm.message = "Uh-oh, Post not updated!";
    });
  }


}); //end of completeTaskController
