'use strict';

var https = require('https');

/**
 * Basic data fetching for now
 */
exports.getCategories = function(options, callback){
	https.get('https://www.eventbriteapi.com/v3/categories/?token=BKKRDKVUVRC5WG4HAVLT', function(res) {
	console.log("statusCode: ", res.statusCode);
	console.log("headers: ", res.headers);

	res.on('data', function(d) {
		callback('success',d);
	});

	}).on('error', function(e) {
		callback('error',e);
	});
}
