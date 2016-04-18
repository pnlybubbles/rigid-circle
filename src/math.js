class Vec2 {
  constructor(a, b) {
    const a_ = a || 0;
    const b_ = b || 0;
    this.v = [a_, b_];
  }

  add(v2) {
    return new Vec2(this.v[0] + v2.v[0], this.v[1] + v2.v[1]);
  }

  sub(v2) {
    return new Vec2(this.v[0] - v2.v[0], this.v[1] - v2.v[1]);
  }

  dot(v2) {
    return this.v[0] * v2.v[0] + this.v[1] * v2.v[1];
  }

  scale(s) {
    return new Vec2(this.v[0] * s, this.v[1] * s);
  }

  len() {
    return Math.sqrt(Math.pow(this.v[0], 2) + Math.pow(this.v[1], 2));
  }

  sqrLen() {
    return Math.pow(this.v[0], 2) + Math.pow(this.v[1], 2);
  }

  negate() {
    return this.scale(this, -1);
  }

  normalize() {
    const len = this.len();
    return this.scale(this.v[0] / len, this.v[1] / len);
  }
}

export {Vec2};
