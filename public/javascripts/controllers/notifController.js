app.controller('NotifController', ['$interval', '$scope', '$rootScope', 'AuthService', 'NotifService', function($interval, $scope, $rootScope, AuthService, NotifService) {

    $scope.open = false;
    $scope.notif = [];

    function getNotif(){
        $scope.user = AuthService.currentUser();
        NotifService.fetch($scope.user.id, function(res){

            for(var i = 0; i < res.data.result.friendsRequest.records.length; i++)
                $scope.notif.push(res.data.result.friendsRequest.records[i]);

            for(var j = 0; j < res.data.result.like.records.length; j++)
                $scope.notif.push(res.data.result.like.records[j]);
        });
    }

    $interval(function(){
        $scope.notif = [];
        getNotif();
    }, 3000);

    $scope.displayNotif = function(){
        if($scope.open === false)
        {
            $scope.notifContainer = $scope.notif;
            $scope.open = true;
        }
        else
        {
            $scope.notifContainer = null;
            $scope.open = false;
        }
    };

    $scope.read = function(arg){
        NotifService.read(arg, function(res){
            $scope.notifContainer = null;
            $scope.open = false;
            $scope.notif = [];
            getNotif();
            $scope.notifContainer = $scope.notif;
            $scope.open = true;
        });
    };

    $scope.friendAccept = function(ask, answer){
        NotifService.friendAccept(ask, answer, function(res){
            console.log(res);
        });
    };

    $scope.friendAccept = function(ask, answer){
        NotifService.friendAccept(ask, answer, function(res){
            console.log(res);
        });
    };

    $scope.friendDenied = function(ask, answer){
        NotifService.friendDenied(ask, answer, function(res){
            console.log(res);
        });
    };
}]);
