myApp.controller('InfoController', function($http, $location, UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;


  //gets all tasks and populates user.html (should move to task controller)
    vm.getTasks = function() {
      $http.get('/task').then(function(response) {
      console.log('this is the complete list from the get all req', response.data);
      vm.houseTasks = response.data;
      })

    }

    vm.getTasks();




//get username and total time to populate chart data

  vm.getData = function() {
    $http.get('/chart').then(function(response) {
    console.log('this is the task response from the server', response.data);

    //these arrays control the chart
    vm.colors = ["#9999CC", "#FF9966","#CC9999","#FF9999","#99CCCC"];
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

});
