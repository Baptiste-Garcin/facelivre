app.controller('CommentController', ['$state', '$scope', '$rootScope', 'CommentService', 'AuthService', function($state, $scope, $rootScope, CommentService, AuthService) {

	if(!AuthService.isLoggedIn())
		$state.go('login');



	$scope.postData = {
		content: ''
	};
	$scope.createComment = function (postData, userId, postId) {
		postData.userId = userId;
		postData.postId = postId;
		if (postData.content !== '')
		{
			CommentService.createComment(postData, function(data)
			{
				if (data.success === true)
				{
					$scope.showPost();
				};
			});
		}
	};
	$scope.getComment = function (postData, postId) {
		CommentService.getComment(postData, function(data)
		{
			if (data.success === true)
			{
				$scope.commentProvider = data.records;
			};
		});
	};
}]);
