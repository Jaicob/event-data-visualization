var db = require('../db');
var categories = require('./category.model').get();
var eventbrite = require('../services/eventbrite_api.service');
var _ = require("underscore");

var add = function(eventObject, callback) {
    db.get().flushall();
    var data = {
        date: eventObject.start.utc,
        capacity: eventObject.capacity,
        online_event: eventObject.status,
        category_id: eventObject.category_id
    }

    db.get().rpush(data.created, JSON.stringify(data), callback);
}

var addList = function(eventObjects, callback) {
    db.get().flushall();
    var data = eventObjects
        .filter(function(event) {
            return !(event.category_id == null);
        })
        .map(function(event) {
            var data = {
                capacity: event.capacity,
                category_id: event.category_id,
                date: event.start.utc.substring(0, event.start.utc.indexOf('T'))
            }
            return JSON.stringify(data);
        });

    db.get().rpush("events", data, callback);
}

/*
 * Gets events per a specified category
 */
var getByCategory = function(category, callback) {
    db.get().lrange("events", 0, -1, function(err, items) {

        items = items.map(function(item) {
            var data = JSON.parse(item);
            return data;
        });

        callback(err, items.filter(function(e) {
            return (e.category_id == category);
        }));
    });
}

var all = function(start, end, callback) {
    //If not in the db then needs to populate the db and add it
    eventbrite.getEvents(start, end, function(data) {
        addList(data.events, function() {
            db.get().lrange("events", 0, -1, function(err, items) {
                callback(items.map(function(item) {
                    var data = JSON.parse(item);
                    return data
                }));
            });
        })
    })
}

module.exports = {
  add: add,
  addList: addList,
  getByCategory: getByCategory,
  all: all
}