app.controller('AuthCtlr', function ($scope, $rootScope, HG_AUTH_EVENTS, hagane) {
	$scope.credentials = {};
	$scope.mensaje = 'men';
	$scope.returning = '';

	$scope.token = hagane.getAccessToken();

	$scope.apipost = function (mensaje) {
		hagane.api.post('/Index/prueba/'+mensaje, {hola: 'hola'})
		.then(function (res) {
			$scope.returning = res;
		}, function (res) {
			$scope.returning = 'ERROR MOTHAFOKA>> ' + JSON.stringify(res);
		});
	};

	$scope.apiput = function () {
		var carrito = {
			nombre: 'nombre',
			apaterno: 'apaterno',
			amaterno: 'amaterno',
			email: 'email',
			telefono: 'telefono',
			celular: 'celular',
			calle: 'calle',
			cp: 'cp',
			numint: 'numint',
			numext: 'numext',
			colonia: 'colonia',
			municipio: 'municipio',
			carrito: 'carrito'
		};
		hagane.api.put('/Carritos', carrito)
		.then(function (res) {
			$scope.returning = res;
		}, function (res) {
			$scope.returning = 'ERROR MOTHAFOKA>> ' + JSON.stringify(res);
		});
	};

	$scope.logout = function () {
		hagane.session.destroy();
	};

	$scope.apiget = function (mensaje) {
		hagane.api.get('/Index/prueba/'+mensaje)
		.then(function (res) {
			$scope.returning = res;
		}, function (res) {
			$scope.returning = 'ERROR MOTHAFOKA>> ' + JSON.stringify(res);
		}
		);
	};

	$scope.login = function () {
		hagane.login($scope.credentials)
		.then(function (res) {
			$scope.returning = res;
			$rootScope.$broadcast(HG_AUTH_EVENTS.loginSuccess);
			//$scope.setCurrentUser(user);
		}, function (res) {
			$scope.returning = 'ERROR MOTHAFOKA>> ' + JSON.stringify(res);
			$rootScope.$broadcast(HG_AUTH_EVENTS.loginFailed);
		});
	};
});
