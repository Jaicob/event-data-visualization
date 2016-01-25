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
  router.route('/events').get(core.events);

  io.on("connection", function(socket) {
    socket.emit('init event stream', {
      data: "data"
    });

    socket.on('event req', function(data) {
      core.getData(data.start, data.end, function(graphData) {
        socket.emit('event stream', {
          data: graphData
        });
      });
    });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });

  return router;
}