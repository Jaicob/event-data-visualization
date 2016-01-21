var db = require('../db')

exports.get = function(category_id, callback) {
    // db.get().get("category_id",function(err,data){
    // 	if (err) {
    // 		eventbriteapi.getCategory(category_id, function(err, data){
    // 			var category = JSON.parse(data);
    // 			db.get().set(category_id,category.short_name);
    // 		});
    // 	} else {
    // 		callback(data);
    // 	}
    // });
    // return ['103','101','113','105','104','108','109','111','114','115','116','112','106','117','118','119','199'];
    // return {
    //     "103": "Music",
    //     "101": "Business",
    //     "113": "Food & Drink",
    //     "105": "Arts",
    //     "104": "Film & Media",
    //     "108": "Sports & Fitness",
    //     "109": "Travel & Outdoor",
    //     "111": "Charity & Causes",
    //     "114": "Spirituality",
    //     "115": "Family & Education",
    //     "116": "Holiday",
    //     "112": "Government",
    //     "106": "Fashion",
    //     "117": "Home & Lifestyle",
    //     "118": "Auto, Boat & Air",
    //     "119": "Hobbies",
    //     "199": "Other"
    // };
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