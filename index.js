var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
    console.log('listening on 3000 port');
});

io.on('connection', function (socket) {
    console.log('connected new client!');
    socket.on('new message', function (data) {
        console.log(data);
        io.emit('send message', data);
        for (var i = 0; i < 10; i++) {
            console.log(i);
            io.emit('send message', i);
        }
    });
});

