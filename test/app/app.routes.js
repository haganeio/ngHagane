app.config(function($routeProvider) {
	$routeProvider
	.when('/admin', {
		templateUrl: 'app/admin/admin.html',
		controller: 'AdminMainCtlr'
	})
	.when('/login', {
		templateUrl: 'app/login/auth.html',
		controller: 'AuthCtlr'
	})
	.otherwise({
		redirectTo: '/admin'
	});
});
