myApp.controller('InfoController', function($http, $location, UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;


  vm.people;

  vm.getTasks = function() {
    $http.get('/chart').then(function(response) {
    console.log('this is the task response from the server', response);





    // var chart = new Chart(document.getElementById("myDoughnutGraph"), {
    //     type: 'doughnut',
    //     data: {
    //       labels: ["Africa", "Asia", "Europe",],
    //       datasets: [
    //         {
    //           label: "House Task Contributions (minutes)",
    //           backgroundColor: ["#9999CC", "#FF9966","#CC9999","#FF9999","#99CCCC"],
    //           data: [30, 40, 50]
    //         }
    //       ]
    //     },
    //     options: {
    //       title: {
    //         display: true,
    //         text: 'House Task Contributions (minutes)'
    //       }
    //     }
    // }); //end of chart.js



      vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      vm.data = [300, 500, 100];





    vm.allTasks = response.data;
    })

  }

  vm.getTasks();

});
