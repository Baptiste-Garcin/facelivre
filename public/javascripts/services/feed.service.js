app.factory('FeedService', function($http, $stateParams) {
    return {
        getPost : function(arg, callback){
            $http({
                method: 'GET',
                url: '/api/feed/' + arg
            }).then(function(res){
                callback(res);
            });
        }
    };
});
