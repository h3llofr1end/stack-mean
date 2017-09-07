(function() {

angular
	.module('loc8rApp')
	.controller('homeCtrl', homeCtrl);

function homeCtrl($scope, loc8rData, geolocation) {
	var vm = this;
	vm.pageHeader = {
		title: 'Loc8r',
		strapline: 'Найдите места для работы посблизости'
	};
	vm.sidebar = {
		content: "Ищете место чтобы поработать и вкусно поесть?"
	};
	vm.message = "Проверяем ваше местоположение";
	vm.getData = function(position) {
		var lat = position.coords.latitude,
			lng = position.coords.longitude;
		console.log(lat);
		console.log(lng);
		vm.message = "Ищем места поблизости...";
		loc8rData.locationByCoords(lat, lng)
			.success(function(data) {
				vm.message = data.length > 0 ? "" : "Не найдено мест поблизости";
				vm.data = { locations: data };
			})
			.error(function(e) {
				vm.message = "Извиняемся, что-то пошло не так";
			});
	};
	vm.showError = function(error) {
		$scope.$apply(function() {
			vm.message = error.message;
		});
	}

	vm.noGeo = function() {
		$scope.$apply(function() {
			vm.message = "Геолокация не поддерживается вашим браузером.";
		})
	}

	geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
}

})();