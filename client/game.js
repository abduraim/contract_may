(function () {



}());

var socket;

var player;
var players = [];
var servBuildings = [];
var buildings = [];
var mouseMoving = false;
var zoom = 1;

function preload() {
    noLoop();       // stop drawing
    socket = io.connect('http://localhost:3000');
    socket.on('connect', () => {
        socket.emit('start', socket.id);
        socket.on('playerStart', function (servPlayer) {
            player = new Player(servPlayer.posX, servPlayer.posY, servPlayer.radiusSize, servPlayer.velocity, servPlayer.socketId);
            zoom = player.zoom;
            loop();         // start drawing
        });
        socket.on('buildingsStart', function (servBuildings) {
            servBuildings = servBuildings;
            for (var i = 0; i < servBuildings.length; i ++) {
                buildings[i] = new Building(
                    servBuildings[i].posX,
                    servBuildings[i].posY,
                    servBuildings[i].width,
                    servBuildings[i].height);
            };
        });
    });

    img = loadImage('img/1.png');

}

function setup() {
    //frameRate(1);
    createCanvas(500, 500);

    socket.on('heartbeat', function (wholePlayers) {
        players = wholePlayers;
    });


}

function draw() {
    background(0);

    translate(width/2, height/2);
    zoom = lerp(zoom, player.zoom, 0.1);
    scale(zoom);
    translate(-player.pos.x, -player.pos.y);

    for (var i = 0; i < buildings.length; i ++) {
        buildings[i].show();
    }

    for (var i = 0; i < players.length; i++) {
        if (players[i].socketId != player.socketId) {
            fill(255);
            ellipse(players[i].posX, players[i].posY, players[i].radiusSize*2, players[i].radiusSize*2);
        }
    }

    if (mouseIsPressed && mouseMoving) {
        vel = player.getMotionVector(mouseX-width/2, mouseY-height/2);
        player.update(vel, buildings);
    }

    if (keyIsPressed && !mouseMoving) {
        var vel = createVector(0, 0);
        if (keyIsDown(LEFT_ARROW)) {
            vel.add(player.getMotionVector(-width, 0));
        }
        if (keyIsDown(DOWN_ARROW)) {
            vel.add(player.getMotionVector(0, height));
        }
        if (keyIsDown(RIGHT_ARROW)) {
            vel.add(player.getMotionVector(width, 0));
        }
        if (keyIsDown(UP_ARROW)) {
            vel.add(player.getMotionVector(0, -height));
        }
        player.update(vel, buildings);
    }

    socket.emit('update', {socketId: player.socketId, posX: player.pos.x, posY: player.pos.y, radiusSize: player.radiusSize});
    player.show();
}

function mousePressed() {
    if (
        Math.abs(mouseX-(width/2)) < player.radiusSize &&
        Math.abs(mouseY-(height/2)) < player.radiusSize
    ) {
        mouseMoving = true;
    }
}

function mouseReleased() {
    mouseMoving = false;
}

/**
 * Zoom canvas
 * @param event
 */
function mouseWheel(event) {
    if (event.delta > 0) {
        player.zoom /= 1.2;
    } else {
        player.zoom *= 1.2;
    }
}