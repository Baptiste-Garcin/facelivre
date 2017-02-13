app.controller('searchbarController', ['$http', '$state', '$stateParams', '$location', '$scope', '$rootScope', 'UserService', 'AuthService', 'SearchService', function($http, $state, $stateParams, $location, $scope, $rootScope, UserService, AuthService, SearchService) {

    if(!AuthService.isLoggedIn())
        $state.go('login');

    $scope.autocomplete = function()
    {
        if($scope.input === "")
        {
            $scope.records = null;
            return false;
        }
        SearchService.autocomplete($scope.input, function(data){
            $scope.records = data.data.result.records;
        });
    };

    $scope.profile = function(arg){
        $scope.records = null;
        $scope.input = null;
        $state.go('profile', {id:arg});
    };

    $scope.search = function(data){
        $scope.records = null;
        SearchService.search(data, function(result){
            SearchService.results = result.data.result.records;
            $state.go('search');
        });
    };

    $scope.results = SearchService.results;
}]);
