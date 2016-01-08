// 1. define the module and the other module dependencies (if any)
var ngHagane = angular.module('ngHagane', []);
ngHagane.constant('MODULE_VERSION', '0.0.1');
// ngHagane.factory('factoryName', function() {/* stuff here */});
// ngHagane.directive('directiveName', function() {/* stuff here */});

// angular.module('ngHagane').controller('main', function() {
// 	/* more stuff here */
// });

ngHagane.provider('hgApi', function () {
	this.server;
	this.appToken;
	this.accessToken;

	this.setServer = function (server) {
		this.server = server;
	}

	this.$get = function () {
		var self = this;
		return {
			getServer: function () {
				return self.server;
			},
		}
	};
});

ngHagane.constant('HG_AUTH_EVENTS', {
  LOGIN_SUCCESS: 'auth-login-success',
  LOGIN_FAILED: 'auth-login-failed',
  LOGOUT_SUCCESS: 'auth-logout-success',
  SESSION_TIMEOUT: 'auth-session-timeout',
  NOT_AUTHENTICATED: 'auth-not-authenticated',
  NOT_AUTHORIZED: 'auth-not-authorized'
});

ngHagane.factory('hgAuth', function(hgSession, hgApi) {
  var authService = {};

  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };

  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  return authService;
});

ngHagane.service('hgSession', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
});
