app.factory('LikeService', function($http, $stateParams) {
    return {
        likeComment: function(postData, callback){
            $http({
                method: 'POST',
                url: '/api/comment/' + postData.commentId + '/like',
                data: postData,
            }).then(function(res){
                callback(res.data);
            });
        },
        likePost: function(postData, callback){
            $http({
                method: 'POST',
                url: '/api/post/' + postData.postId + '/like',
                data: postData,
            }).then(function(res){
                callback(res.data);
            });
        },
        unlikeComment: function(postData, callback){
            $http({
                method: 'DELETE',
                url: '/api/comment/' + postData.commentId + '/like/' + postData.userId,
            }).then(function(res){
                callback(res.data);
            });
        },
        unlikePost: function(postData, callback){
            $http({
                method: 'DELETE',
                url: '/api/post/' + postData.postId + '/like/' + postData.userId,
            }).then(function(res){
                callback(res.data);
            });
        },
        getLikesComment: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/comment/' + postData.commentId + '/like',
            }).then(function(res){
                callback(res.data);
            });
        },
        getLikesPost: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/post/' + postData.postId + '/like',
            }).then(function(res){
                callback(res.data);
            });
        },
        checkLikeComment: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/comment/' + postData.commentId + '/like/' + postData.userId,
            }).then(function(res){
                callback(res.data);
            });
        },
        checkLikePost: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/post/' + postData.postId + '/like/' + postData.userId,
            }).then(function(res){
                callback(res.data);
            });
        },
    };
});
