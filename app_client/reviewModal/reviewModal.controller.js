(function() {
	angular
		.module('loc8rApp')
		.controller('reviewModalCtrl', reviewModalCtrl);

	reviewModalCtrl.$inject = ['$modalInstance', 'loc8rData', 'locationData'];
	function reviewModalCtrl($modalInstance, loc8rData, locationData) {
		var vm = this;

		vm.locationData = locationData;
		vm.modal = {
			close: function(result) {
				$modalInstance.close(result);
			},
			cancel: function() {
				$modalInstance.dismiss('cancel');
			}
		};
		vm.onSubmit = function() {
			vm.formError = "";
			if(!vm.formData.rating || !vm.formData.reviewText) {
				vm.formError = "Все поля обязательны, попробуйте снова.";
				return false;
			} else {
				vm.doAddReview(vm.locationData.locationid, vm.formData);
			}
		};
		vm.doAddReview = function(locationid, formData) {
			loc8rData.addReviewById(locationid, {
				rating: formData.rating,
				reviewText: formData.reviewText
			})
			.success(function(data) {
				vm.modal.close(data);
			})
			.error(function(data) {
				vm.formError = "Не удалось сохранить отзыв, попробуйте снова";
			});
			return false;
		}
	};
})();