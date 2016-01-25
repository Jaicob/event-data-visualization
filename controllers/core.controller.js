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

exports.events = function(req, res, next) {
  events.all(function(data) {
    res.json(data);
  });
}

//Temporary implementation of a way to populate the graph, this will move to a service that interact with the api next
exports.getData = function(start, end, callback) {
  events.all(start, end, function(data) {
    callback(data);
  });
};