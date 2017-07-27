module.exports.homelist = function(req, res) {
	res.render('locations-list', {
		title: 'Loc8r - Найдите место для работы рядом!',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Найдите место для работы рядом!'
		},
		sidebar: "Ищете хорошее место для отдыха? Loc8r поможет вам найти место" 
		+ "по душе где вы сможете удобно поработать. Возможно с кофе, пироженным или пиццей. Loc8r поможет найти " 
		+ "вам любое место",
		locations: [{
			name: 'Сушия',
			address: 'Невский проспект, 108',
			rating: 3,
			facilities: ["Вкусный кофе", "Хорошие роллы", "Прекрасный вай-фай"],
			distance: '100м'
		},
		{
			name: 'Lounge-кафе "Relax"',
			address: 'Литейный проспект, 47',
			rating: 4,
			facilities: ["Удобные диваны", "Вкусные кальяны", "Вип-комнаты"],
			distance: '500м'
		},
		{
			name: 'McDonalds',
			address: 'Невский проспект, 97',
			rating: 2,
			facilities: ["Хороший вай-фай", "Вкусная еда"],
			distance: '250м'
		}]
	});
};

module.exports.locationInfo = function(req, res) {
	res.render('location-info', {title: 'Location info'});
};

module.exports.addReview = function(req, res) {
	res.render('location-review-form', {title: 'Add review'});
};