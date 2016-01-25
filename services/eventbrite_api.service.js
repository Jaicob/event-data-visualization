'use strict';

var https = require('https');

/**
 * Basic data fetching for now need to incorperate pagination at somepoint
 */
exports.getEvents = function(start, end, callback) {
  console.log("Hitting API for events");
  var request = 'https://www.eventbriteapi.com/v3/events/search/?popular=on&sort_by=date&venue.country=US&start_date.range_start=' + start + 'T00%3A00%3A00Z&start_date.range_end=' + end + 'T00%3A00%3A00Z&token=I66BMTTQT7FJNEOM7UW2';

  return https.get(request, function(response) {
    var body = '';

    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {
      if (response.statusCode != "200") {
        body = '{"events":[]}';
      }

      var parsed = JSON.parse(body);
      callback({
        events: parsed.events
      });
    });
  });
}