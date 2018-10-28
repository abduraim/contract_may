var players = [];           // Общий списко Игроков в текущей Игре

/**
 * Модель Игрока
 * @param x
 * @param y
 * @param socketId
 * @constructor
 */
function Player(x, y, socketId) {
    this.posX = x;
    this.posY = y;
    this.velocity = 3;
    this.radiusSize = 16;
    this.socketId = socketId;
    console.log('add new Player - ', socketId);
}

exports.addToGame = function (socket) {
    players.push(new Player(0, 0, socket.id));
};

exports.removeFromGame = function (socketId) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].socketId == socketId) {
            console.log('remove Player - ', socketId);
            players.splice(i, 1);
        }
    }
};

exports.getSpecifications = function (socketId) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].socketId == socketId) {
            return players[i];
        }
    }
};

exports.getPlayersPosition = function () {
    return players;
};

exports.update = function (updatedPlayer) {
    for (var i = 0; i < players.length; i ++) {
        if (players[i].socketId == updatedPlayer.socketId) {
            players[i].posX = updatedPlayer.posX;
            players[i].posY = updatedPlayer.posY;
            players[i].radiusSize = updatedPlayer.radiusSize;
        }
    }
};
