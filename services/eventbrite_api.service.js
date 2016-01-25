'use strict';

var https = require('https');

/**
 * Basic data fetching for now
 */
exports.getEvents = function(start, end, callback) {
    console.log("Hitting API for events");
    //second page https://www.eventbriteapi.com/v3/events/search/?start_date.range_start=2016-01-17T00%3A00%3A00Z&sort_by=date&popular=on&token=I66BMTTQT7FJNEOM7UW2&start_date.range_end=2016-02-17T00%3A00%3A00Z&venue.country=US&page=2
    var request = 'https://www.eventbriteapi.com/v3/events/search/?popular=on&sort_by=date&venue.country=US&start_date.range_start=' + start + 'T00%3A00%3A00Z&start_date.range_end=' + end + 'T00%3A00%3A00Z&token=I66BMTTQT7FJNEOM7UW2';
            console.log("Calling stat",response.statusCode);

    return https.get(request, function(response) {
        if (response.statusCode !== "200") {
            console.log("Calling back");
            callback({
                events: {"events" : []}
            });
            return;
        }
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            if (response.statusCode !== "200") {
            console.log("Calling back");
            callback({
                events: {"events" : []}
            });
            return;
        }

            var parsed = JSON.parse(body);
            callback({
                events: parsed.events
            });
        });
    });
}