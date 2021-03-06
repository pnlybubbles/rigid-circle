import {World, Circle} from './src/rc';

const canvas = document.getElementById('app');
const ctx = canvas.getContext('2d');

function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
  ctx.fill();
}

const world = new World(500, 500, 4000, 4000);

world.gravity(0, 2);

for (let i = 0; i < 20; i++) {
  let circle = new Circle(Math.random() * 500, Math.random() * 250, 10, 1);
  circle.vy = -1;
  world.add(circle);
}

for (let i = 0; i < 10; i++) {
  let circle = new Circle(50 * i + 25, 490, 20, 100000000000000);
  circle.gforceEnabled = false;
  world.add(circle);
}

for (let i = 0; i < 10; i++) {
  let circle = new Circle(10, 50 * i + 25, 20, 100000000000000);
  circle.gforceEnabled = false;
  world.add(circle);
}

for (let i = 0; i < 10; i++) {
  let circle = new Circle(490, 50 * i + 25, 20, 100000000000000);
  circle.gforceEnabled = false;
  world.add(circle);
}

// {
//   let circle = new Circle(250, 400, 100, 100000000000000);
//   circle.gforceEnabled = false;
//   world.add(circle);
// }

// {
//   let circle = new Circle(249, 10, 10, 1);
//   world.add(circle);
// }

function step() {
  requestAnimationFrame(step);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  world.step();
  for (let i = 0; i < world.circles.length; i++) {
    let c = world.circles[i];
    drawCircle(c.x, c.y, c.r);
  }
}

step();
