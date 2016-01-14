app.config(function($routeProvider) {
	$routeProvider
	.when('/auth', {
		templateUrl: 'app/auth/login.html',
		controller: 'AuthCtlr'
	})
	.otherwise({
		redirectTo: '/auth'
	});
});
