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
app.controller('AdminMainCtlr', function($scope, hagane, $mdDialog, basket) {
	$scope.carritos = [];

	hagane.api.get('/carritos')
	.then(function(res){
		$scope.carritos = res.carritos;
	});

	$scope.carritoDialog = function(ev, index) {
		$scope.cartDetails = [];
		$scope.carrito = $scope.carritos[index];
		$scope.cart = JSON.parse($scope.carrito.carrito);

		for (var i = 0; i < $scope.cart.length; i++) {
			basket.get($scope.cart[i].item.id).then(function(message) {
				$scope.cartDetails.push(message.data);
			}, function(error) {
				console.log('Server error:');
				console.log(error);
			});
		}

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

//Frontend dev only. Will be replaced by ngHagane
app.service('haganeMock', function haganeMockService($q, $http) {
	this.api = {};
	var mockPrefix = 'mock-data'
	var mockPostfix = '.json'

	this.api.get = function(path) {
		var path = path.split('/');
		var result = $http.get(mockPrefix + '/' + path[0] + mockPostfix);

			if(path.length > 1) {
				var promise = result;
				var result = $q(function(resolve, reject) {
					var data;
					promise.then(function(message) {
						resolve({
							data: message.data.find(function(el, index, array) {
								return el.id === path[1];
							})
						});
					}, function(error) {
						console.log('Server error: ');
						console.log(error);
					});
				});
			}

		return result;
	}
});

app.factory('basket', function basketFactory(haganeMock) {
	var Basket = function() {
		this.getAll = function() {
			return haganeMock.api.get('baskets');
		}

		this.get = function(id) {
			return haganeMock.api.get('baskets/' + id);
		}
	}

	this.edit = function(id, basket) {

	}

	this.add = function(id, basket) {

	}

	return new Basket();
})
.controller('CarritoController', function($state, $stateParams, $scope, $mdDialog, hgShoppingCart, basket) {
	$scope.cartDetails = [];
	//$scope.cart

	for (var i = 0; i < $scope.cart.length; i++) {
		basket.get($scope.cart[i].item.id).then(function(message) {
			$scope.cartDetails.push(message.data);
		}, function(error) {
			console.log('Server error:');
			console.log(error);
		});
	}

  $scope.showCompra = function(ev) {
    $scope.resetModal();
    $mdDialog.show({
      controller: 'DialogController',
      templateUrl: 'compra.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      preserveScope: true,
      clickOutsideToClose: true
    });
  };

	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
});