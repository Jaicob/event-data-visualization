'use strict';

/**
 * Dependencies
 **/
var eventbrite = require('../services/eventbrite_api.service');
var db = require('../db');
var events = require('../models/event.model');
var categories = require('../models/category.model');
var test_data = require('../sample_data.json');
var async = require('async');
var _ = require("underscore");

/**
 * Serves up the root page
 */
exports.index = function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
};

exports.ptest = function(req, res, next) {
    res.render('ptest', {
        title: 'Polymer'
    });
};

/**
 * Serves up the root page
 */
exports.test = function(req, res, next) {
    eventbrite.getCategories(function(data){
        res.json(data);
    });
};

exports.events = function(req, res, next) {
    events.all(function(data){
        res.json(data);
    });
}

//Temporary implementation of a way to populate the graph, this will move to a service that interact with the api next
exports.getData = function(callback) {
    events.all(function(err, data) {
        var i = 22;
        data.forEach(function(event) {
            var category = event.category_id;
            var categoryIndex = categories[category];
            results[categoryIndex].push({
                "x": i++,
                "y": event.capacity,
            });
        });
        console.log("results", results);
        callback(results);
    });
};

/*
 * Generates the layer data for the streamgraph
 * to display the break down of capacity by event
 */
exports.capacityLayers = function(callback) {
    var cats = categories.get();
    var keys = _.keys(cats);
    //getByCategory
    //map into value format
    events.addList(test_data.events,function(){
        console.log("Add list");
    });

    async.mapSeries(keys, function(key, callback) {
        events.getByCategory(key, function(err, res) {
            if (err) return callback(err);
            var i = 0;
            var res = {
                name: cats[key],
                values: res.map(function(d){
                    return {
                        x: i++,
                        y: d.capacity,
                    };
                })
            }
            callback(null, res);
        })
    }, function(err, results) {
       callback(results);
    });
}

/*
 * Generates the layer data for the streamgraph
 * to display the break down of capacity by event
 */
// exports.events = function(callback) {
//     events.all(function(err, res){
//        callback(res);
//     });
// }