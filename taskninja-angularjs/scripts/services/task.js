'use strict';

app.factory('Task', function(FURL, $firebase, Auth) {

	var ref = new Firebase(FURL);
	var tasks = $firebase(ref.child('tasks')).$asArray();
	var user = Auth.user;

	var Task = {
		all: tasks,

		getTask: function(taskId) {
			return $firebase(ref.child('tasks').child(taskId));
		},

		createTask: function(task) {
			task.datetime = Firebase.ServerValue.TIMESTAMP;
			return tasks.$add(task)
				.then(function(newTask) {
					var obj = {
						taskId: newTask.key(),
						type: true,
						title: task.title
					};

					// original: return $firebase(ref.child('user_tasks').child(task.poster)).$push(obj);
					// fix and report to tutorial writer
					$firebase(ref.child('user_tasks').child(task.poster)).$push(obj);
					return newTask;
				});
		},

		createUserTasks: function(taskId) {
			Task.getTask(taskId)
				.$asObject()
				.$loaded()
				.then(function(task) {
					var obj = {
						taskId: taskId,
						type: false,
						title: task.title
					};

					return $firebase(ref.child('user_tasks').child(task.runner)).$push(obj);
				});
		},

		editTask: function(task) {
			var t = this.getTask(task.$id);
			return t.$update({title: task.title, description: task.description, total: task.total});
		},

		cancelTask: function(taskId) {
			var t = this.getTask(taskId);
			return t.$update({status: "cancelled"});
		},

		isCreator: function(task) {
			return (user && user.provider && user.uid === task.poster);
		},

		isOpen: function(task) {
			return task.status === "open";
		},

		completeTask: function(taskId) {
			var t = this.getTask(taskId);
			return t.$update({status: 'completed'});
		},

		isAssignee: function(task) {
			return (user && user.provider && user.uid === task.runner);
		},

		isCompleted: function(task) {
			return task.status === 'completed';
		}

	};

	return Task;
});