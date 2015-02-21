angular.module('songhop.services', ['ionic.utils'])
.factory('User', function($http, SERVER, $localstorage, $q){
	
	var User = {
		favorites: [],
		newFavorites: 0,
		username: false,
		session_id: false,

		setSession: function(username, session_id, favorites) {
			if(username) User.username = username;
			if(session_id) User.session_id = session_id;
			if(favorites) User.favorites = favorites;

			$localstorage.setObject('user', {username: username, session_id: session_id});
		},

		addSongToFavorites: function(song) {

			// make sure there is a song to add
			if(!song) return false;

			User.favorites.unshift(song);
			User.newFavorites++;

			return $http.post(SERVER.url + 'favorites', {session_id: User.session_id, song_id: song.song_id});
		},

		removeSongFromFavorites: function(song, index) {

			if(!song) return false;

			User.favorites.splice(index, 1);

			return $http({
				method: 'DELETE',
				url: SERVER.url + 'favorites',
				params: {session_id: User.session_id, song_id: song.song_id}
			});
		},

		populateFavorites: function() {

			return $http({
				method: 'GET',
				url: SERVER.url + 'favorites',
				params: {session_id: User.session_id}
			}).success(function(data) {
				User.favorites = data;
			});
		},

		favoriteCount: function() {
			return User.newFavorites;
		},

		auth: function(username, signingUp) {

			var authRoute;

			if(signingUp) {
				authRoute = 'signup';
			} else {
				authRoute = 'login';
			}

			return $http.post(SERVER.url + authRoute, {username: username})
					.success(function(data) {
						User.setSession(data.username, data.session_id, data.favorites);
					});
		},

		checkSession: function() {

			var defer = $q.defer();

			if(User.session_id) {
				defer.resolve(true);
			} else {
				var user = $localstorage.getObject('user');

				if(user.username) {
					this.setSession(user.username, user.session_id);
					this.populateFavorites().then(function() {
						defer.resolve(true);
					});
				} else {
					defer.resolve(false);
				}
			}

			return defer.promise;
		},

		destroySession: function() {
			$localstorage.setObject('user', {});

			User.username = false;
			User.session_id = false;
			User.favorites = [];
			User.newFavorites = 0;
		}
	};

	return User;
})

.factory('Recommendations', function($http, SERVER, $q){

	var media;
	
	var Recommendations = {

		queue: [],

		init: function() {
			if(Recommendations.queue.length === 0) {
				return this.getNextSongs();
			} else {
				return this.playCurrentSong();
			}
		},

		getNextSongs: function() {
		    return $http({
				method: 'GET',
				url: SERVER.url + 'recommendations'
		    }).success(function(data){
				// merge data into the queue
				Recommendations.queue = Recommendations.queue.concat(data);
		    });
		},

		nextSong: function() {

			Recommendations.queue.shift();

			this.haltAudio();

			if(Recommendations.queue.length <= 3) {
				this.getNextSongs();
			}
		},

		playCurrentSong: function() {

			var defer = $q.defer();

			media = new Audio(Recommendations.queue[0].preview_url);

			media.addEventListener('loadeddata', function() {
				defer.resolve();
			});

			media.play();

			return defer.promise;
		},

		haltAudio: function() {
			if(media) media.pause();
		}
	};





	return Recommendations;
});