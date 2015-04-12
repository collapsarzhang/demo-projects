'use strict';

app.controller('PersonalController', function($scope, toaster, User, Auth, $filter) {

	$scope.addInfo = function(info) {
		//console.log(info);
		User.updateUserMapInfo(info).then(function() {
			toaster.pop('success', 'map info is updated');
		});
		User.updateUserHeroInfo(info).then(function() {
			toaster.pop('success', 'hero info is updated');
		});
		User.updateUserResult(info).then(function() {
			toaster.pop('success', 'result info is updated');
		});
		User.updateHeroInfo(info).then(function() {
			toaster.pop('success', 'overall hero info is updated');
		});

	};

	var uid = Auth.user.uid;

	var orderBy = $filter('orderBy');


	User.getResultForUser(uid).then(function(result) {
		$scope.winRate = {
			'labels': ['Victory', 'Defeat'],
			'data': [result.victory, result.defeat],
			'colours': ['#46BFBD', '#F7464A']
		};
	});

	User.getMapWinRateForUser(uid).then(function(result) {
		var winRate = [];
		for(var i = 0; i < result.length; i++) {
			winRate.push(result[i].victory/(result[i].victory+result[i].defeat));
		}
		$scope.mapWinRate = {
			'labels': ["Blackheart's Bay", "Cursed Hollow", "Dragon Shire", "Garden of Terror", "Haunted Mines", "Sky Temple", "Tomb of the Spider Queen"],
			'data': [
				winRate
			]
		};
	});

	User.getHeroInfoForUser(uid).then(function(result) {
		var resultList = orderBy(result, '-kill', false);
		var hero = [];
		var data = [];
		for(var i = 0; i < 3; i++) {
			hero.push(resultList[i].$id.charAt(0).toUpperCase() + resultList[i].$id.slice(1));
			data.push(resultList[i].kill);
		}
		$scope.topTakedownHeroes = {
			'labels': hero,
			'series': ['Takedowns'],
			'data': [
				data
			]
		};
	});


	User.getHeroInfoForUser(uid).then(function(result) {
		var resultList = orderBy(result, '-victory', false);
		var hero = [];
		var victory = [];
		var defeat = [];
		for(var i = 0; i < 3; i++) {
			hero.push(resultList[i].$id);
			victory.push(resultList[i].victory);
			defeat.push(resultList[i].defeat);
		}
		$scope.mostVictoryHeroes = {
			'labels': hero,
			'series': ['Victory', 'Defeat'],
			'data': [
				victory,
				defeat
			]
		};
	});

	

});