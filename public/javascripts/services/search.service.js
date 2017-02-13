app.factory('SearchService', function($http) {
	return {
		autocomplete: function(postData, callback){
			$http({
				method: 'POST',
				url: '/api/user/search',
				data: {data:postData}
			}).then(function(result){
				callback(result);
			});
		},
		search: function(postData, callback){
			$http({
				method: 'POST',
				url: '/api/search',
				data: {data:postData}
			}).then(function(result){
				callback(result);
			});
		},
	};
});
