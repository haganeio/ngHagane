app.config(function($mdThemingProvider, $mdIconProvider, hgApiProvider) {
	$mdThemingProvider.theme('default')
	.primaryPalette('orange', {
		'default': '900'
	})
	.accentPalette('deep-orange');

	//Hagane API config
	//$httpProvider.defaults.withCredentials = true;
	hgApiProvider.setHost('http://sisse.hagane.io');
});
