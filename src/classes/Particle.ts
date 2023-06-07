export default class Particle {
  x: number;
  y: number;
  color: string;
  vel: {
    x: number;
    y: number;
  };
  lifetime: number;
  ctx: CanvasRenderingContext2D;
  speed?: number;

  constructor(
    x: number,
    y: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    speed?: number
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.vel = this.#randomVec(speed);
    this.lifetime = window.Math.random() * 1500;
    this.ctx = ctx;
  }

  #randomVec(max = 5) {
    let dir = Math.random() * Math.PI * 2;
    let spd = Math.random() * max;
    return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
  }

  update() {
    this.x += this.vel.x * 2;
    this.y += this.vel.y * 2;
    this.vel.y += 0.02;
    this.vel.x *= 0.99;
    this.vel.y *= 0.99;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, 10, 10);
  }
}
