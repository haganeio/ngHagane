// 1. define the module and the other module dependencies (if any)
var ngHagane = angular.module('ngHagane', []);
ngHagane.constant('MODULE_VERSION', '0.0.1');
// ngHagane.factory('factoryName', function() {/* stuff here */});
// ngHagane.directive('directiveName', function() {/* stuff here */});

// angular.module('ngHagane').controller('main', function() {
// 	/* more stuff here */
// });

ngHagane.provider('hgApi', function () {
	settings.server;
	settings.appToken;
	settings.accessToken;

	this.setServer = function (server) {
		settings.server = server;
	}

	this.setAppToken = function (appToken) {
		settings.appToken = appToken;
	}

	this.$get = [function () {
		$hagane = {};

		$hagane.getServer: function () {
			return settings.server;
		}

		$hagane.getAppToken: function () {
			return settings.appToken;
		}
		return $hagane;
	}];
});
