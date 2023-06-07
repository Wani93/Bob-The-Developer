import Particle from "./Particle";

export default class FireCrackerFactory {
  x: number;
  y: number;
  color: string;
  particleCount: number;
  particles: Particle[];
  ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    particleCount?: number,
    color?: string
  ) {
    this.x = x;
    this.y = y;
    this.color = color ?? this.#randomColor();
    this.particleCount = particleCount ?? 60;
    this.particles = [];
    this.ctx = ctx;
  }

  #randomColor() {
    const letter = "0123456789ABCDEF";
    const nums = [];

    for (let i = 0; i < 3; i++) {
      nums[i] = Math.floor(Math.random() * 256);
    }

    let brightest = 0;
    for (let i = 0; i < 3; i++) {
      if (brightest < nums[i]) brightest = nums[i];
    }

    brightest /= 255;
    for (let i = 0; i < 3; i++) {
      nums[i] /= brightest;
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
      color += letter[Math.floor(nums[i] / 16)];
      color += letter[Math.floor(nums[i] % 16)];
    }
    return color;
  }

  update() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color, this.ctx));
    }
  }

  draw(timestamp: number) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
      if (this.particles[i].lifetime < timestamp) {
        this.particles.splice(i, 1);
      }
    }
  }

  loop(timestamp: number) {
    this.draw(timestamp);
  }
}
