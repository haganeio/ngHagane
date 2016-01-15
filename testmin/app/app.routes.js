app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('login');
	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'app/auth/login.html',
			controller: 'AuthCtlr'
		})
		.state('admin', {
			url: '/admin',
			templateUrl: 'app/admin/admin.html',
			data: {
				requiresLogin : true
			},
			controller: 'AdminMainCtlr'
		});
});