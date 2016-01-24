'use strict';

module.exports = function(io) {
    var app = require('express');
    var router = app.Router();
    var core = require('../controllers/core.controller');
    var d3 = require('d3'); //use this for d3's range function

    /**
     * Prefix:root Verb:GET URI:/ Controller: core.index
     */
    router.route('/').get(core.index);

    router.route('/ptest').get(core.ptest);

    router.route('/categories').get(core.test);

    router.route('/events').get(core.events);

    io.on("connection", function(socket) {

        core.capacityLayers(function(data) {
            console.log("Sending data stresm")
            socket.emit('init event stream', {
                data: data
            });
        });

        socket.on('event req', function(data) {
            console.log(data);
            socket.emit('event stream', {
                data: core.getData()
            });
        });

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    return router;
}