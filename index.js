var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var game = require('./server/game');

app.use(express.static('client'));

http.listen(3000, function () {
    console.log('Listening on port 3000');
});

game.init(io);