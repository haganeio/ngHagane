app.controller('AdminClientesCtlr', function ($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $mdToast) {
	$scope.$parent.loading = 'indeterminate';
	$scope.clientes = [];
	$scope.$parent.toolbar_title = 'Gestión de clientes';
	$scope.clienteForm = null;

	$http.post('Admin/ajaxGetCliente', {})
	.then(function(response) {
		$scope.clientes = response.data;
	})
	.finally(function() {
		$scope.$parent.loading = null;
	});

	$scope.modClienteDialog = function(ev, index) {
		$scope.clienteForm = $scope.clientes[index];
		$mdDialog.show({
			controller: DialogCtlr,
			template: `<?=$this->renderView('AngularModal/modificarCliente.phtml')?>`,
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:false,
			scope: $scope,
			preserveScope: true
		})
		.then(function(resp) { //se guarda el cambio
			if (resp) {
				$http.post('Admin/ajaxUpdateUsuarioResponsable', $scope.clienteForm)
				.then(function(response) {
					$mdToast.show(
						$mdToast.simple()
						.position('right')
						.content('Guardado Usuario Admin')
						.parent(document.querySelector( '#pagecontent' ))
						.hideDelay(3000)
					);
				});
			}
		});
	};
});
