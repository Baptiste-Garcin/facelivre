var app = angular.module('FaceLivre', ['ui.router', 'ngRoute', 'ngStorage']);

app.config(["$locationProvider", '$urlRouterProvider', '$stateProvider', function($locationProvider, $urlRouterProvider, $stateProvider) {
  // $locationProvider.html5Mode(true);
    $stateProvider
    .state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'AuthController'
    })
    .state('logout', {
        url: '/logout',
        controller: 'AuthController'
    })
    .state('create', {
        url: '/create',
        templateUrl: 'views/post.html',
        controller: 'PostController'
    })
    .state('show', {
        url: '/User/:id/post',
        templateUrl: 'views/show.html',
        controller: 'PostController'
    })
    .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'AuthController'
    })
    .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
    })
    .state('profile', {
        url: '/user/:id',
        templateUrl: 'views/profile.html',
        controller: 'UserController'
    })
    .state('user_edit', {
        url: '/user/:id/edit',
        templateUrl: 'views/user_edit.html',
        controller: 'UserController'
    })
    .state('search', {
        url: '/search',
        templateUrl: 'views/searchResult.html',
        controller: 'searchbarController'
    });
    $urlRouterProvider.otherwise('/home');
}]);


app.run(['$state', '$rootScope', '$location', 'AuthService', function($state, $rootScope, $location, AuthService, $scope){

    if(AuthService.isLoggedIn())
    $rootScope.signedIn = true;
    else
    $rootScope.signedIn = false;

}]);

app.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1) : '';
    };
});
