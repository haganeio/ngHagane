// 1. define the module and the other module dependencies (if any)
var ngHagane = angular.module('ngHagane', []);
ngHagane.constant('MODULE_VERSION', '0.0.1');

ngHagane.provider('$hagane', function () {
	settings = {};
	session = {};

	settings.host;
	settings.appToken;
	settings.accessToken;

	this.setHost = function (host) {
		settings.host = host;
	}

	this.setAppToken = function (appToken) {
		settings.appToken = appToken;
	}

	this.$get = ['$http', '$cookies', function ($http, $cookies) {
		$hagane = {};
		$hagane.session = {};
		$hagane.api = {};

		$hagane.getHost = function () {
			return settings.host;
		}

		$hagane.getAppToken = function () {
			return settings.appToken;
		}

		$hagane.session.create = function (accessToken, userId, userRole) {
			$cookies.put('hgsession', accessToken);
			session.accessToken = accessToken;
			session.userId = userId;
			session.userRole = userRole;
		};

		$hagane.session.destroy = function () {
			$cookies.put('hgsession', '');
			session.accessToken = null;
			session.userId = null;
			session.userRole = null;
		};

		$hagane.login = function (credentials) {
			return $http
			.post(settings.host + '/login', credentials)
			.then(function (res) {
				if (res.data.success) {
					var user = res.data.message.user;
					session.create(user.accessToken, user.id, user.role);
					return user;
				} else if (res.data.error) {
					return res.data.error;
				} else {
					throw 'login failed';
				}
			});
		}

		$hagane.api.post = function (path, data) {
			return $http
			.post(settings.host + path, data)
			.then(function (res) {
				if (res.data.success) {
					return res.data.message;
				} else if (res.data.error) {
					return res.data.error;
				} else {
					throw 'hagane post failed';
				}
			});
		};

		$hagane.api.get = function (path) {
			return $http
			.get(settings.host + path)
			.then(function (res) {
				if (res.data.success) {
					return res.data.message;
				} else if (res.data.error) {
					return res.data.error;
				} else {
					throw 'hagane get failed';
				}
			});
		};

		$hagane.isAuthenticated = function () {
			return !!session.userId;
		};

		// $hagane.isAuthorized = function (authorizedRoles) {
		// 	if (!angular.isArray(authorizedRoles)) {
		// 		authorizedRoles = [authorizedRoles];
		// 	}
		// 	return ($hagane.isAuthenticated() &&
		// 		authorizedRoles.indexOf(session.userRole) !== -1);
		// };

		return $hagane;
	}];
});

