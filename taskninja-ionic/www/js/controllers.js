angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, Auth, $ionicLoading, Task) {

  $scope.currentUser = Auth.user;
  $scope.signedIn = Auth.signedIn;

  $scope.logout = function() {
    Auth.logout();
    console.log("logout");
  };
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(user) {
    Auth.login(user).then(function() {
      console.log("successfully login");
      $scope.closeLogin();
      $ionicLoading.show({ template: 'Successfully Logged In!', noBackdrop: true, duration: 2000 });
    }, function(err) {
      console.log("Error.....");
    });
  };


  $scope.registerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  // Open the login modal
  $scope.register = function() {
    $scope.registerModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doRegister = function(user) {
    Auth.register(user).then(function() {
      console.log("register successfully");
      $scope.closeRegister();
      $ionicLoading.show({ template: 'Successfully Registered and Logged In!', noBackdrop: true, duration: 2000 });
    }, function(err) {
      console.log("Error......");
    });
  };


  $scope.postData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/post.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.postModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closePost = function() {
    $scope.postModal.hide();
  };

  // Open the login modal
  $scope.post = function() {
    $scope.postModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doPost = function(task) {
    task.status = 'open';
    task.gravatar = Auth.user.profile.gravatar;
    task.name = Auth.user.profile.name;
    task.poster = Auth.user.uid;
    Task.createTask(task).then(function(ref) {
      $scope.postData = {}; 
      $scope.closePost();
      $ionicLoading.show({ template: 'Successfully Posted a Task!', noBackdrop: true, duration: 2000 });
    });
  };

})

.controller('BrowseCtrl', function($scope, Task, Auth) {

  $scope.searchTask = '';
  $scope.tasks = Task.all;
  $scope.signedIn = Auth.signedIn;

})

.controller('TaskCtrl', function($scope, $stateParams, $state, $ionicLoading, $ionicModal, $ionicActionSheet, $ionicHistory, Task, Auth, Comment) {

  $scope.user = Auth.user;

  if($stateParams.taskId) {
    var taskId = $stateParams.taskId;
    var task = Task.getTask($stateParams.taskId).$asObject();
    setSelectedTask(task);
  }

  function setSelectedTask(task) {
    
    $scope.selectedTask = task;
    $scope.comments = Comment.comments(task.$id);
  }

  $scope.showTaskOptions = function() {

    if(Task.isCreator(task) && Task.isOpen(task)) {
       // Show the action sheet
       $ionicActionSheet.show({
         buttons: [
           { text: 'Edit', type: 'editTask' },
           { text: 'Comment', type: 'postComment' }
         ],
         destructiveText: 'Delete',
         titleText: 'Task Options',
         cancelText: 'Cancel',
         cancel: function() {
            // add cancel code..
          },
         buttonClicked: function(index, object) {
           if(object.type === 'editTask') $scope.edit(taskId);
           else if (object.type === 'postComment') $scope.postComment();
           return true;
         },
         destructiveButtonClicked: function(index) {

          Task.cancelTask(taskId);
          $state.go('app.browse');
          $ionicHistory.clearCache();
          return true;
         }
       });

     }

     else if(Task.isOpen(task)) {
       // Show the action sheet
       $ionicActionSheet.show({
         buttons: [
           { text: 'Comment', type: 'postComment' }
         ],
         titleText: 'Task Options',
         cancelText: 'Cancel',
         cancel: function() {
            // add cancel code..
          },
         buttonClicked: function(index, object) {
           if (object.type === 'postComment') $scope.postComment();
           return true;
         }
       });

     }

   };

  $scope.postCommentData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/postComment.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.postCommentModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closePostComment = function() {
    $scope.postCommentModal.hide();
  };

  // Open the login modal
  $scope.postComment = function() {
    $scope.postCommentModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doPostComment = function(comment) {
    var c = {
      content: comment.content,
      name: $scope.user.profile.name,
      gravatar: $scope.user.profile.gravatar
    };

    Comment.addComment($scope.selectedTask.$id, c).then(function() {
      $scope.postCommentData = {};
      $scope.closePostComment();
      $ionicLoading.show({ template: 'Successfully Posted Comment', noBackdrop: true, duration: 2000 });
    });

  };

  $scope.editData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/edit.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeEdit = function() {
    $scope.editModal.hide();
  };

  // Open the login modal
  $scope.edit = function(taskId) {
    $scope.editData = Task.getTask(taskId);
    $scope.editModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doEdit = function(task) {
    Task.editTask(task).then(function() {
      $scope.editData = {};
      $scope.closeEdit();
      $ionicLoading.show({ template: 'Successfully Updated the Task!', noBackdrop: true, duration: 2000 });
    });
  };

});
