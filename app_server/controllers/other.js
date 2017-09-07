module.exports.about = function(req, res) {
	res.render('generic-text', {
		title: 'О проекте Loc8r',
		content: 'Loc8r был создан чтобы помочь людям найти место где можно приятно провести время\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit Nunc sed lorem ac nisi dignissim accumsan.'
	});
};

module.exports.angularApp = function(req, res) {
	res.render('layout', {title: 'Loc8r'});
};