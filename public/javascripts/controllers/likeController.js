app.controller('LikeController', ['$scope', '$rootScope', 'LikeService', 'AuthService', function($scope, $rootScope, LikeService, AuthService) {
	if(!AuthService.isLoggedIn())
		$state.go('login');

	$scope.postData = {
		userId: '',
		commentId: '',
		postId: '',
	};
	
	$scope.likeComment = function (postData, commentId) {
		postData.userId = AuthService.currentUser().id;
		postData.commentId = commentId;
		LikeService.likeComment(postData, function(data)
		{
			if (data.success === true)
			{
				$scope.showPost();
			};
		});
	};
	$scope.likePost = function (postData, postId) {
		postData.userId = AuthService.currentUser().id;
		postData.postId = postId;
		LikeService.likePost(postData, function(data)
		{
			if (data.success === true)
			{
				$scope.showPost();
			};
		});
	};
	$scope.unlikeComment = function (postData, commentId) {
		postData.userId = AuthService.currentUser().id;
		postData.commentId = commentId;
		LikeService.unlikeComment(postData, function(data)
		{
			if (data.success === true)
			{
				$scope.showPost();
			};
		});
	};
	$scope.unlikePost = function (postData, postId) {
		postData.userId = AuthService.currentUser().id;
		postData.postId = postId;
		LikeService.unlikePost(postData, function(data)
		{
			if (data.success === true)
			{
				$scope.showPost();
			};
		});
	};
	$scope.checkLikeComment = function (postData, commentId) {
		postData.userId = AuthService.currentUser().id;
		postData.commentId = commentId;
		LikeService.checkLikeComment(postData, function(data)
		{
			if (data.success === true)
			{
				$scope.likedC = data.result.records[0]._fields[0].low > 0;
			};
		});
	};
	$scope.checkLikePost = function (postData, postId) {
		postData.userId = AuthService.currentUser().id;
		postData.postId = postId;
		LikeService.checkLikePost(postData, function(data)
		{
			if (data.success === true)
			{
				$scope.likedP = data.result.records[0]._fields[0].low > 0;
			};
		});
	};
	$scope.getLikesComment = function (postData, commentId) {
		postData.commentId = commentId;
		LikeService.getLikesComment(postData, function(data)
		{
			if (data.success === true)
			{
				$scope.countC = data.result[0]._fields[0].low;
			};
		});
	};
	$scope.getLikesPost = function (postData, postId) {
		postData.postId = postId;
		LikeService.getLikesPost(postData, function(data)
		{
			if (data.success === true)
			{
				$scope.countP = data.result[0]._fields[0].low;
			};
		});
	};
}]);
