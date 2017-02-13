app.factory('FriendService', function($http, $stateParams) {
    return {
        getFriends: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/friend/list/' + postData.userId,
            }).then(function(res){
                callback(res.data);
            });
        },
        getRequests: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/friend/request/' + postData.userId,
            }).then(function(res){
                callback(res.data);
            });
        },
        request: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/user/' + postData.from + '/friend/request/' + postData.to,
            }).then(function(res){
                callback(res.data);
            });
        },
        accept: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/user/' + postData.from + '/friend/accept/' + postData.to,
            }).then(function(res){
                callback(res.data);
            });
        },
        reject: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/user/' + postData.from + '/friend/reject/' + postData.to,
            }).then(function(res){
                callback(res.data);
            });
        },
        delete: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/user/' + postData.from + '/friend/delete/' + postData.to,
            }).then(function(res){
                callback(res.data);
            });
        },
        check: function(postData, callback){
            $http({
                method: 'GET',
                url: '/api/user/' + postData.from + '/friend/check/' + postData.to,
            }).then(function(res){
                callback(res.data);
            });
        },
    };
});