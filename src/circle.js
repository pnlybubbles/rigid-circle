import {Vec2} from './math';

class Circle {
  constructor(x, y, r, m) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.m = m;
    this.e = 0.99;
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

  collision(circle) {
    if (this.x + this.r > circle.x - circle.r
      && this.x - this.r < circle.x + circle.r
      && this.y + this.r > circle.y - circle.r
      && this.y - this.r < circle.y + circle.r) {
      const f = new Vec2(this.x - circle.x, this.y - circle.y);
      if (f.sqrLen() < Math.pow(this.r + circle.r, 2)) {
        // console.log(this.r, this.vx, this.vy, circle.r, circle.vx, circle.vy);
        const c = f.normalize();
        // console.log(f.v, f.len(), c.v, c.len());
        const m1 = this.m;
        const m2 = circle.m;
        const v1 = new Vec2(this.vx, this.vy);
        const v2 = new Vec2(circle.vx, circle.vy);
        const e = this.e * circle.e;
        const com = c.scale((1 + e) / (m1 + m2) * v1.sub(v2).dot(c));
        // v1_ = v2.scale((1 + e) * c.m).add(v1.scale(this.m)).sub(v1.scale(e * c.m)).scale(1 / (this.m + c.m));
        // v2_ = v1.scale((1 - e) * this.m).add(v2.scale(c.m)).sub(v2.scale(e * this.m)).scale(1 / (this.m + c.m));
        // console.log(v1.sub(v2).dot(c), c.len(), c.v, v1.sub(v2).v);
        const v1_ = v1.add(com.scale(-m2));
        const v2_ = v2.add(com.scale(m1));
        this.vx = v1_.v[0];
        this.vy = v1_.v[1];
        circle.vx = v2_.v[0];
        circle.vy = v2_.v[1];
        // console.log(this.r, this.vx, this.vy, circle.r, circle.vx, circle.vy);
        return true;
      }
    }
    return null;
  }

  inside(x0, y0, x1, y1) {
    return x0 < this.x + this.r && y0 < this.y + this.r && x1 > this.x - this.r && y1 > this.y - this.r;
  }
}

export default Circle;
