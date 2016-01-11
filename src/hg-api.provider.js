// 1. define the module and the other module dependencies (if any)
var ngHagane = angular.module('ngHagane', []);
ngHagane.constant('MODULE_VERSION', '0.0.1');

ngHagane.provider('hgApi', function () {
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

	this.$get = ['$http', function ($http) {
		$hagane = {};
		$hagane.session = {};

		$hagane.getHost = function () {
			return settings.host;
		}

		$hagane.getAppToken = function () {
			return settings.appToken;
		}

		$hagane.session.create = function (sessionId, userId, userRole) {
			session.id = sessionId;
			session.userId = userId;
			session.userRole = userRole;
		};

		$hagane.session.destroy = function () {
			session.id = null;
			session.userId = null;
			session.userRole = null;
		};

		$hagane.login = function (credentials) {
			return $http
			.post(settings.host + '/login', credentials)
			.then(function (res) {
				if (res.data.success) {
					var user = res.data.message.user;
					session.create(user.id, user.user.id, user.user.role);
					return user;
				} else if (res.data.error) {
					return res.data.error;
				} else {
					throw 'login failed';
				}

			});
		}

		$hagane.isAuthenticated = function () {
			return !!session.userId;
		};

		$hagane.isAuthorized = function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return ($hagane.isAuthenticated() &&
				authorizedRoles.indexOf(session.userRole) !== -1);
		};

		return $hagane;
	}];
});

