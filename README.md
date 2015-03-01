# demo-projects
demo projects for learning web development technologies

# Task Ninja
Tutorial Link: https://code4startup.com/projects/ninja-learn-angularjs-firebase-by-cloning-udemy
Demo Link: http://kevrz.com/demo-projects/taskninja/#/

Issue found, fixed, and reported to tutorial writer:
- in task service, corrected the returned promise
  from: return $firebase(ref.child('user_tasks').child(task.poster)).$push(obj);
  to: return newTask;
- added fadeOnSubmit directive to improve user experience when updating task, submitting offers.

# Songhop Clone (ionic-course)
Tutorial Link: https://thinkster.io/ionic-framework-tutorial/

How to run the app:
- install ionic (npm install -g ionic)
- clone the project and cd into ionic-course/code
- run (ionic serve) to see it in browser
- run (ionic platform add ios) then (ionic emulate ios) to see it in iOS emulator

Challenges completed:
- on the favorites page, include a share button on each ion-item that will open an $ionicActionSheet with the option to share the song's Spotify URL on Twitter and Facebook.
- ability to swipe the song previews left and right, like on Tinder?

# Task Ninja (ionic version)
This is a self-motivated project to extend the above Task Ninja turorial into mobile platform.

How to run the app:
- install ionic (npm install -g ionic)
- clone the project and cd into taskninja-ionic
- run (ionic serve) to see it in browser
- run (ionic platform add ios) then (ionic emulate ios) to see it in iOS emulator

Things learnt in the process:
- general ionic scss
- nested routing with AngularJS UI-Route
- ionic Modal
- logic seperation and organization