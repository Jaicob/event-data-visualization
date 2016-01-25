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

    router.route('/categories').get(core.test);

    router.route('/events').get(core.events);

    io.on("connection", function(socket) {


        console.log("Sending data stream");
        socket.emit('init event stream', {
            data: "data"
        });

        // core.getData(function(graphData) {
        socket.on('event req', function(data) {
            console.log("requested more data", data);
            core.getData(data.start, data.end, function(graphData) {
                socket.emit('event stream', {
                    data: graphData
                });
            });
        });
        // });

        socket.on('disconnect', function() {
            //Delete data
            console.log('user disconnected');
        });
    });

    return router;
}