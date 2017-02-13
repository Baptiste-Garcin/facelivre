app.controller('UserController', ['$state', '$stateParams', '$location', '$scope', '$rootScope', 'UserService', 'AuthService', function($state, $stateParams, $location, $scope, $rootScope, UserService, AuthService) {

	if(!AuthService.isLoggedIn())
		$state.go('login');

	$scope.params = $stateParams;

	$scope.postData = {};

	$scope.showUser = function () {
		UserService.showUser(function(data){

			$scope.postData.firstname = data.result.firstname;
			$scope.postData.lastname = data.result.lastname;
			$scope.postData.name = data.result.firstname + ' ' + data.result.lastname;
			$scope.postData.email = data.result.email;
			$scope.postData.address = data.result.adress;
			$scope.postData.created_at = data.result.created_at;

			if(data.result.address !== null)
				$scope.postData.address = data.result.address;
			else
				$scope.postData.address = "";

			if(data.result.studies !== null)
				$scope.postData.studies = data.result.studies;
			else
				$scope.postData.studies = "";

			if(data.result.gender !== null)
				$scope.postData.gender = data.result.gender;
			else
				$scope.postData.gender = "";

			if(data.result.job !== null)
				$scope.postData.job = data.result.job;
			else
				$scope.postData.job = "";

			if(data.result.religion !== null)
				$scope.postData.religion = data.result.religion;
			else
				$scope.postData.religion = "";

			if(data.result.birthdate)
			{
				var birthdate = new Date(data.result.birthdate);
				$scope.postData.age = Math.trunc((new Date() - birthdate)/(1000*3600*24*365));
				$scope.postData.birthdate = new Date(data.result.birthdate);
			}
			else
			$scope.postData.birthdate = "";

			// console.log(data.result);
		});
	};


	$scope.createUser = function (postData) {
		UserService.createUser(postData, function(data){
			if (data.success === true) {
				return({success:true, message:'user created'});
			}
		});
	};

	$scope.updateUser = function (postData) {
		if((postData.password == postData.password_conf) || (postData.password == 'undefined' && postData.password_conf == 'undefined'))
		{
			UserService.updateUser(postData, function(data) {
				if (data.success === true) {
					AuthService.saveToken(data.token);
					$state.go('profile', {id:$scope.user.id});
				}
			});
		}
	};
	$scope.deleteUser = function (id) {

		UserService.deleteUser(id, function(data) {
			if (data.success === true) {
				$rootScope.signedIn = false;
				AuthService.logout();
				$state.go('logout');
			}
		});
	};
}]);
