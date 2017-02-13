app.controller('FileUploadController', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout) {

    if(!AuthService.isLoggedIn())
        $state.go('login');

	$scope.upload = function (dataUrl, name) {
		Upload.upload({
			url: 'img_uploads',
			data: {
				file: Upload.dataUrltoBLob(dataUrl, name)
			},
		}).then(function (res) {
			$timeout(function() {
				$scope.result = res.data;
			});
		}, function (res) {
			if (res.status > 0)
				$scope.errorMsg = res.status + ": " + res.data;
		}, function (evt) {
			$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
		});
	}
}]);
