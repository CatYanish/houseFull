myApp.controller('NoteController', function($http, $location, UserService) {
  console.log('NoteController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  //modify this object to post a completed note
  vm.note = {
    username: '',
    code: '',
    houseName: '',
    category: '',
    body: '',
    icon: '',
    color: ''
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

  //put request to add a completed note.
  vm.postNote = function(user, houseName, code) {
    console.log(user);
    vm.note.username = user;
    vm.note.houseName = houseName;
    vm.note.code = code;
    //switch statement assigns color theme and flaticon
    switch (vm.note.category) {
      case 'Finances':
      vm.note.icon = '../assets/change.png';
      vm.note.color = 'finances';
      break;
      case'Food':
      vm.note.icon = '../assets/apple.png';
      vm.note.color = 'food';
      break;
      case 'Cleaning':
      vm.note.icon = '../assets/liquid-soap.png';
      vm.note.color = 'cleaning';
      break;
      case 'Visitors':
      vm.note.icon = '../assets/team.png';
      vm.note.color = 'visitors';
      break;
      case 'Shopping':
      vm.note.icon = '../assets/online-store.png';
      vm.note.color = 'shopping';
      break;
      case 'Other':
      vm.note.icon = '../assets/information.png';
      vm.note.color = 'other';
      break;
    }
    console.log('NoteController -- task -- sending to server...', vm.note);
    $http.put('/note', vm.note).then(function(response) {
      console.log(response);
      vm.reset();
      //sweetAlert
      swal({
        title: 'Posted!',
        text: 'Awesome! Your note was added!',
        type: 'success',
        confirmButtonText: 'Excellent'
      }) //end of sweetAlert
      $location.path('/note');
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

  //delete a note
  vm.delete = function(id) {
    console.log('delete rental with id: ', id);
    $http.delete('/note/' + id)
    .then(function(response) {
      console.log(response);
      vm.getNotes();
    })
  } // end delete



}); //end of NoteController
