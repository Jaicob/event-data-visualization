'use strict';

/**
 * Dependencies
 **/
var eventbrite = require('../services/eventbrite_api.service');

/**
 * Serves up the root page
 */
exports.index = function(req, res, next) {
	res.render('index', { title: 'Express' });
};

exports.ptest = function(req, res, next) {
	res.render('ptest', { title: 'Polymer' });
};

/**
 * Serves up the root page
 */
exports.test = function(req, res, next) {
	res.render('test', { title: 'Express' });
};


//Temporary implementation of a way to populate the graph, this will move to a service that interact with the api next
exports.getData = function(n){
	// Inspired by Lee Byron's test data generator.
	// eventbrite.getCategories({},function(status, res){
	// 	console.log('Status',status);
	// 	console.log('Res',res);
	// })

    function bump(a) {
        var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
        for (var i = 0; i < n; i++) {
            var w = (i / n - y) * z;
            a[i] += x * Math.exp(-w * w);
        }
    }
    var a = [],
        i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < 5; ++i) bump(a);
    return a.map(function(d, i) {
        return {
            x: i,
            y: Math.max(0, d)
        };
    });
}

