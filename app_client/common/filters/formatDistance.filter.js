(function() {

angular
	.module('loc8rApp')
	.filter('formatDistance', formatDistance);

function formatDistance() {
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

})();