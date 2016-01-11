app.directive('hgMenu', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/menu.html',
    scope: {
      items: '=items'
    },
    controller: function($scope) {
      $scope.activeItem = 0;
    }
  }
});
