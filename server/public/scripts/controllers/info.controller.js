myApp.controller('InfoController', function($http, $uibModal, $location, UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;


  //gets all tasks and populates user.html
    vm.getTasks = function() {
      $http.get('/task').then(function(response) {
      console.log('this is the complete list from the get all req', response.data);
      vm.houseTasks = response.data;
      })
    }

    vm.getTasks();

// Delete a task
    vm.delete = function(id) {
        console.log('delete rental with id: ', id);
        $http.delete('/task/' + id)
        .then(function(response) {
          console.log(response);
          vm.getTasks();
        })
      } // end delete


//Angular Chart
  vm.getData = function() {
    $http.get('/chart').then(function(response) {
    console.log('this is the task response from the server', response.data);

    //these arrays control the chart
    vm.labels = [];
    vm.data = [];

    //push response data into the chart label and data arrays.
    for (var i = 0; i < response.data.length; i++) {
      vm.username = response.data[i]._id;
      vm.total = response.data[i].total;
      console.log(vm.total);
      vm.labels.push(vm.username);
      vm.data.push(vm.total);
    }
    vm.allTasks = response.data;
    })
  } //end of get request.

  vm.getData();

//This edit path is just a stub, not a full path
  vm.edit = function(id) {
    console.log('this is the task id to edit', id);
    $location.path('/edit');
  }


}); //end of infocontroller
