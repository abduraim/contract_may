function Player(x, y, radius, velocity, socketId) {
    this.pos = createVector(x, y);
    this.radiusSize = radius;
    this.zoom = 1;
    this.velocity = velocity;
    this.socketId = socketId;

    this.update = function (vector, buildings) {
        vector.setMag(this.velocity);
        for (var i = 0; i < buildings.length; i++) {
            vector = this.bump(buildings[i], vector);
        }
        this.pos.add(vector);
    };

    this.getMotionVector = function (x, y) {
        return createVector(x, y);
    };

    this.bump = function (building, vector) {
        //return collideRectCircle(building.pos.x, building.pos.y, building.width, building.height, this.pos.x, this.pos.y, this.r*2);
        var rx = building.pos.x;
        var ry = building.pos.y;
        var rw = building.width;
        var rh = building.height;
        var cx = this.pos.x + vector.x;
        var cy = this.pos.y + vector.y;
        var radius = this.radiusSize;

        var testX = cx;
        var testY = cy;
        var leftSide = false;
        var rightSide = false;
        var topSide = false;
        var bottomSide = false;

        // which edge is closest?
        if (cx < rx){
            testX = rx;       // left edge
            leftSide = true;
        } else if (cx > rx+rw){
            testX = rx+rw;      // right edge
            rightSide = true;
        }

        if (cy < ry) {
            testY = ry;         // top edge
            topSide = true;
        } else if (cy > ry+rh) {
            testY = ry+rh;       // bottom edge
            bottomSide = true;
        }

        // // get distance from closest edges
        var distance = dist(cx,cy,testX,testY);

        // if the distance is less than the radius, collision!
        if (distance <= radius) {
            if (leftSide && vector.x > 0) {
                vector.x = 0;
            }
            if (rightSide && vector.x < 0) {
                vector.x = 0;
            }
            if (topSide && vector.y > 0) {
                vector.y = 0
            }
            if (bottomSide && vector.y < 0) {
                vector.y = 0;
            }
            return vector;
        }
        return vector;
    };

    this.show = function () {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.radiusSize*2, this.radiusSize*2);
    }
}