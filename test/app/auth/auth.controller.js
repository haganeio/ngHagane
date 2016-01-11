app.controller('AuthCtlr', function ($scope, $rootScope, HG_AUTH_EVENTS, hgApi) {
	$scope.credentials = {};

	$scope.login = function () {
		hgApi.login($scope.credentials)
		.then(function (user) {
			$rootScope.$broadcast(HG_AUTH_EVENTS.loginSuccess);
			//$scope.setCurrentUser(user);
		}, function () {
			$rootScope.$broadcast(HG_AUTH_EVENTS.loginFailed);
		});
	};
});
