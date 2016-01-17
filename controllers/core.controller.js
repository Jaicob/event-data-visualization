'use strict';

/**
 * Serves up the root page
 */
exports.index = function(req, res, next) {
	res.render('index', { title: 'Express' });
};