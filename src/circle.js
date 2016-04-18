import {Vec2} from './math';

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
      const f = new Vec2(xr, yr);
      const n = new Vec2(this.vx, this.vy).normalize().negate();
      if (f.len() < Math.pow(this.r + c.r, 2)) {
        const rf = f.add(n.scale(2 * f.negate().dot(n))).scale(this.e);
        this.vx = rf.v[0];
        this.vy = rf.v[1];
        return rf;
      }
    }
    return null;
  }

  inside(x0, y0, x1, y1) {
    return x0 < this.x && y0 < this.y && x1 > this.y && y1 > this.y;
  }
}

export default Circle;
