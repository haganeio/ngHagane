var ngHagane = angular.module('ngHagane', []);
ngHagane.constant('MODULE_VERSION', '0.0.1');

ngHagane.provider('$hagane', [function () {
	settings = {};
	session = {};
	session.user = {};

	settings.host;
	settings.appToken;

	//retieve cookies
	var $cookies;
	angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
		$cookies = _$cookies_;
	}]);
	var token = $cookies.get('hgsession');
	if (token) {
		session.user.accessToken = token;
	}

	this.setHost = function (host) {
		settings.host = host;
	}

	this.setAppToken = function (appToken) {
		settings.appToken = appToken;
	}

	this.$get = ['$http', '$cookies', '$q', function ($http, $cookies, $q) {
		$hagane = {};
		$hagane.session = {};
		$hagane.api = {};

		$hagane.getHost = function () {
			return settings.host;
		}

		$hagane.getAppToken = function () {
			return settings.appToken;
		}

		$hagane.getAccessToken = function () {
			return session.user.accessToken;
		}

		$hagane.session.create = function (accessToken, userId, userRole) {
			$cookies.put('hgsession', accessToken);
			session.user.accessToken = accessToken;
			session.user.id = userId;
			session.user.role = userRole;
		};

		$hagane.session.destroy = function () {
			$cookies.put('hgsession', '');
			session.user.accessToken = null;
			session.user.id = null;
			session.user.role = null;
		};

		$hagane.login = function (credentials) {
			var defer = $q.defer();

			return $http
			.post(settings.host + '/User/login', credentials)
			.then(function (res) {
				if (res.data.success) {
					var user = res.data.message.user;
					$hagane.session.create(user.accessToken, user.id, user.role);

					defer.resolve(res.data.message);
				} else if (res.data.error) {
					defer.reject(res.data.error);
				} else {
					throw 'login failed';
				}
				return defer.promise;
			});
		}

		$hagane.api.get = function (path) {
			var defer = $q.defer();

			var token = '';
			if (session.accessToken) {
				token = '/'+session.accessToken;
			}
			return $http
			.get(settings.host + path + token)
			.then(function (res) {
				if (res.data.success) {
					defer.resolve(res.data.message);
				} else if (res.data.error) {
					defer.reject(res.data.error);
				} else {
					throw 'hagane get failed';
				}
				return defer.promise;
			});
		};

		$hagane.api.post = function (path, data) {
			var defer = $q.defer();

			if (data) {
				if (session.accessToken) {
					data.accessToken = session.accessToken;
				}
				return $http
				.post(settings.host + path, data)
				.then(function (res) {
					if (res.data.success) {
						defer.resolve(res.data.message);
					} else if (res.data.error) {
						defer.reject(res.data.error);
					} else {
						throw 'hagane post failed';
					}
					return defer.promise;
				});
			} else {
				throw 'hagane post no data';
			}
		};

		$hagane.api.put = function (path, data) {
			var defer = $q.defer();

			if (data) {
				if (session.accessToken) {
					data.accessToken = session.accessToken;
				}
				return $http
				.put(settings.host + path, data)
				.then(function (res) {
					if (res.data.success) {
						defer.resolve(res.data.message);
					} else if (res.data.error) {
						defer.reject(res.data.error);
					} else {
						throw 'hagane post failed';
					}
					return defer.promise;
				});
			} else {
				throw 'hagane put no data';
			}
		};

		$hagane.api.delete = function (path, data) {
			var defer = $q.defer();

			if (data) {
				if (session.accessToken) {
					data.accessToken = session.accessToken;
				}
				return $http
				.delete(settings.host + path, data)
				.then(function (res) {
					if (res.data.success) {
						defer.resolve(res.data.message);
					} else if (res.data.error) {
						defer.reject(res.data.error);
					} else {
						throw 'hagane post failed';
					}
					return defer.promise;
				});
			} else {
				throw 'hagane delete no data';
			}
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
}]);
ngHagane.constant('HG_AUTH_EVENTS', {
	LOGIN_SUCCESS: 'auth-login-success',
	LOGIN_FAILED: 'auth-login-failed',
	LOGOUT_SUCCESS: 'auth-logout-success',
	SESSION_TIMEOUT: 'auth-session-timeout',
	NOT_AUTHENTICATED: 'auth-not-authenticated',
	NOT_AUTHORIZED: 'auth-not-authorized'
});
