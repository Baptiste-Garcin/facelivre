app.controller('FeedController', ['$state', '$location', '$scope', '$rootScope', 'UserService', 'AuthService', 'FeedService', function($state, $location, $scope, $rootScope, UserService, AuthService, FeedService) {

    if(!AuthService.isLoggedIn())
        $state.go('login');

    $rootScope.user = AuthService.currentUser();

    $scope.getPost = function(){
        FeedService.getPost($scope.user.id, function(res){
            console.log(res.data.resultat.records);
            $scope.posts = res.data.resultat.records;
        });
    };

}]);
