//var io = '';
var socket;
var player = require('../server/player');   // Подключаем модель Игрока
var building = require('../server/building');   // Подключаем модель Здания


setInterval(heartBeat, 1000/60);

function heartBeat() {
    io.emit('heartbeat', player.getPlayersPosition());
}

exports.init = function (sio) {
    io = sio;
    io.on('connection', function (socket) {
        player.addToGame(socket);
        building.addRandomBuildings();
        socket.on('disconnect', function (data) {
            player.removeFromGame(socket.id);
        });
        socket.on('start', function (socketId) {
            socket.emit('playerStart', player.getSpecifications(socketId));
            socket.emit('buildingsStart', building.getBuildingsPosition());
        });
        socket.on('update', function (updatedPlayer) {
            player.update(updatedPlayer);
        })
    })
};