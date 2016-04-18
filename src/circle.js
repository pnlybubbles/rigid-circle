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
      const f = new Vec2(this.x - c.x, this.y - c.y);
      const va = new Vec2(this.vx, this.vy);
      const vb = new Vec2(c.vx, c.vy);
      const e = this.e * c.e;
      let va_;
      let vb_;
      if (f.sqrLen() < Math.pow(this.r + c.r, 2)) {
        if (c.m === null) {
          va_ = vb.add(vb.sub(va).scale(e));
          vb_ = new Vec2();
        } else if (this.m === null) {
          va_ = new Vec2();
          vb_ = va.add(va.sub(vb).scale(e));
        } else {
          va_ = vb.scale((1 + e) * c.m).add(va.scale(this.m)).sub(va.scale(e * c.m)).scale(1 / (this.m + c.m));
          vb_ = va.scale((1 - e) * this.m).add(vb.scale(c.m)).sub(vb.scale(e * this.m)).scale(1 / (this.m + c.m));
        }
        this.vx = va_.v[0];
        this.vy = va_.v[1];
        c.vx = vb_.v[0];
        c.vy = vb_.v[1];
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
