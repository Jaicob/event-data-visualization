var db = require('../db');
var _ = require("underscore");

var categories = {
    "101": "Business",
    "102": "Science & Tech",
    "103": "Music",
    "104": "Film & Media",
    "105": "Performing & Visual Arts",
    "106": "Fashion",
    "107": "Health",
    "108": "Sports & Fitness",
    "109": "Travel & Outdoor",
    "110": "Food & Drink",
    "111": "Charity & Causes",
    "112": "Government",
    "113": "Community",
    "114": "Spirituality",
    "115": "Family & Education",
    "116": "Holiday",
    "117": "Home & Lifestyle",
    "118": "Auto, Boat & Air",
    "119": "Hobbies",
    "199": "Other",
};

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

    data = eventObjects.map(function(event) {
        var data = {
            capacity: event.capacity,
            category_id: event.category_id,
            date: event.start.utc
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