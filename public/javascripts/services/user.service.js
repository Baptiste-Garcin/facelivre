app.factory('UserService', function($http, $stateParams) {
	return {
        showUser : function(callback){
                        $http({
                            method: 'GET',
                            url : '/api/user/' + $stateParams.id
                        }).then(function(res){
							console.log(res.data);
							
            			    callback(res.data);
                        });
            		},
        createUser : function(postData, callback){
                        $http({
                            method: 'POST',
                            url: '/api/register',
                            data: postData
                        }).then(function(res){
							callback(res.data);
						});
                    },
        updateUser : function(postData, callback){
                        $http({
                            method: 'PUT',
                            url: '/api/user/'+ $stateParams.id,
                            data: postData
                        }).then(function(res){
                            callback(res.data);
                        });
        },
        deleteUser : function(id, callback){
                        $http({
                            method: 'DELETE',
                            url: '/api/user/' + $stateParams.id,
                        }).then(function(res){
                            callback(res.data);
                        });
        }

    };
});
