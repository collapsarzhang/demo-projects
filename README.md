# demo-projects
demo projects for learning web development technologies

# Task Ninja
Tutorial Link: https://code4startup.com/projects/ninja-learn-angularjs-firebase-by-cloning-udemy

Issue found, fixed, and reported to tutorial writer:
- in task service, corrected the returned promise
  from: return $firebase(ref.child('user_tasks').child(task.poster)).$push(obj);
  to: return newTask;
- added fadeOnSubmit directive to improve user experience when updating task, submitting offers.
