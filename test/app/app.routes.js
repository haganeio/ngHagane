app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/auth/login.html',
		controller: 'AuthCtlr'
	})
	.when('/clientes', {
		templateUrl: 'app/cliente/cliente.html',
		controller: 'AdminClientesCtlr'
	})
	.when('/admin', {
		templateUrl: 'app/admin/admin.html',
		controller: 'AdminClientesCtlr'
	})
	.otherwise({
		redirectTo: '/p/users'
	});
});
