class Vec2 {
  constructor(a, b) {
    this.v = [a, b];
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
}

export default Vec2;
