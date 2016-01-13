function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
app.controller('AdminMainCtlr', function($scope, hagane, $mdDialog) {
	$scope.carritos = [];

	hagane.api.get('/carritos')
	.then(function(res){
		$scope.carritos = res.carritos;
	});

	$scope.carritoDialog = function(ev, index) {
		$scope.carrito = $scope.carritos[index];
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'app/admin/carrito.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:false,
			scope: $scope,
			preserveScope: true
		});
	};
});
