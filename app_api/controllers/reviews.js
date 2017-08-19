var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.reviewsCreate = function(req, res) {
	var locationid = req.params.locationid;
	if(locationid) {
		Loc
			.findById(locationid)
			.select('reviews')
			.exec(function(err, location) {
				if(err) {
					sendJSONResponse(res, 400, err);
				} else {
					doAddReview(req, res, location);
				}
			});
	} else {
		sendJSONResponse(res, 404, {
			"message": "Not found, location required"
		});
	}
}

var doAddReview = function(req, res, location) {
	if(!location) {
		sendJSONResponse(res, 404, {
			"message": "location not found"
		});
	} else {
		console.log(location.reviews);
		location.reviews.push({
			author: req.body.author,
			rating: req.body.rating,
			reviewText: req.body.reviewText
		});
		location.save(function(err, location) {
			var thisReview;
			if(err) {
				sendJSONResponse(res, 400, err);
			} else {
				updateAverageRating(location._id);
				thisReview = location.reviews[location.reviews.length - 1];
				sendJSONResponse(res, 201, thisReview);
			}
		});
	}
}

var updateAverageRating = function(locationid) {
	Loc
		.findById(locationid)
		.select('rating reviews')
		.exec(function(err, location) {
			if(!err) {
				doSetAverageRating(location);
			}
		});
}

var doSetAverageRating = function(location) {
	var i, reviewCount, ratingAverage, ratingTotal;
	if(location.reviews && location.reviews.length > 0) {
		reviewCount = location.reviews.length;
		ratingTotal = 0;
		for(i = 0; i < reviewCount; i++) {
			ratingTotal = ratingTotal + location.reviews[i].rating;
		}
		ratingAverage = parseInt(ratingTotal / reviewCount, 10);
		location.rating = ratingAverage;
		location.save(function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log('Average rating updated to ' + ratingAverage);
			}
		})
	}
}

module.exports.reviewsReadOne = function(req, res) {
	if(req.params && req.params.locationid && req.params.reviewid) {
		Loc
			.findById(req.params.locationid)
			.select('name reviews')
			.exec(function(err, location) {
				var response, review;
				if(!location) {
					sendJSONResponse(res, 404, {
						"message": "location not found"
					});
					return;
				} else if(err) {
					sendJSONResponse(res, 400, err);
					return;
				}

				if(location.reviews && location.reviews.length > 0) {
					review = location.reviews.id(req.params.reviewid);
					if(!review) {
						sendJSONResponse(res, 404, {
							"message": "review not found"
						});
					} else {
						response = {
							location: {
								name: location.name,
								id: req.params.locationid
							},
							review: review
						};
						sendJSONResponse(res, 200, response);
					}
				} else {
					sendJSONResponse(res, 404, {
						"message": "No reviews found"
					})
				}
			})
	} else {
		sendJSONResponse(res, 404, {
			"message": "Not found, locationid and reviewid are both required"
		})
	}
}

module.exports.reviewsUpdateOne = function(req, res) {
	if(!req.params.locationid || !req.params.reviewid) {
		sendJSONResponse(res, 404, {
			"message": "Not found, locationid and reviewid are both required"
		});
		return;
	}
	Loc
		.findById(req.params.locationid)
		.select('reviews')
		.exec(function(err, location) {
			var thisReview;
			if(!location) {
				sendJSONResponse(res, 404, {
					"message": "location not found"
				});
				return
			} else if(err) {
				sendJSONResponse(res, 400, err);
				return;
			}
			if(location.reviews && location.reviews.length > 0) {
				thisReview = location.reviews.id(req.params.reviewid);
				if(!thisReview) {
					sendJSONResponse(res, 404, {
						"message": "review not found"
					});
				} else {
					thisReview.author = req.body.author;
					thisReview.rating = req.body.rating;
					thisReview.reviewText = req.body.reviewText;
					location.save(function(err, location) {
						if(err) {
							sendJSONResponse(res, 404, err);
						} else {
							updateAverageRating(location._id);
							sendJSONResponse(res, 200, thisReview);
						}
					});
				}
			} else {
				sendJSONResponse(res, 404, {
					"message": "No review to update"
				});
			}
		});
}

module.exports.reviewsDeleteOne = function(req, res) {
	if(!req.params.locationid || !req.params.reviewid) {
		sendJSONResponse(res, 404, {
			"message": "Not found, locationid and reviewid are both required"
		});
		return;
	}
	Loc
		.findById(req.params.locationid)
		.select('reviews')
		.exec(function(err, location) {
			if(!location) {
				sendJSONResponse(res, 404, {
					"message": "location not found"
				});
				return;
			} else if(err) {
				sendJSONResponse(res, 400, err);
				return;
			}
			if(location.reviews && location.reviews.length > 0) {
				if(!location.reviews.id(req.params.reviewid)) {
					sendJSONResponse(res, 404, {
						"message": "review not found"
					});
				} else {
					location.reviews.id(req.params.reviewid).remove();
					location.save(function(err) {
						if(err) {
							sendJSONResponse(res, 404, err);
						} else {
							updateAverageRating(location._id);
							sendJSONResponse(res, 204, null);
						}
					});
				}
			} else {
				sendJSONResponse(res, 404, {
					"message": "No review to delete"
				});
			}
		});
}