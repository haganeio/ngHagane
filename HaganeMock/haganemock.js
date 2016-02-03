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