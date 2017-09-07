(function() {

angular
	.module('loc8rApp')
	.service('loc8rData', loc8rData);

function loc8rData($http) {
	var locationByCoords = function(lat, lng) {
		return $http.get('/api/locations?lng='+lng+'&lat='+lat);
	};
	return {
		locationByCoords: locationByCoords
	};
}

})();