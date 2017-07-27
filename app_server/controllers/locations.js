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
	res.render('location-info', {
		title: 'Сушия',
		pageHeader: {title: 'Сушия'},
		sidebar: {
			context: 'Сушия на Loc8r потому что это прекрасное время где можно провести время и заняться продуктивной работой.',
			callToAction: 'Если вы здесь были и вам понравилось, ну или нет - пожалуйста оставьте отзыв, чтобы помочь другим пользователям.'
		},
		location: {
			title: 'Сушия',
			address: 'Невский проспект, 108',
			rating: 3,
			facilities: ['Горячие напитки', 'Вкусные роллы', 'Хороший вай-фай'],
			coords: {lat: 59.9317527, lng: 30.355245},
			openingTimes: [{
				days: 'понедельник - пятница',
				opening: '07:00',
				closing: '19:00',
				closed: false
			},{
				days: 'суббота',
				opening: '08:00',
				closing: '17:00',
				closed: false
			}, {
				days: 'воскресенье',
				closed: true
			}],
			reviews: [{
				author: 'Иван Иванов',
				rating: 5,
				timestamp : '22.07.2017',
				reviewText: 'Какое чудное место. Я обязательно приду сюда еще раз!',
			}, {
				author: 'Петр Петров',
				rating: 3,
				timestamp : '22.06.2017',
				reviewText: 'Всё было хорошо. Кофе не был хорошим, зато вай-фай шикарен.',
			}]
		}
	});
};

module.exports.addReview = function(req, res) {
	res.render('location-review-form', {
		title: 'Добавить обзор на "Сушия" на Loc8r',
		pageHeader: {title: 'Добавить обзор на "Сушия"'}
	});
};