app.config(function($mdThemingProvider, $mdIconProvider, hgApiProvider) {
	$mdThemingProvider.theme('default')
	.primaryPalette('orange', {
		'default': '900'
	})
	.accentPalette('deep-orange');

	//Hagane API config
	hgApiProvider.setServer('http://sisse.hagane.io');
});
