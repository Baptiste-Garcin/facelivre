app.controller('AuthController', ['$state', '$sessionStorage','$location', '$scope', '$rootScope', 'UserService', 'AuthService', function($state, $sessionStorage, $location, $scope, $rootScope, UserService, AuthService) {

    $rootScope.user = AuthService.currentUser();

    $scope.login = function(postData){
        AuthService.login(postData, function(data){
            if(data.success)
            {
                AuthService.saveToken(data.token);
                $rootScope.signedIn = true;
                $rootScope.user = AuthService.currentUser();
                $state.go('home');
            }
            else
            {
                $rootScope.signedIn = false;
                return {success:false, message:"invalid credentials"};
            }
        });
    };

    $scope.logout = function(){
        $rootScope.signedIn = false;
        AuthService.logout();
        $state.go('login');
    };

    $scope.register = function (postData) {
        UserService.createUser(postData, function(data){
            if (data.success === true) {
                AuthService.saveToken(data.token);
                $rootScope.signedIn = true;
                $rootScope.user = AuthService.currentUser();
                $state.go('home');
            }
        });
    };
}]);
