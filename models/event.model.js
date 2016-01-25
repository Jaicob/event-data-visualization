var db = require('../db');
var categories = require('./category.model').get();
var _ = require("underscore");

exports.add = function(eventObject, callback) {
    db.get().flushall();
    var data = {
        date: eventObject.start.utc,
        capacity: eventObject.capacity,
        online_event: eventObject.status,
        category_id: eventObject.category_id
    }

    db.get().rpush(data.created, JSON.stringify(data), callback);
}

exports.addList = function(eventObjects, callback) {
    db.get().flushall();

    data = eventObjects
        .filter(function(event) {
            return !(event.category_id == null);
        })
        .map(function(event) {
            // if (event.start.utc == null || event.category_id == null) return; //throw out data with no date
            console.log("Cat id", event.category_id);
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
exports.getByCategory = function(category, callback) {
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

exports.all = function(callback) {
    db.get().lrange("events", 0, -1, function(err, items) {
        callback(items.map(function(item) {
            var data = JSON.parse(item);
            return data
        }));
    });
}