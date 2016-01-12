app.controller('AdminMainCtlr', function($scope, hagane) {
	$scope.carritos = [];

	hagane.api.get('/carritos')
	.then(function(res){
		$scope.carritos = res.carritos;
	});
});
