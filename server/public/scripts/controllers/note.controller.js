myApp.controller('NoteController', function($http, $location, UserService) {
  console.log('NoteController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;


  //modify this to post a completed chore
    //move to a separate controller.
    vm.note = {
      username: '',
      code: '',
      houseName: '',
      category: '',
      body: '',
      icon: ''
    };

    //this reset function clears the input field after the user submits the form.
      vm.reset = function() {
      vm.note = {
        username: '',
        code: '',
        houseName: '',
        category: '',
        body: ''
      };
    }

//put request to add a completed task.
  vm.postNote = function(user, houseName, code) {
    console.log(user);
      vm.note.username = user;
      vm.note.houseName = houseName;
      vm.note.code = code;


    switch (vm.note.category) {
      case 'Finances':
        vm.note.icon = '../assets/coins.png';
        break;
      case'Food':
        vm.note.icon = '../assets/groceries.png';
      break;
      case 'Cleaning':
        vm.note.icon = '../assets/liquid-soap.png';
      break;
      case 'Visitors':
        vm.note.icon = '../assets/reunion.png';
      break;
      case 'Shopping':
        vm.note.icon = '../assets/cart.png';
      break;
      case 'Other':
        vm.note.icon = '../assets/star.png';
      break;
  }


  console.log('NoteController -- task -- sending to server...', vm.note);

      $http.put('/note', vm.note).then(function(response) {
        console.log(response);
        // vm.getTasks();
        vm.reset();
        vm.getNotes();
      }).catch(function(response){
        console.log('NoteController -- post task -- failure: ', response);
        vm.message = "Uh-oh, Post not updated!";
      });
    }




    //gets all tasks and populates user.html (should move to task controller)
      vm.getNotes = function() {
        $http.get('/note').then(function(response) {
        console.log('this is the complete list from the get all req', response.data);
        vm.houseNotes = response.data;
        })

      }

      vm.getNotes();

      vm.delete = function(id) {
          console.log('delete rental with id: ', id);
          $http.delete('/note/' + id)
          .then(function(response) {
            console.log(response);
            vm.getNotes();
          })
        } // end delete



  }); //end of completeTaskController
