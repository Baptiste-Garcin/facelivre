app.factory('CommentService', function($http, $stateParams) {
    return {
        createComment: function(postData, callback){
            $http({
                method: 'POST',
                url: '/api/post/' + postData.postId + '/comment',
                data: postData
            }).then(function(res){
                callback(res.data);
            });
        },
        getComment: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/post/' + postData + '/comment',
            }).then(function(res){
                callback(res.data);
            });
        },
    };
});
