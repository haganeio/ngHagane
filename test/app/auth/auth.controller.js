app.controller('AuthCtlr', function ($scope, $rootScope, HG_AUTH_EVENTS, hgAuth) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  
  $scope.login = function (credentials) {
  //   hgAuth.login(credentials).then(function (user) {
  //     $rootScope.$broadcast(HG_AUTH_EVENTS.loginSuccess);
  //     $scope.setCurrentUser(user);
  //   }, function () {
  //     $rootScope.$broadcast(HG_AUTH_EVENTS.loginFailed);
  //   });
  };
});
