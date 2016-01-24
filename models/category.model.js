var db = require('../db')

exports.get = function(category_id, callback) {
    return {
        "101": "Business",
        // "102": "Science & Tech",
        // "103": "Music",
        // "104": "Film & Media",
        "105": "Performing & Visual Arts",
        // "106": "Fashion",
        // "107": "Health",
        // "108": "Sports & Fitness",
        // "109": "Travel & Outdoor",
        // "110": "Food & Drink",
        // "111": "Charity & Causes",
        // "112": "Government",
        // "113": "Community",
        "114": "Spirituality",
        // "115": "Family & Education",
        // "116": "Holiday",
        // "117": "Home & Lifestyle",
        // "118": "Auto, Boat & Air",
        // "119": "Hobbies",
        "199": "Other",
    };
}