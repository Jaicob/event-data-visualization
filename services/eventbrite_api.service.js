'use strict';

var https = require('https');

/**
 * Basic data fetching for now
 */
exports.getEvents = function(callback) {
    console.log("Hitting API for events");
    //second page https://www.eventbriteapi.com/v3/events/search/?start_date.range_start=2016-01-17T00%3A00%3A00Z&sort_by=date&popular=on&token=I66BMTTQT7FJNEOM7UW2&start_date.range_end=2016-02-17T00%3A00%3A00Z&venue.country=US&page=2
    return https.get('https://www.eventbriteapi.com/v3/events/search/?popular=on&sort_by=date&venue.country=US&start_date.range_start=2016-01-01T00%3A00%3A00Z&start_date.range_end=2016-01-04T00%3A00%3A00Z&token=I66BMTTQT7FJNEOM7UW2', function(response) {

        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            var parsed = JSON.parse(body);
            callback({
                events: parsed.events
            });
        });
    });
}