function Building(x, y, w, h) {
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;

    this.show = function () {
        fill(255);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}