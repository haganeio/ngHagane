app.controller('AuthCtlr', function ($scope, $rootScope, HG_AUTH_EVENTS, $hagane) {
	$scope.credentials = {};
	$scope.mensaje = 'men';
	$scope.returning = '';

	$scope.apipost = function (mensaje) {
		$hagane.api.post('/Index/prueba/'+mensaje)
		.then(function (res) {
			$scope.returning = res;
		});
	};

	$scope.apiget = function (mensaje) {
		$hagane.api.get('/Index/prueba/'+mensaje)
		.then(function (res) {
			$scope.returning = res;
		});
	};

	$scope.login = function () {
		$hagane.login($scope.credentials)
		.then(function (res) {
			$scope.returning = res;
			$rootScope.$broadcast(HG_AUTH_EVENTS.loginSuccess);
			//$scope.setCurrentUser(user);
		}, function () {
			$rootScope.$broadcast(HG_AUTH_EVENTS.loginFailed);
		});
	};
});
