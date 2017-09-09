(function() {
	angular
		.module('loc8rApp')
		.controller('aboutCtrl', aboutCtrl);

	function aboutCtrl() {
		var vm = this;
		vm.pageHeader = {
			title: 'О Loc8r'
		};
		vm.main = {
			content: 'Loc8r был создан чтобы помочь людям найти место где можно приятно провести время\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit Nunc sed lorem ac nisi dignissim accumsan.'
		};
	}
})();