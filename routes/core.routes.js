'use strict';

module.exports = function(io) {
    var app = require('express');
    var router = app.Router();
    var core = require('../controllers/core.controller');
    var d3 = require('d3');//use this for d3's range function

    /**
     * Prefix:root Verb:GET URI:/ Controller: core.index
     */
    router.route('/').get(core.index);

    router.route('/ptest').get(core.ptest);

    io.on("connection", function(socket) {
        console.log("A user connected");

        socket.emit('init event stream', {
            data: d3.range(5).map(function() {
                return core.getData(15);
            })
        });

        socket.on('event req', function(data) {
            console.log(data);
            socket.emit('event stream', {
                data: d3.range(5).map(function() {
                    return core.getData(15);
                })
            });
        });

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    return router;
}