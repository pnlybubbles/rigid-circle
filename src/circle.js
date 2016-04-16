class Circle {
  constructor(x, y, r, m) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.m = m;
    this.e = 0.8;
    this.vx = 0;
    this.vy = 0;
    this.gforceEnabled = true;
  }

  gforce(gx, gy, dt) {
    let xG = 0;
    let yG = 0;
    let vxG = 0;
    let vyG = 0;
    if (this.gforceEnabled) {
      xG = 0.5 * gx * dt * dt;
      yG = 0.5 * gy * dt * dt;
      vxG = gx * dt;
      vyG = gy * dt;
    }
    this.x = this.x + this.vx * dt + xG;
    this.y = this.y + this.vy * dt + yG;
    this.vx = this.vx + vxG;
    this.vy = this.vy + vyG;
  }

  collision(c) {
    if (this.x + this.r > c.x - c.r
      && this.x - this.r < c.x + c.r
      && this.y + this.r > c.y - c.r
      && this.y - this.r < c.y + c.r) {
      const xr = this.x - c.x;
      const yr = this.y - c.y;
      if (Math.pow(xr, 2) + Math.pow(yr, 2) < Math.pow(this.r + c.r, 2)) {
        // return [xr, -yr]; // [vx, xy]
        return true;
      }
    }
    return null;
  }

  inside(x0, y0, x1, y1) {
    return x0 < this.x && y0 < this.y && x1 > this.y && y1 > this.y;
  }
}

export default Circle;
