'use strict';

app.factory('User', function(FURL, $firebase, Auth, $q) {

	var ref = new Firebase(FURL);
	var user = Auth.user;

	var User = {
		
		getUser: function() {
			return $firebase(ref.child('profile').child(user.uid));
		},

		getMapInfo: function(map) {
			return $firebase(ref.child('profile').child(user.uid).child('map').child(map)).$asObject();
		},

		getHeroInfo: function(hero) {
			return $firebase(ref.child('profile').child(user.uid).child('hero').child(hero)).$asObject();
		},

		getOverallHeroInfo: function(hero) {
			return $firebase(ref.child('hero').child(hero)).$asObject();
		},

		getResultInfo: function() {
			return $firebase(ref.child('profile').child(user.uid).child('result')).$asObject();
		},

		getResultForUser: function(uid) {
			var defer = $q.defer();

			$firebase(ref.child('profile').child(uid).child('result')).$asObject()
				.$loaded()
				.then(function(result) {
					defer.resolve(result);
				}, function(err) {
					defer.reject();
				});

			return defer.promise;
		},

		getMapWinRateForUser: function(uid) {
			var defer = $q.defer();

			$firebase(ref.child('profile').child(uid).child('map')).$asArray()
				.$loaded()
				.then(function(result) {
					defer.resolve(result);
				}, function(err) {
					defer.reject();
				});

			return defer.promise;
		},

		getHeroInfoForUser: function(uid) {
			var defer = $q.defer();

			$firebase(ref.child('profile').child(uid).child('hero')).$asArray()
				.$loaded()
				.then(function(result) {
					defer.resolve(result);
				}, function(err) {
					defer.reject();
				});

			return defer.promise;
		},

		updateUserResult: function(info) {
			return User.getResultInfo()
				.$loaded()
				.then(function(resultInfo) {

					if(info.result == 'victory') {
						var victory = resultInfo.victory + 1;
						var defeat = resultInfo.defeat;
					} else {
						var victory = resultInfo.victory;
						var defeat = resultInfo.defeat + 1;
					}

					return $firebase(ref.child('profile').child(user.uid).child('result')).$update({victory: victory, defeat: defeat});
				});

		},

		updateUserMapInfo: function(info) {
			return User.getMapInfo(info.map)
				.$loaded()
				.then(function(mapInfo) {

					if(info.result == 'victory') {
						var victory = mapInfo.victory + 1;
						var defeat = mapInfo.defeat;
					} else {
						var victory = mapInfo.victory;
						var defeat = mapInfo.defeat + 1;
					}

					return $firebase(ref.child('profile').child(user.uid).child('map').child(info.map)).$update({victory: victory, defeat: defeat});
				});
		},

		updateUserHeroInfo: function(info) {
			return User.getHeroInfo(info.hero)
				.$loaded()
				.then(function(heroInfo) {

					if(info.result == 'victory') {
						var victory = heroInfo.victory + 1;
						var defeat = heroInfo.defeat;
					} else {
						var victory = heroInfo.victory;
						var defeat = heroInfo.defeat + 1;
					}

					var kill = heroInfo.kill + info.kill;

					return $firebase(ref.child('profile').child(user.uid).child('hero').child(info.hero)).$update({victory: victory, defeat: defeat, kill: kill});
				});

		},

		updateHeroInfo: function(info) {
			return User.getOverallHeroInfo(info.hero)
				.$loaded()
				.then(function(heroInfo) {

					if(info.result == 'victory') {
						var victory = heroInfo.victory + 1;
						var defeat = heroInfo.defeat;
					} else {
						var victory = heroInfo.victory;
						var defeat = heroInfo.defeat + 1;
					}

					return $firebase(ref.child('hero').child(info.hero)).$update({victory: victory, defeat: defeat});
				});

		}
	}

	return User;
});