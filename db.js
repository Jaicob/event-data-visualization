//This code is inspired by  Stefan Fidanov
var Redis = require("ioredis")

var state = {
    db: null,
}

var REDIS_DEV = "redis_development",
    REDIS_PRODUCTION = "redis_production"

exports.REDIS_DEV = REDIS_DEV
exports.REDIS_PRODUCTION = REDIS_PRODUCTION

exports.connect = function(mode) {
    state.db = new Redis({
        port: 6379, // Redis port
        host: '172.17.0.2', // Redis host
        family: 4, // 4 (IPv4) or 6 (IPv6)
    })

    // Use different DB when in development
    if (mode === REDIS_DEV) {
        state.db.select(15)
    }
}

exports.get = function() {
    return state.db
}