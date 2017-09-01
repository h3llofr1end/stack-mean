var locationListCtrl = function($scope, loc8rData, geolocation) {
	$scope.message = "Проверяем ваше местоположение";
	$scope.getData = function(position) {
		var lat = position.coords.latitude,
			lng = position.coords.longitude;
		console.log(lat);
		console.log(lng);
		$scope.message = "Ищем места поблизости...";
		loc8rData.locationByCoords(lat, lng)
			.success(function(data) {
				$scope.message = data.length > 0 ? "" : "Не найдено мест поблизости";
				$scope.data = { locations: data };
			})
			.error(function(e) {
				$scope.message = "Извиняемся, что-то пошло не так";
			});
	};
	$scope.showError = function(error) {
		$scope.$apply(function() {
			$scope.message = error.message;
		});
	}

	$scope.noGeo = function() {
		$scope.$apply(function() {
			$scope.message = "Геолокация не поддерживается вашим браузером.";
		})
	}

	geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

var geolocation = function() {
	var getPosition = function(cbSuccess, cbError, cbNoGeo) {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
		} else {
			cbNoGeo();
		}
	};
	return {
		getPosition: getPosition
	};
};

var loc8rData = function($http) {
	var locationByCoords = function(lat, lng) {
		return $http.get('/api/locations?lng='+lng+'&lat='+lat);
	};
	return {
		locationByCoords: locationByCoords
	};
};

var formatDistance = function() {
	return function(distance) {
		var numDistance, unit;
		if(distance > 1000) {
			numDistance = parseFloat(distance/1000).toFixed(1);
			unit = ' км';
		} else {
			numDistance = parseInt(distance);
			unit = ' м';
		}
		return numDistance + unit;
	};
};

var ratingStars = function() {
	return {
		scope: {
			thisRating: '=rating'
		},
		templateUrl: "/angular/rating-stars.html"
	};
};

angular
	.module('loc8rApp', [])
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('loc8rData', loc8rData)
	.service('geolocation', geolocation);