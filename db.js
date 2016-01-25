var Redis = require("ioredis");

var state = {
    db: null,
}

exports.connect = function(host) {
    console.log("Connecting to ",host);
    state.db = new Redis({
        port: 6379, 
        host: host, 
        family: 4, 
    })
}

exports.get = function() {
    return state.db
}