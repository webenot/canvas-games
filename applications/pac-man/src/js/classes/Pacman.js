import Grid from './Grid';

class Pacman {
  constructor (ctx, pacman = {}, options = {}) {
    this.context = ctx;
    this.pacman = Object.assign({
      x: 0,
      y: this.context.canvas.height / 5,
      radius: 20,
      mouth: 0,
      fill: 'yellow',
      stroke: 'black',
      lineWidth: 0.5,
      angle: 0.2,
    }, pacman);
    this.options = Object.assign({
      gravity: 0.1,
      xspeed: 1.5,
      yspeed: 0,
      guide: false,
    }, options);
    this.grid = new Grid(this.context);
  }

  draw () {
    const { context: ctx, grid } = this;

    const { x, y, radius, stroke, lineWidth, fill, mouth, angle: angl } = this.pacman;
    const { guide } = this.options;

    if (guide) {
      grid.draw();
    }

    const angle = angl * Math.PI * mouth;
    ctx.save();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(x, y, radius, angle, -angle);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  update () {
    const { xspeed, yspeed, gravity } = this.options;

    const ctx = this.context;

    this.pacman.x += xspeed;
    this.pacman.y += yspeed;
    this.options.yspeed += gravity;
    if (this.pacman.y >= ctx.canvas.height - this.pacman.radius) {
      this.pacman.y = ctx.canvas.height - this.pacman.radius;
      // add an extra radius
      this.options.yspeed *= -0.6;
      // reverse and slow down
      this.options.xspeed *= 0.95;
      // just slow down a bit
    }
    if (this.pacman.x <= 0 || this.pacman.x >= ctx.canvas.width) {
      this.pacman.x = (this.pacman.x + ctx.canvas.width) % ctx.canvas.width;
    }
    this.pacman.mouth =
      Math.abs(Math.sin(6 * Math.PI * this.pacman.x / (ctx.canvas.width)));
  }

  move () {
    setInterval(() => {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.draw();
      this.update();
    }, 1000.0 / 60.0); // 60 fps
  }
}

export default Pacman;
