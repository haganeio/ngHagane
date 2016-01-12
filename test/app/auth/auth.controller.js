app.controller('AuthCtlr', function ($scope, $rootScope, HG_AUTH_EVENTS, $hagane) {
	$scope.credentials = {};

	$scope.login = function () {
		$hagane.login($scope.credentials)
		.then(function (user) {
			$rootScope.$broadcast(HG_AUTH_EVENTS.loginSuccess);
			//$scope.setCurrentUser(user);
		}, function () {
			$rootScope.$broadcast(HG_AUTH_EVENTS.loginFailed);
		});
	};
});
