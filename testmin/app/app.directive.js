app.directive('hgApp', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/app.html',
    controller: 'AppCtlr'
  }
})
