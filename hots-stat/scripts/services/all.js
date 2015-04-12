'use strict';

app.factory('All', function(FURL, $firebase, $q) {

	var ref = new Firebase(FURL);
	var heroInfo = $firebase(ref.child('hero')).$asArray();

	var All = {
		
		all: heroInfo
	}

	return All;
});