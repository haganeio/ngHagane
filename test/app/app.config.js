app.config(function($mdThemingProvider, $mdIconProvider, haganeProvider) {
	$mdThemingProvider.theme('default')
	.primaryPalette('orange', {
		'default': '900'
	})
	.accentPalette('deep-orange');

	//Hagane API config
	//$httpProvider.defaults.withCredentials = true;
	haganeProvider.setHost('http://sisse.hagane.io');
});
