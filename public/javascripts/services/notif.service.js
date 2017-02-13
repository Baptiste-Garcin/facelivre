app.factory('NotifService', function($http, $stateParams){
    return {
        fetch : function(id, callback){
            $http({
                method: 'POST',
                url: '/api/notif',
                data: {data:id}
            }).then(function(res){
                callback(res);
            });
        },
        read : function(arg, callback){
            $http({
                method: 'GET',
                url: '/api/notif/' + arg
            }).then(function(res){
                callback(res);
            });
        },
        friendAccept : function(ask, answer, callback){
            $http({
                method: 'GET',
                url: '/api/user/' + ask + '/friend/accept/' + answer,
            }).then(function(res){
                callback(res);
            });
        },
        friendDenied : function(ask, answer, callback){
            $http({
                method: 'GET',
                url: '/api/user/' + ask + '/friend/reject/' + answer,
            }).then(function(res){
                callback(res);
            });
        }
    };
});
