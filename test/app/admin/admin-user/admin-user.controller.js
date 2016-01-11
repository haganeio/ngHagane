app.controller('AdminUserCtlr', function ($scope, $timeout, $mdSidenav, $log, $http, $mdDialog, $mdToast) {
	$scope.$parent.loading = 'indeterminate';
	$scope.usuariosAdmin = [];
	$scope.usuariosResponsable = [];
	$scope.usuariosDoctor = [];
	$scope.$parent.toolbar_title = 'Gestión de usuarios';
	$scope.usuarioResponsableForm = null;
	$scope.usuarioAdminForm = null;
	$scope.usuarioDoctorForm = null;

	$http.post('Admin/ajaxGetUsuarioAdmin', {})
	.then(function(response) {
		$scope.usuariosAdmin = response.data;
	})
	.finally(function() {
		$scope.$parent.loading = null;
	});

	$http.get('Admin/ajaxGetUsuarioDoctor', {})
	.then(function(response) {
		$scope.usuariosDoctor = response.data;
	})
	.finally(function() {
		$scope.$parent.loading = null;
	});

	$http.get('Admin/ajaxGetUsuarioResponsable', {})
	.then(function(response) {
		$scope.usuariosResponsable = response.data;
	})
	.finally(function() {
		$scope.$parent.loading = null;
	});

	$scope.modDoctorDialog = function(ev, index) {
		$scope.usuarioDoctorForm = $scope.usuariosDoctor[index];
		$mdDialog.show({
			controller: DialogCtlr,
			templateUrl: 'index.php?controller=Template&action=modificarDoctor',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:false,
			scope: $scope,
			preserveScope: true
		})
		.then(function(resp) { //se guarda el cambio
			if (resp) {
				$http.post('Admin/ajaxUpdateUsuarioResponsable', $scope.usuarioDoctorForm)
				.then(function(response) {
					$mdToast.show(
						$mdToast.simple()
						.position('right')
						.content('Guardado Usuario Doctor')
						.parent(document.querySelector( '#pagecontent' ))
						.hideDelay(3000)
					);
				});
			}
		});
	};

	$scope.modPymeDialog = function(ev, index) {
		$scope.usuarioResponsableForm = $scope.usuariosResponsable[index];
		$mdDialog.show({
			controller: DialogCtlr,
			templateUrl: 'index.php?controller=Template&action=modificarUsuarioPyme',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:false,
			scope: $scope,
			preserveScope: true
		})
		.then(function(resp) { //se guarda el cambio
			if (resp) {
				$http.post('Admin/ajaxUpdateUsuarioResponsable', $scope.usuarioResponsableForm)
				.then(function(response) {
					$mdToast.show(
						$mdToast.simple()
						.position('right')
						.content('Guardado Usuario Responsable')
						.parent(document.querySelector( '#pagecontent' ))
						.hideDelay(3000)
					);
				});
			}
		});
	};

	$scope.modAdminDialog = function(ev, index) {
		$scope.usuarioAdminForm = $scope.usuariosAdmin[index];
		$mdDialog.show({
			controller: DialogCtlr,
			templateUrl: 'Templates/modificarUsuarioAdmin.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:false,
			scope: $scope,
			preserveScope: true
		})
		.then(function(resp) { //se guarda el cambio
			if (resp) {
				$http.post('Admin/ajaxUpdateUsuarioResponsable', $scope.usuarioAdminForm)
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
