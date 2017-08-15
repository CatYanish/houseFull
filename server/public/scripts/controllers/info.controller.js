myApp.controller('InfoController', function($http, $location, UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;



  vm.getTasks = function() {
    $http.get('/chart').then(function(response) {
    console.log('this is the task response from the server', response.data);

    vm.colors = ["#9999CC", "#FF9966","#CC9999","#FF9999","#99CCCC"];
    vm.labels = [];
    vm.data = [];

    for (var i = 0; i < response.data.length; i++) {
      vm.username = response.data[i]._id;
      vm.total = response.data[i].total;
      console.log(vm.total);
      vm.labels.push(vm.username);
      vm.data.push(vm.total);

    }



    //           backgroundColor: ["#9999CC", "#FF9966","#CC9999","#FF9999","#99CCCC"],









    vm.allTasks = response.data;
    })

  }

  vm.getTasks();

});
