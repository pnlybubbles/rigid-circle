class World {
  constructor(width, height, Rwidth, Rheight) {
    this.width = width;
    this.height = height;
    this.pprx = Rwidth / width;
    this.ppry = Rheight / height;
    this.circles = [];
    this.gx = 0;
    this.gy = 0;
    this.prev_t = +new Date();
  }

  gravity(gx, gy) {
    this.gx = gx / this.pprx;
    this.gy = gy / this.ppry;
    console.log(this.gx, this.gy);
  }

  add(circle) {
    this.circles.push(circle);
  }

  step() {
    const t = +new Date();
    const dt = (t - this.prev_t) / 1000;
    for (let i = this.circles.length - 1; i >= 0; i--) {
      this.circles[i].gforce(this.gx, this.gy, dt);
      for (let j = i - 1; j >= 0; j--) {
        this.circles[i].collision(this.circles[j]);
      }
      if (!this.circles[i].inside(0, 0, this.width, this.height)) {
        this.circles.splice(i, 1);
      }
    }
  }
}

export default World;
