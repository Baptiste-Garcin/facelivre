app.factory('PostService', function($http, $stateParams) {
    return {
        showPost: function(callback){
            $http({
                method: 'GET',
                url: '/api/user/' + $stateParams.id + '/post/',
            }).then(function(res){
                callback(res.data);
            });
        },
        createPost: function(postData, callback){
            $http({
                method: 'POST',
                url: '/api/post/',
                data: postData
            }).then(function(res){
                callback(res.data);
            });
        },
        deletePost: function(){
            $http({
                method: 'DELETE',
                url: '/api/post/' + $stateParams.postId
            }).then(function(res){
                return res.data;
            });
        },
        updatePost: function(postData){
            $http({
                method: 'PUT',
                url: '/api/post/' + $stateParams.postId,
                data: postData
            }).then(function(res){
                return res.data;
            });
        }
    };
});

// app.factory('PostService', function($http, $routeParams) {
// 	var postService = {};
//
// 	postService.showPost = function() {
// 		return $http.get('/post/' + $routeParams.userId).then(function(res) {
// 			return res.data;
// 		});
// 	};
    //
	// postService.createPost = function(postData) {
	// 	return $http.post('/post/', postData).then(function(res) {
	// 		return res.data;
	// 	});
	// };
    //
	// postService.deletePost = function() {
	// 	return $http.delete('/post/' + $routeParams.postId).then(function(res) {
	// 		return res.data;
	// 	});
	// };
//
// 	postService.updatePost = function(postData) {
// 		return $http.put('/post/' + $routeParams.postId, postData).then(function(res) {
// 			return res.data;
// 		});
// 	};
//
// 	return postService;
// });
