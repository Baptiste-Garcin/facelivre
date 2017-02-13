app.controller('PostController', ['$scope', '$rootScope', 'PostService', 'AuthService', function($scope, $rootScope, PostService, AuthService) {

	if(!AuthService.isLoggedIn())
		$state.go('login');

	$scope.postData = {
		content: ''
	};

	$scope.showPost = function () {
		PostService.showPost(function(data) {
			$scope.contentProvider = data.records;
		});
	};
	$scope.createPost = function (postData) {
		postData.email = AuthService.currentUser().email;
		if (postData.content !== '')
		{
			PostService.createPost(postData, function(data)
			{
				if (data.success === true)
				{
					postData.content = '';
					$scope.showPost();
				};
			});
		}
	};
	$scope.deletePost = function () {
		PostService.deletePost().then(function(data) {
			if (data.success === true) {
				// Do something
			};
		});
	};
	$scope.updatePost = function () {
		PostService.updatePost().then(function(data) {
			if (data.success === true) {
				// Do something
			};
		});
	};
}]);
