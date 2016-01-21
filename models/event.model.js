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
        created: eventObject.created,
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
            created: event.created,
            capacity: event.capacity,
            online_event: event.status,
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
        var d = [{
                "name": {
                    "text": "2016 Winter Antiques Show \u2022 January 22-31, 2016",
                    "html": "2016 Winter Antiques Show \u2022 January 22-31, 2016"
                },
                "description": {
                    "text": "The Winter Antiques Show marks its 62nd year as the most prestigious art, antiques, and design fair in America, featuring the \u201cbest of the best\u201d from Antiquity through the present. Held at the historic Park Avenue Armory in New York City, the Show provides curators, new and established collectors, dealers, and design professionals with opportunities to view and purchase exceptional pieces\u00a0showcased by 73 exhibitors. \n  \n\nThis fair is multiplicitous in ways that few others are anymore...\u00a0with an ardent mix-it-up spirit that was once called eclectic and is now called postmodern. \n\u2014Holland Cotter,\u00a0The New York Times\n  \n\nEach object exhibited at the Winter Antiques Show is vetted for authenticity, date, and condition by a committee of 160 experts from the United States and Europe. The strict vetting regulations and the vettors' expertise ensure that buyers can purchase with confidence.\u00a0  The Winter Antiques Show is an annual benefit for East Side House Settlement, a community resource in the South Bronx that celebrates its 125th anniversary in 2016. East Side House's programs focus on education and technology as gateways out of poverty and as the keys to economic opportunity. All revenues from the show's general admissions and the net proceeds from the preview parties and other events go East Side House and contribute substantially to its private philanthropic budget. No part of sales made by exhibitors is received by East Side House. \n  \n\n  \nRestaurants \nThere is a cafe on the Show floor catered by Canard. \nWheelchair Access Wheelchair access is via the 66th Street entrance. \nBaby Strollers Because of large crowds at the Show on the weekends, baby strollers are not permitted on weekends. This regulation protects the child's safety.\u00a0 \nChecked Bags For security reasons, the public is required to check all bags, backpacks, large purses, shopping bags, briefcases, tote bags, and any other item deemed too large by Security. ",
                    "html": "<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: left;\"><SPAN STYLE=\"font-family: helvetica; font-size: small;\"><SPAN STYLE=\"color: #333333;\"><SPAN STYLE=\"color: #000000;\">The Winter Antiques Show marks its 62nd year as the most prestigious art, antiques, and design fair in America, featuring the \u201cbest of the best\u201d from Antiquity through the present. Held at the historic Park Avenue Armory in New York City, the Show provides curators, new and established collectors, dealers, and design professionals with opportunities to view and purchase exceptional pieces\u00a0<\/SPAN><\/SPAN><\/SPAN><SPAN STYLE=\"color: #000000; font-family: helvetica; font-size: small;\">showcased by 73 exhibitors.<\/SPAN><\/P>\r\n<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: left;\"><SPAN STYLE=\"color: #000000; font-family: helvetica; font-size: small;\"><BR><\/SPAN><\/P>\r\n<BLOCKQUOTE>\r\n<H2 STYLE=\"margin: 0px; color: #404040; font-size: 20px; line-height: 1.2em; padding: 0px 0px 8px; text-align: right;\"><SPAN STYLE=\"font-family: helvetica; color: #464646;\">This fair is multiplicitous in ways that few others are anymore...\u00a0<\/SPAN><SPAN STYLE=\"color: #464646; font-family: helvetica; line-height: 1.2em;\">with an ardent mix-it-up spirit that was once called eclectic and is now called postmodern.<\/SPAN><\/H2>\r\n<H6 STYLE=\"margin: 0px; text-align: right;\"><SPAN STYLE=\"font-size: small; font-family: helvetica; color: #464646;\">\u2014Holland Cotter,\u00a0<EM>The New York Times<\/EM><\/SPAN><\/H6>\r\n<P><SPAN STYLE=\"font-size: small; font-family: helvetica; color: #464646;\"><EM><BR><\/EM><\/SPAN><\/P>\r\n<\/BLOCKQUOTE>\r\n<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: left;\"><SPAN STYLE=\"color: #333333; font-family: helvetica; font-size: small;\">Each object exhibited at the Winter Antiques Show is vetted for authenticity, date, and condition by a committee of 160 experts from the United States and Europe. The strict vetting regulations and the vettors' expertise ensure that buyers can purchase with confidence.\u00a0<BR><BR>The Winter Antiques Show is an annual benefit for East Side House Settlement, a community resource in the South Bronx that celebrates its 125th anniversary in 2016. East Side House's programs focus on education and technology as gateways out of poverty and as the keys to economic opportunity. All revenues from the show's general admissions and the net proceeds from the preview parties and other events go East Side House and contribute substantially to its private philanthropic budget. No part of sales made by exhibitors is received by East Side House.<\/SPAN><\/P>\r\n<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: left;\"><SPAN STYLE=\"color: #333333; font-family: helvetica; font-size: small;\"><BR><\/SPAN><\/P>\r\n<HR>\r\n<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: center;\"><SPAN STYLE=\"font-weight: bold; font-family: helvetica; font-size: small;\"><BR><\/SPAN><\/P>\r\n<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: center;\"><SPAN STYLE=\"font-weight: bold; font-family: helvetica; font-size: small;\">Restaurants<\/SPAN><\/P>\r\n<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: center;\"><SPAN STYLE=\"font-size: small; font-family: helvetica;\"><SPAN STYLE=\"color: #333333;\">There is a cafe on the Show floor catered by Canard.<\/SPAN><\/SPAN><\/P>\r\n<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: center;\"><SPAN STYLE=\"font-size: small; font-family: helvetica;\"><SPAN STYLE=\"font-weight: bold;\">Wheelchair Access<\/SPAN><SPAN STYLE=\"color: #333333;\"><BR>Wheelchair access is via the 66th Street entrance.<\/SPAN><\/SPAN><\/P>\r\n<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: center;\"><SPAN STYLE=\"font-family: helvetica; font-size: small;\"><SPAN STYLE=\"font-weight: bold;\">Baby Strollers<\/SPAN><\/SPAN><SPAN STYLE=\"color: #333333; font-family: helvetica; font-size: small;\"><BR>Because of large crowds at the Show on the weekends, baby strollers are not permitted on weekends. This regulation protects the child's safety.\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"line-height: 18px; margin: 0px; padding: 0px 0px 8px; color: #666666; letter-spacing: 0.5px; text-align: center;\"><SPAN STYLE=\"font-family: helvetica; font-size: small;\"><SPAN STYLE=\"font-weight: bold;\">Checked Bags<\/SPAN><\/SPAN><SPAN STYLE=\"color: #333333; font-family: helvetica; font-size: small;\"><BR>For security reasons, the public is required to check all bags, backpacks, large purses, shopping bags, briefcases, tote bags, and any other item deemed too large by Security.<\/SPAN><\/P>"
                },
                "id": "2447765332",
                "url": "http://www.eventbrite.com/e/2016-winter-antiques-show-january-22-31-2016-tickets-2447765332?aff=ebapi",
                "start": {
                    "timezone": "America/New_York",
                    "local": "2016-01-22T12:00:00",
                    "utc": "2016-01-22T17:00:00Z"
                },
                "end": {
                    "timezone": "America/New_York",
                    "local": "2016-01-31T18:00:00",
                    "utc": "2016-01-31T23:00:00Z"
                },
                "created": "2013-10-04T20:04:11Z",
                "changed": "2016-01-18T22:13:31Z",
                "capacity": 141200,
                "status": "live",
                "currency": "USD",
                "listed": true,
                "shareable": true,
                "online_event": false,
                "tx_time_limit": 480,
                "hide_start_date": false,
                "locale": "en_US",
                "is_locked": false,
                "privacy_setting": "unlocked",
                "logo_id": "15507061",
                "organizer_id": "1302037909",
                "venue_id": "11479094",
                "category_id": "105",
                "subcategory_id": "5008",
                "format_id": "5",
                "resource_uri": "https://www.eventbriteapi.com/v3/events/2447765332/",
                "logo": {
                    "id": "15507061",
                    "url": "https://img.evbuc.com/https%3A%2F%2Fimg.evbuc.com%2Fhttp%253A%252F%252Fcdn.evbuc.com%252Fimages%252F15507061%252F17713928551%252F1%252Foriginal.jpg%3Frect%3D0%252C600%252C3600%252C1800%26s%3D41231d24ad462543127b8ae436b0ae26?h=200&w=450&s=8164047a64037015cca03ee888bb7811",
                    "aspect_ratio": "2",
                    "edge_color": "#171914",
                    "edge_color_set": true
                }
            }, {
                "name": {
                    "text": "2016 AT&T Pebble Beach Pro-Am",
                    "html": "2016 AT&amp;T Pebble Beach Pro-Am"
                },
                "description": {
                    "text": "Join us at the AT&T Pebble Beach Pro-Am, played annually on three of the Monterey Peninsula's premier golf courses: Pebble Beach Golf Links, Spyglass Hill Golf Course, and Monterey Peninsula Country Club Shore Course in front of over 150,000 spectators and millions of television viewers. Each ticket purchased is valid for admission at all three courses. Children 12 and under admitted free.\u00a0 \nField: 156 professionals / 156 amateurs \nPurse: $7,000,000\u00a0 Defending Champion: Brandt Snedeker  Schedule Monday, February 8 \u2022 Practice rounds, Pebble Beach Golf Links and Spyglass Hill Golf Course Tuesday, February 9 \u2022 Practice rounds, all three courses \u2022 1:30 p.m. Chevron Shoot Out, SF Giants vs. SF 49ers, Pebble Beach Golf Links \u2013 holes #1, 2, 3, 17 & 18  Wednesday, February 10 \u2022 Practice rounds, all three courses \u2022 11:00 a.m. 3M Celebrity Challenge, Pebble Beach Golf Links \u2013 holes #1, 2, 3, 17 & 18  Thursday, February 11 \u2022 8:00 a.m. First round, all three courses Friday, February 12 \u2022 8:00 a.m. Second round, all three courses Saturday, February 13 \u2022 8:00 a.m. Third round, all three courses Sunday, February 14 \u2022 7:30 a.m. Final round, Pebble Beach Golf Links \u2022 60 low pros and 25 low amateur teams   \u2022 After purchasing your ticket, you will receive an email confirmation with a PDF attachment from Eventbrite on behalf of the AT&T Pebble Beach Pro-Am. \u00a0Make sure to print them out and bring them to the event for redemption. \u00a0 \nIMPORTANT: If you do not see your order confirmation in your inbox, make sure to check your junk/spam folder, or Click Here for more information. \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u2022 Need to change the name(s) on your order? Click Here for instructions. \u2022 For general tournament info, Click Here.   FAQs \nWhat are my transportation/parking options? \nMonday-Tuesday: Complimentary parking inside Pebble Beach Wednesday - Sunday: Access to Pebble Beach is restricted to only those with the proper parking credentials. \u00a0 Complimentary spectator parking is located at Cal State University, Monterey Bay (CSUMB), in Marina with free shuttles to the tournament. \nFollow \"AT&T GOLF\" signs on Hwy 1. To reach the spectator parking lot at CSUMB, follow \"AT&T GOLF\" signs on Hwy 1 Shuttle hours are: Wed-Sat: 6:30am - 6:00 pm Sunday: \u00a06:30am - 5:00 pm \nThe name on the ticket doesn't match the attendee. Is that okay? \nThe name on the ticket is not a concern. We scan the ticket's barcode for validity and do not to check the name. \n\u00a0 ",
                    "html": "<P>Join us at the AT&T Pebble Beach Pro-Am, played annually on three of the Monterey Peninsula's premier golf courses: Pebble Beach Golf Links, Spyglass Hill Golf Course, and Monterey Peninsula Country Club Shore Course in front of over 150,000 spectators and millions of television viewers. Each ticket purchased is valid for admission at all three courses. Children 12 and under admitted free.\u00a0<\/P>\r\n<P><SPAN STYLE=\"line-height: 1.6em;\">Field: 156 professionals / 156 amateurs<\/SPAN><\/P>\r\n<P>Purse: $7,000,000\u00a0<BR>Defending Champion: Brandt Snedeker<BR><BR><SPAN STYLE=\"text-decoration: underline;\"><SPAN STYLE=\"font-size: large;\">Schedule<\/SPAN><\/SPAN><BR><STRONG><SPAN STYLE=\"font-size: small;\">Monday, February 8<\/SPAN><\/STRONG><BR>\u2022 Practice rounds, Pebble Beach Golf Links and Spyglass Hill Golf Course<BR><STRONG>Tuesday, February 9<\/STRONG><BR>\u2022 Practice rounds, all three courses<BR>\u2022 1:30 p.m. Chevron Shoot Out, SF Giants vs. SF 49ers, Pebble Beach Golf Links \u2013 holes #1, 2, 3, 17 &amp; 18 <BR><STRONG>Wednesday, February 10<\/STRONG><BR>\u2022 Practice rounds, all three courses<BR>\u2022 11:00 a.m. 3M Celebrity Challenge, Pebble Beach Golf Links \u2013 holes #1, 2, 3, 17 &amp; 18 <BR><STRONG>Thursday, February 11<\/STRONG><BR>\u2022 8:00 a.m. First round, all three courses<BR><STRONG>Friday, February 12<\/STRONG><BR>\u2022 8:00 a.m. Second round, all three courses<BR><STRONG>Saturday, February 13<\/STRONG><BR>\u2022 8:00 a.m. Third round, all three courses<BR><STRONG>Sunday, February 14<\/STRONG><BR>\u2022 7:30 a.m. Final round, Pebble Beach Golf Links<BR>\u2022 60 low pros and 25 low amateur teams<BR> <BR>\u2022 After purchasing your ticket, you will receive an email confirmation with a PDF attachment from Eventbrite on behalf of the AT&T Pebble Beach Pro-Am. \u00a0Make sure to print them out and bring them to the event for redemption. \u00a0<\/P>\r\n<P>IMPORTANT: If you do not see your order confirmation in your inbox, make sure to check your junk/spam folder, or <A HREF=\"http://help.eventbrite.com/customer/en_us/portal/articles/428577-where-are-my-tickets-\">Click Here<\/A> for more information. \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0<BR>\u2022 Need to change the name(s) on your order? <A TITLE=\"Change Customer Name on Tickets\" HREF=\"http://help.eventbrite.com/customer/en_us/portal/articles/430100-how-to-update-your-ticket-registration-information\" TARGET=\"_blank\">Click Here<\/A> for instructions.<BR>\u2022 For general tournament info, <A HREF=\"http://www.attpbgolf.com/spectators\" REL=\"nofollow\">Click Here<\/A>.<BR> <BR><STRONG STYLE=\"line-height: 1.6em;\">FAQs<\/STRONG><\/P>\r\n<P><STRONG STYLE=\"line-height: 1.6em;\">What are my transportation/parking options?<\/STRONG><\/P>\r\n<P>Monday-Tuesday: Complimentary parking inside Pebble Beach<BR>Wednesday - Sunday: Access to Pebble Beach is restricted to only those with the proper parking credentials. \u00a0<BR>Complimentary spectator parking is located at Cal State University, Monterey Bay (CSUMB), in Marina with free shuttles to the tournament.<\/P>\r\n<P>Follow \"AT&T GOLF\" signs on Hwy 1.<BR>To reach the spectator parking lot at CSUMB, follow \"AT&T GOLF\" signs on Hwy 1<BR>Shuttle hours are:<BR>Wed-Sat: 6:30am - 6:00 pm<BR>Sunday: \u00a06:30am - 5:00 pm<\/P>\r\n<P><STRONG STYLE=\"line-height: 1.6em;\">The name on the ticket doesn't match the attendee. Is that okay?<\/STRONG><\/P>\r\n<P>The name on the ticket is not a concern. We scan the ticket's barcode for validity and do not to check the name.<\/P>\r\n<P>\u00a0<\/P>"
                },
                "id": "16992572241",
                "url": "http://www.eventbrite.com/e/2016-att-pebble-beach-pro-am-tickets-16992572241?aff=ebapi",
                "vanity_url": "http://2016-att-pb-pro-am-e-tickets.eventbrite.com",
                "start": {
                    "timezone": "America/Los_Angeles",
                    "local": "2016-02-08T08:00:00",
                    "utc": "2016-02-08T16:00:00Z"
                },
                "end": {
                    "timezone": "America/Los_Angeles",
                    "local": "2016-02-14T16:00:00",
                    "utc": "2016-02-15T00:00:00Z"
                },
                "created": "2015-05-14T16:52:30Z",
                "changed": "2016-01-19T03:39:41Z",
                "capacity": 35000,
                "status": "live",
                "currency": "USD",
                "listed": true,
                "shareable": true,
                "online_event": false,
                "tx_time_limit": 1800,
                "hide_start_date": false,
                "locale": "en_US",
                "is_locked": false,
                "privacy_setting": "unlocked",
                "logo_id": "15786133",
                "organizer_id": "4855158863",
                "venue_id": "8723869",
                "category_id": "108",
                "subcategory_id": "8010",
                "format_id": "13",
                "resource_uri": "https://www.eventbriteapi.com/v3/events/16992572241/",
                "logo": {
                    "id": "15786133",
                    "url": "https://img.evbuc.com/https%3A%2F%2Fimg.evbuc.com%2Fhttp%253A%252F%252Fcdn.evbuc.com%252Fimages%252F15786133%252F76620129619%252F1%252Foriginal.jpg%3Frect%3D89%252C0%252C2636%252C1318%26s%3D2a87df405831132a4badcd31a89df84f?h=200&w=450&s=0998f8e2a349be4d032b9d54efb9ef79",
                    "aspect_ratio": "2",
                    "edge_color": "#ffffff",
                    "edge_color_set": true
                }
            }, {
                "name": {
                    "text": "SATURDAY NIGHT AT MISSION NIGHTCLUB LOUNGE",
                    "html": "SATURDAY NIGHT AT MISSION NIGHTCLUB LOUNGE"
                },
                "description": {
                    "text": "SATURDAY NIGHT \nAT \nMISSION NIGHTCLUB \n16 WEST 36TH STREET\u00a0 \n \n16 WEST 36 STREET bet 5th & 6th ave.\u00a0\u00a0 \nMission Club. \nLocated in the heart of midtown Manhattan, the newly transformed Mission Club brings out the best in New York City\u2019s hottest nightclub. Equipped with high tech lights, incredible sound system and the most gorgeous\u00a0people in the city, it\u2019s no wonder that this is NY\u2019s best kept secret. \nTable reservation & \u00a0event booking email us at info@iclubnyc.com \n\u00a021 and over with proper ID /FINAL ENTRENCE IS UPTO THE DOORMAN Discretion \nMust Show ticket or say ICLUBNYC LIST TO GET IN \u00a0girls free / guys $20\u00a0 \n  ",
                    "html": "<H2><SPAN STYLE=\"font-size: xx-large;\">SATURDAY NIGHT<\/SPAN><\/H2>\r\n<H2>AT<\/H2>\r\n<H2>MISSION NIGHTCLUB<\/H2>\r\n<H2>16 WEST 36TH STREET\u00a0<\/H2>\r\n<P STYLE=\"margin: 0px; font-size: 12px; line-height: normal; font-family: Helvetica;\"><IMG ALT=\"12522983_10153814312418904_8769850342806277211_n.jpg\" SRC=\"\"><\/P>\r\n<P><SPAN><SPAN STYLE=\"font-family: Verdana, Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size: 20px;\">16 WEST 36 STREET bet 5th &amp; 6th ave.\u00a0<\/SPAN><\/SPAN><SPAN STYLE=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px;\">\u00a0<\/SPAN><\/SPAN><\/P>\r\n<H4 STYLE=\"font-size: 10px;\">Mission Club.<\/H4>\r\n<P>Located in the heart of midtown Manhattan, the newly transformed Mission Club brings out the best in New York City\u2019s hottest nightclub. Equipped with high tech lights, incredible sound system and the most gorgeous\u00a0people in the city, it\u2019s no wonder that this is NY\u2019s best kept secret.<\/P>\r\n<P>Table reservation &amp; \u00a0event booking email us at info@iclubnyc.com<\/P>\r\n<P>\u00a021 and over with proper ID /FINAL ENTRENCE IS UPTO THE DOORMAN Discretion<\/P>\r\n<P><STRONG>Must Show ticket or say <SPAN STYLE=\"color: #ff0000;\">ICLUBNYC LIST TO GET IN \u00a0<\/SPAN>girls free / guys $20\u00a0<\/STRONG><\/P>\r\n<P><BR><\/P>"
                },
                "id": "15631775060",
                "url": "http://www.eventbrite.com/e/saturday-night-at-mission-nightclub-lounge-tickets-15631775060?aff=ebapi",
                "start": {
                    "timezone": "America/New_York",
                    "local": "2016-01-23T22:00:00",
                    "utc": "2016-01-24T03:00:00Z"
                },
                "end": {
                    "timezone": "America/New_York",
                    "local": "2016-01-24T04:00:00",
                    "utc": "2016-01-24T09:00:00Z"
                },
                "created": "2015-02-04T12:53:22Z",
                "changed": "2016-01-18T18:07:32Z",
                "capacity": 18000,
                "status": "live",
                "currency": "USD",
                "listed": true,
                "shareable": true,
                "online_event": false,
                "tx_time_limit": 480,
                "hide_start_date": false,
                "locale": "en_US",
                "is_locked": false,
                "privacy_setting": "unlocked",
                "logo_id": "17876815",
                "organizer_id": "1717273352",
                "venue_id": "12787673",
                "category_id": "103",
                "subcategory_id": "3018",
                "format_id": "11",
                "resource_uri": "https://www.eventbriteapi.com/v3/events/15631775060/",
                "logo": {
                    "id": "17876815",
                    "url": "https://img.evbuc.com/http%3A%2F%2Fcdn.evbuc.com%2Fimages%2F17876815%2F24250841862%2F1%2Foriginal.jpg?h=200&w=450&s=ef797dc91fde47b997dbb6b870f79986",
                    "aspect_ratio": "1.5",
                    "edge_color": "#32190c",
                    "edge_color_set": true
                }
            }, {
                "name": {
                    "text": "KAPTURE SATURDAYS THIS SATURDAY AT KAPTURE",
                    "html": "KAPTURE SATURDAYS THIS SATURDAY AT KAPTURE"
                },
                "description": {
                    "text": "\u00a0 \n\u00a0 \nKAPTURE\u00a0\u00a0 \nTHIS SATURDAY \n75 PEACHTREE PLACE NW\u00a0 \nMIDTOWN ATLANTA\u00a0 \n(LOCATED DIRECTLY BEHIND PRIVE) \n10PM TO 3AM\u00a0 \n\u00a0 \nDRESS CODE: FASHIONABLY COMPETITIVE\u00a0 \nFOR MORE INFO AND VIP SECTIONS\u00a0 \nCALL 404 932 7624\u00a0 \nSections Non Refundable\u00a0 \n\u00a0 \nCLICK HERE FOR KAPTURE SATURDAYS\u00a0 \nWEEKLY PICTURE GALLERY !!!!! \n\u00a0 \n\u00a0 ",
                    "html": "<P STYLE=\"text-align: center;\">\u00a0<\/P>\r\n<P STYLE=\"text-align: center;\">\u00a0<IMG ALT=\"\" SRC=\"https://cdn.evbuc.com/eventlogos/22328802/saturdays22415copy.jpg\" HEIGHT=\"600\" WIDTH=\"600\"><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-family: 'comic sans ms', sans-serif; font-size: xx-large;\"><SPAN STYLE=\"line-height: 51px;\">KAPTURE\u00a0<\/SPAN><\/SPAN><SPAN STYLE=\"line-height: 51px; font-family: 'comic sans ms', sans-serif; font-size: xx-large;\">\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-family: 'comic sans ms', sans-serif; font-size: xx-large;\"><SPAN STYLE=\"line-height: 51px;\">THIS SATURDAY<\/SPAN><\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-family: 'comic sans ms', sans-serif; font-size: x-large;\">75 PEACHTREE PLACE NW\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-family: 'comic sans ms', sans-serif; font-size: x-large;\">MIDTOWN ATLANTA\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-family: 'comic sans ms', sans-serif; font-size: x-large;\">(LOCATED DIRECTLY BEHIND PRIVE)<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-family: 'comic sans ms', sans-serif; font-size: x-large;\">10PM TO 3AM\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-family: 'comic sans ms', sans-serif; font-size: x-large;\">\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-family: 'comic sans ms', sans-serif; font-size: x-large;\">DRESS CODE: FASHIONABLY COMPETITIVE\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-size: x-large; font-family: 'comic sans ms', sans-serif;\">FOR MORE INFO AND VIP SECTIONS\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-size: x-large; font-family: 'comic sans ms', sans-serif;\">CALL 404 932 7624\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-size: x-large; font-family: 'comic sans ms', sans-serif;\">Sections Non Refundable\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-size: x-large; font-family: 'comic sans ms', sans-serif;\">\u00a0<\/SPAN><\/P>\r\n<P STYLE=\"text-align: center;\"><A HREF=\"http://KaptureAtlanta.smugmug.com\" REL=\"nofollow\"><SPAN STYLE=\"color: #ff00ff;\"><STRONG><SPAN STYLE=\"font-size: x-large;\"><SPAN STYLE=\"font-family: 'comic sans ms', sans-serif;\">CLICK HERE FOR KAPTURE SATURDAYS\u00a0<\/SPAN><\/SPAN><\/STRONG><\/SPAN><\/A><\/P>\r\n<P STYLE=\"text-align: center;\"><A HREF=\"KaptureAtlanta.smugmug.com\" REL=\"nofollow\"><SPAN STYLE=\"color: #ff00ff;\"><STRONG><SPAN STYLE=\"font-size: x-large; font-family: 'comic sans ms', sans-serif;\">WEEKLY PICTURE GALLERY !!!!!<\/SPAN><\/STRONG><\/SPAN><\/A><\/P>\r\n<P STYLE=\"text-align: center;\">\u00a0<\/P>\r\n<P STYLE=\"text-align: center;\"><SPAN STYLE=\"font-size: x-large; font-family: 'comic sans ms', sans-serif;\"><A HREF=\"http://KAPTUREATLANTA.SMUGMUG.COM\" REL=\"nofollow\"><IMG ALT=\"\" SRC=\"https://cdn.evbuc.com/eventlogos/22328802/img6596.jpg\" HEIGHT=\"600\" WIDTH=\"600\"><\/IMG><\/A>\u00a0<\/SPAN><\/P>"
                },
                "id": "13263111323",
                "url": "http://www.eventbrite.com/e/kapture-saturdays-this-saturday-at-kapture-tickets-13263111323?aff=ebapi",
                "vanity_url": "http://kapturesaturdays.eventbrite.com",
                "start": {
                    "timezone": "America/New_York",
                    "local": "2016-01-23T22:00:00",
                    "utc": "2016-01-24T03:00:00Z"
                },
                "end": {
                    "timezone": "America/New_York",
                    "local": "2016-01-24T03:00:00",
                    "utc": "2016-01-24T08:00:00Z"
                },
                "created": "2014-09-22T16:29:02Z",
                "changed": "2016-01-18T07:47:04Z",
                "capacity": 21300,
                "status": "live",
                "currency": "USD",
                "listed": true,
                "shareable": true,
                "online_event": false,
                "tx_time_limit": 480,
                "hide_start_date": false,
                "locale": "en_US",
                "is_locked": false,
                "privacy_setting": "unlocked",
                "logo_id": "8815669",
                "organizer_id": "6402966199",
                "venue_id": "12781495",
                "category_id": "112",
                "subcategory_id": "3008",
                "format_id": "11",
                "resource_uri": "https://www.eventbriteapi.com/v3/events/13263111323/",
                "logo": {
                    "id": "8815669",
                    "url": "https://img.evbuc.com/http%3A%2F%2Fcdn.evbuc.com%2Fimages%2F8815669%2F22485103614%2F1%2Foriginal.JPG?h=200&w=450&s=5b33cc776c85c1cc145f51f83de15965",
                    "aspect_ratio": "3.846153846153846153846153846",
                    "edge_color": "#ffffff",
                    "edge_color_set": true
                }
            }, {
                "name": {
                    "text": "Utah STEM Fest",
                    "html": "Utah STEM Fest"
                },
                "description": {
                    "text": "The purpose of the Utah STEM Fest is to bring students, families, educators and business leaders together to showcase future looking\u00a0opportunities in education, business and in aligning STEM disciplines with tomorrows jobs and\u00a0innovation. \nCome and join with thousands of Utahns who want to look\u00a0into the future, touch tomorrow and get ready to be a part of the science, the technology and the\u00a0engineering opportunities that will fuel innovation and drive Utah\u2019s economy for the next hundred.\u00a0This is Utah STEM Fest. The most unique gathering ever assembled in Utah. It\u2019s about innovation and\u00a0how to harness it. It\u2019s about imagination and how to fuel it. It\u2019s about dreaming and daring and\u00a0conceiving and building tomorrows great ideas.\u00a0Live music and concerts; art, dance, and performance art, combined with hands-on experiences\u00a0with science and technology, and exposure to the great companies in Utah who are leading Utah\u2019s\u00a0dynamic innovation explosion. \nNote: You can only register 100 students at a time, but you are welcome to register multiple times to accomodate your group size. Once you've registered\u00a0YOU DO NOT NEED TO PRINT OUT YOUR TICKETS. ",
                    "html": "<P><SPAN>The purpose of the Utah STEM Fest is to bring students, families, educators and business leaders together to showcase future looking\u00a0opportunities in education, business and in aligning STEM disciplines with tomorrows jobs and\u00a0innovation.<\/SPAN><\/P>\r\n<P><SPAN>Come and join with thousands of Utahns who want to look\u00a0into the future, touch tomorrow and get ready to be a part of the science, the technology and the\u00a0engineering opportunities that will fuel innovation and drive Utah\u2019s economy for the next hundred.\u00a0This is Utah STEM Fest. The most unique gathering ever assembled in Utah. It\u2019s about innovation and\u00a0how to harness it. It\u2019s about imagination and how to fuel it. It\u2019s about dreaming and daring and\u00a0conceiving and building tomorrows great ideas.\u00a0Live music and concerts; art, dance, and performance art, combined with hands-on experiences\u00a0with science and technology, and exposure to the great companies in Utah who are leading Utah\u2019s\u00a0dynamic innovation explosion.<\/SPAN><\/P>\r\n<P><SPAN STYLE=\"font-size: small;\">Note: You can only register 100 students at a time, but you are welcome to register multiple times to accomodate your group size. Once you've registered\u00a0<SPAN STYLE=\"text-decoration: underline;\">YOU DO NOT NEED TO PRINT OUT YOUR TICKETS.<\/SPAN><\/SPAN><\/P>"
                },
                "id": "18664438839",
                "url": "http://www.eventbrite.com/e/utah-stem-fest-tickets-18664438839?aff=ebapi",
                "vanity_url": "http://utahstemfest2016.eventbrite.com",
                "start": {
                    "timezone": "America/Denver",
                    "local": "2016-02-02T08:00:00",
                    "utc": "2016-02-02T15:00:00Z"
                },
                "end": {
                    "timezone": "America/Denver",
                    "local": "2016-02-04T20:00:00",
                    "utc": "2016-02-05T03:00:00Z"
                },
                "created": "2015-09-17T03:02:59Z",
                "changed": "2016-01-14T20:17:31Z",
                "capacity": 30000,
                "status": "live",
                "currency": "USD",
                "listed": true,
                "shareable": true,
                "online_event": false,
                "tx_time_limit": 600,
                "hide_start_date": false,
                "locale": "en_US",
                "is_locked": false,
                "privacy_setting": "unlocked",
                "logo_id": "15637513",
                "organizer_id": "8465885252",
                "venue_id": "11487933",
                "category_id": "102",
                "subcategory_id": null,
                "format_id": "5",
                "resource_uri": "https://www.eventbriteapi.com/v3/events/18664438839/",
                "logo": {
                    "id": "15637513",
                    "url": "https://img.evbuc.com/https%3A%2F%2Fimg.evbuc.com%2Fhttp%253A%252F%252Fcdn.evbuc.com%252Fimages%252F15637513%252F152866838463%252F1%252Foriginal.jpg%3Frect%3D0%252C58%252C922%252C461%26s%3Db3d54b7bf9631dbd8daaf453ed6705c4?h=200&w=450&s=6a595bb64534899444519624902b99ac",
                    "aspect_ratio": "2",
                    "edge_color": "#ffffff",
                    "edge_color_set": true
                }
            }, {
                "name": {
                    "text": "The Old Florida Outdoor Festival GENERAL ADMISSION",
                    "html": "The Old Florida Outdoor Festival GENERAL ADMISSION"
                },
                "description": {
                    "text": "* This ticket is for general admission lawn seating passes for single day or weekend entry. All ticket types include entry into the festival during the day. You may bring your own chair or blanket.\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \n\nThe Old Florida Outdoor Festival\u00a0\nDate:\u00a0February 12-14, 2016\nTime:\u00a0Friday 5pm-10pm, Saturday 10am-10pm, Sunday 10am-6pm\nTickets:\u00a0$20 in advance and $25 on Day Of for General Admission\nLocation:The Apopka Amphitheater (3710 Jason Dwelley Parkway, Apopka FL 32712)\n\u00a0\nJoin us in Apopka, Florida for a weekend highlighting the outdoor lifestyle and eco tourism! This year will mark the festival's five year anniversary. \nThe Old Florida Outdoor Festival was created to support the efforts of non-profits in the community and to spark a sense of adventure among its attendees. \nA portion of the proceeds go directly to fund the Big Potato Foundation. The mission of the Big Potato Foundation is to cultivate a healthy Central Florida community through charitable, creative, and cultural programs. Through these programs they strive to inspire the members of the community and engage those around them with a sense of gratitude and a heart of service. \nwww.TheOldFloridaOutdoorFestival.com \n\u00a0\n\nDisclaimers: This is an outdoor event - all shows will happen, rain or shine, and we do not provide refunds for bad weather.\u00a0\n",
                    "html": "<P><SPAN STYLE=\"line-height: 20.7999992370605px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\">* This ticket is for general admission lawn seating passes for single day or weekend entry. All ticket types include entry into the festival during the day. You may bring your own chair or blanket.\u00a0<\/SPAN>\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0<\/SPAN><\/P>\r\n<DIV STYLE=\"color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 15.8400001525879px; font-size: 14px;\">\r\n<DIV STYLE=\"line-height: 15.8400001525879px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\"><SPAN STYLE=\"font-weight: bold;\">The Old Florida Outdoor Festival\u00a0<\/SPAN><\/SPAN><\/DIV>\r\n<DIV STYLE=\"line-height: 15.8400001525879px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\"><SPAN STYLE=\"font-weight: bold;\">Date:\u00a0<\/SPAN>February 12-14, 2016<\/SPAN><\/DIV>\r\n<DIV STYLE=\"line-height: 15.8400001525879px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\"><SPAN STYLE=\"font-weight: bold;\">Time:\u00a0<\/SPAN>Friday 5pm-10pm, Saturday 10am-10pm, Sunday 10am-6pm<\/SPAN><\/DIV>\r\n<DIV STYLE=\"line-height: 15.8400001525879px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\"><SPAN STYLE=\"font-weight: bold;\">Tickets:\u00a0<\/SPAN>$20 in advance and $25 on Day Of for General Admission<\/SPAN><\/DIV>\r\n<DIV STYLE=\"line-height: 15.8400001525879px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\"><SPAN STYLE=\"font-weight: bold;\">Location:<\/SPAN>The Apopka Amphitheater (3710 Jason Dwelley Parkway, Apopka FL 32712)<\/SPAN><\/DIV>\r\n<DIV STYLE=\"line-height: 15.8400001525879px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\">\u00a0<\/SPAN><\/DIV>\r\n<P><SPAN STYLE=\"line-height: 20.7999992370605px;\">J<SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\">oin us in Apopka, Florida for a weekend highlighting the outdoor lifestyle and eco tourism! This year will mark the festival's five year anniversary.<\/SPAN><\/SPAN><\/P>\r\n<P><SPAN STYLE=\"line-height: 20.7999992370605px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\">The Old Florida Outdoor Festival was created to support the efforts of non-profits in the community and to spark a sense of adventure among its attendees.<\/SPAN><\/SPAN><\/P>\r\n<P><SPAN STYLE=\"line-height: 20.7999992370605px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\">A portion of the proceeds go directly to fund the Big Potato Foundation. The mission of the Big Potato Foundation is to cultivate a healthy Central Florida community through charitable, creative, and cultural programs. Through these programs they strive to inspire the members of the community and engage those around them with a sense of gratitude and a heart of service.<\/SPAN><\/SPAN><\/P>\r\n<P><SPAN STYLE=\"line-height: 20.7999992370605px;\">www.TheOldFloridaOutdoorFestival.com<\/SPAN><\/P>\r\n<DIV STYLE=\"line-height: 15.8400001525879px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\">\u00a0<\/SPAN><\/DIV>\r\n<DIV STYLE=\"line-height: 15.8400001525879px;\"><HR STYLE=\"border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: solid; border-top-color: #dedede; height: 0px; margin: 0px;\"><\/DIV>\r\n<DIV STYLE=\"line-height: 15.8400001525879px;\"><SPAN STYLE=\"font-family: arial, helvetica, sans-serif; font-size: small;\"><SPAN STYLE=\"font-weight: bold;\">Disclaimers<\/SPAN>: This is an outdoor event - all shows will happen, rain or shine, and we do not provide refunds for bad weather.\u00a0<\/SPAN><\/DIV>\r\n<\/DIV>"
                },
                "id": "17411404981",
                "url": "http://www.eventbrite.com/e/the-old-florida-outdoor-festival-general-admission-tickets-17411404981?aff=ebapi",
                "start": {
                    "timezone": "America/New_York",
                    "local": "2016-02-12T17:00:00",
                    "utc": "2016-02-12T22:00:00Z"
                },
                "end": {
                    "timezone": "America/New_York",
                    "local": "2016-02-14T20:00:00",
                    "utc": "2016-02-15T01:00:00Z"
                },
                "created": "2015-06-16T14:33:51Z",
                "changed": "2016-01-18T15:50:40Z",
                "capacity": 43550,
                "status": "live",
                "currency": "USD",
                "listed": true,
                "shareable": true,
                "online_event": false,
                "tx_time_limit": 480,
                "hide_start_date": false,
                "locale": "en_US",
                "is_locked": false,
                "privacy_setting": "unlocked",
                "logo_id": "16158860",
                "organizer_id": "7794114545",
                "venue_id": "12332742",
                "category_id": "111",
                "subcategory_id": "3004",
                "format_id": "5",
                "resource_uri": "https://www.eventbriteapi.com/v3/events/17411404981/",
                "logo": {
                    "id": "16158860",
                    "url": "https://img.evbuc.com/https%3A%2F%2Fimg.evbuc.com%2Fhttp%253A%252F%252Fcdn.evbuc.com%252Fimages%252F16158860%252F130914204225%252F1%252Foriginal.jpg%3Frect%3D0%252C93%252C3000%252C1500%26s%3D8dbba8921c973fa1d0597640463c193b?h=200&w=450&s=20cac2c2e48a5a13caa8ee4fc341c774",
                    "aspect_ratio": "2",
                    "edge_color": null,
                    "edge_color_set": true
                }
            }];

        items =
            items.map(function(item) {
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
        console.log("Called", items);
        callback(err, items.map(function(item) {
            var data = JSON.parse(item);
            return data;
        }));
    });
}