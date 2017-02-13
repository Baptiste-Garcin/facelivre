app.controller('FriendController', ['$scope', '$rootScope', 'FriendService', 'AuthService', function($scope, $rootScope, FriendService, AuthService) {
    
    if(!AuthService.isLoggedIn())
    $state.go('login');

    $scope.postData = {
        userId: '',
        from: '',
        to: '',
    };
    $scope.getFriends = function(postData) {
        postData.userId = AuthService.currentUser().id;
        FriendService.getFriends(postData, function(data)
        {
            if (data.success === true)
            {
                // Do something
            };
        });
    };
    $scope.getRequests = function(postData) {
        postData.userId = AuthService.currentUser().id;
        FriendService.getFriends(postData, function(data)
        {
            if (data.success === true)
            {
                // Do something
            };
        });
    };
    $scope.request = function(postData, friend) {
        postData.from = AuthService.currentUser().id;
        postData.to = friend;
        FriendService.request(postData, function(data)
        {
            if (data.success === true)
            {
                // Do something
            };
        });
    };
    $scope.accept = function(postData, friend) {
        postData.from = AuthService.currentUser().id;
        postData.to = friend;
        FriendService.accept(postData, function(data)
        {
            if (data.success === true)
            {
                // Do something
            };
        });
    };
    $scope.reject = function(postData, friend) {
        postData.from = AuthService.currentUser().id;
        postData.to = friend;
        FriendService.reject(postData, function(data)
        {
            if (data.success === true)
            {
                // Do something
            };
        });
    };
    $scope.delete = function(postData, friend) {
        postData.from = AuthService.currentUser().id;
        postData.to = friend;
        FriendService.delete(postData, function(data)
        {
            if (data.success === true)
            {
                // Do something
            };
        });
    };
    $scope.check = function(postData, friend) {
        postData.from = AuthService.currentUser().id;
        postData.to = friend;
        FriendService.check(postData, function(data)
        {
            if (data.success === true)
            {
                if (data.result.records[0])
                {
                    $scope.friendStatus = data.result.records[0]._fields[1];
                    $scope.friendName = data.result.records[0]._fields[2];
                }
                else
                {
                    $scope.friendStatus = "nope";
                }
            };
        });
    };
}]);
