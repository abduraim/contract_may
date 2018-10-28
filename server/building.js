var buildings = [];

function Building(x, y, width, height) {
    this.posX = x;
    this.posY = y;
    this.width = width;
    this.height = height;
}

exports.addBuilding = function (x, y, width, height) {
    buildings.push(new Building(x, y, width, height));
};

exports.getBuildingsPosition = function () {
    this.addRandomBuildings();
    return buildings;
};

exports.addRandomBuildings = function () {
    if (!buildings.length) {
        buildings = [];
        for (var i = 0; i < 20; i++) {
            this.addBuilding(Math.random() * 1000, Math.random() * 1000, Math.random() * 70, Math.random() * 140);
    }

    }
};