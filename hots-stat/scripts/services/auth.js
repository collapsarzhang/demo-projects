'use strict';

app.factory('Auth', function(FURL, $firebaseAuth, $firebase) {

	var ref = new Firebase(FURL);

	var auth = new $firebaseAuth(ref);

	var Auth = {

		user: {},

		createProfile: function(uid, user) {
			var profile = {
				name: user.name,
				email: user.email,
        map: {
          blackheartbay: {victory: 0, defeat: 0},
          cursedhollow: {victory: 0, defeat: 0},
          dragonshire: {victory: 0, defeat: 0},
          gardenofterror: {victory: 0, defeat: 0},
          hauntedmines: {victory: 0, defeat: 0},
          skytemple: {victory: 0, defeat: 0},
          tombofthespiderqueen: {victory: 0, defeat: 0},
        },
        hero: {
          nova: {victory: 0, defeat: 0, kill: 0},
          vella: {victory: 0, defeat: 0, kill: 0},
          murky: {victory: 0, defeat: 0, kill: 0},
          zaratul: {victory: 0, defeat: 0, kill: 0}
        },
        result: {
          victory: 0,
          defeat: 0
        }

			};

			var profileRef = $firebase(ref.child('profile'));

			return profileRef.$set(uid, profile);
		},

    getProfile: function(uid) {
      return $firebase(ref.child('profile').child(uid)).$asObject();
    },

		login: function(user) {
			return auth.$authWithPassword({email: user.email, password: user.password});
		},
		register: function(user) {
			return auth.$createUser({email: user.email, password: user.password})
			.then(function() {
				return Auth.login(user);
			})
			.then(function(data) {
				return Auth.createProfile(data.uid, user);
			});
		},
		logout: function(user) {
      /*
      var hero = {
          nova: {victory: 0, defeat: 0},
          vella: {victory: 0, defeat: 0},
          murky: {victory: 0, defeat: 0},
          zaratul: {victory: 0, defeat: 0}

      };

      var heroRef = $firebase(ref);

      heroRef.$set('hero', hero);
      */
			auth.$unauth();
		},
		signedIn: function() {
			return !!Auth.user.provider;
		},
    requireAuth: function() {
      return auth.$requireAuth();
    }

	};

	auth.$onAuth(function(authData) {
		if(authData) {
			angular.copy(authData, Auth.user);
			Auth.user.profile = $firebase(ref.child('profile').child(authData.uid)).$asObject();
		} else {
			if (Auth.user && Auth.user.profile) {
				Auth.user.profile.$destroy();
			}
			angular.copy({}, Auth.user);
		}
	});

	return Auth;
});