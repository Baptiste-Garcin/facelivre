app.factory('AuthService', function($http, $window, $sessionStorage) {
	return {
		login: function(postData, callback){
			$http({
				method: 'POST',
				url: '/api/login',
				data: postData
			}).then(function(res){
				callback(res.data);
			});
		},
		logout : function(){
			$sessionStorage.$reset();
		},
		saveToken: function(token){
			$sessionStorage.token = token;
			return sessionStorage.token;
		},
		getToken: function(){
			if($sessionStorage.token)
				return $sessionStorage.token;
			else
				return false;
		},
		isLoggedIn: function(){
			var token = this.getToken();
			var payload;
			if(token)
			{
				payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);

				return payload.exp > Date.now() / 1000;
			}
			else
				return false;
		},
		currentUser: function(){
			if(this.isLoggedIn())
			{
				var token = this.getToken();
				var payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);
				return {
					email : payload.email,
					firstname : payload.firstname,
					lastname: payload.lastname,
					id: payload.id,
					admin: payload.admin,
					created_at: payload.created_at
				};
			}
		}
	};
});
