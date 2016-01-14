app.config(function($routeProvider) {
	$routeProvider
	.when('/admin', {
		templateUrl: 'app/admin/admin.html',
		controller: 'AdminMainCtlr'
	})
	.otherwise({
		redirectTo: '/admin'
	});
});
