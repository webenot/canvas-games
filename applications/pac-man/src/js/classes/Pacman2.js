import Grid from './Grid';

class Pacman2 {
  constructor (ctx, pacman = {}, options = {}) {
    this.context = ctx;
    this.pacman = Object.assign({
      x: this.context.canvas.width / 2,
      y: this.context.canvas.height / 2,
      radius: 20,
      mouth: 0,
      fill: 'yellow',
      stroke: 'black',
      lineWidth: 0.5,
      angle: Math.PI,
      speed: 120,
      time: 0,
    }, pacman);
    this.options = Object.assign({
      xspeed: this.pacman.speed,
      yspeed: 0,
      guide: false,
    }, options);
    this.grid = new Grid(this.context);
    this.direction = 0;
  }

  draw () {
    const { context: ctx } = this;
    const { x, y, angle } = this.pacman;
    if (this.options.guide) {
      this.grid.draw();
    }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    this.render();
    ctx.restore();
  }

  turnLeft () {
    this.direction = -1;
  }

  turnRight () {
    this.direction = 1;
  }

  turn (direction) {
    const { yspeed, xspeed } = this.options;

    if (yspeed) {
      // if we are travelling vertically
      // set the horizontal speed and apply the direction
      this.options.xspeed = -direction * yspeed;
      // clear the vertical speed and rotate
      this.options.yspeed = 0;
      //this.pacman.angle = this.options.xspeed > 0 ? 2 * Math.PI : Math.PI;
      if (this.options.xspeed > 0) {
        this.pacman.angle = Math.PI;
      } else if (this.options.xspeed < 0) {
        this.pacman.angle = 0;
      }
    } else {
      // if we are travelling horizontally
      // set the vertical speed and apply the direction
      this.options.yspeed = direction * xspeed;
      // clear the horizontal speed and rotate
      this.options.xspeed = 0;
      if (this.options.yspeed < 0) {
        this.pacman.angle = 0.5 * Math.PI;
      } else if (this.options.yspeed > 0) {
        this.pacman.angle = 1.5 * Math.PI;
      }
    }
  }

  update (elapsed) {
    const { radius } = this.pacman;
    const { xspeed, yspeed } = this.options;

    const { context: ctx } = this;
    const width = ctx.canvas.width - 2 * radius;
    const height = ctx.canvas.height - 2 * radius;

    // an average of once per 100 frames
    if (Math.random() <= 0.01) {
      if (Math.random() < 0.5) {
        this.turnLeft();
      } else {
        this.turnRight();
      }
      this.turn(this.direction);
    }

    const xSpeed = radius + elapsed * xspeed;
    const ySpeed = radius + elapsed * yspeed;
    if (this.pacman.x - xSpeed > width) {
      this.pacman.x = -radius;
    }
    if (this.pacman.x + xSpeed < 0) {
      this.pacman.x = width + radius;
    }
    if (this.pacman.y - ySpeed > height) {
      this.pacman.y = -radius;
    }
    if (this.pacman.y + ySpeed < 0) {
      this.pacman.y = height + radius;
    }
    this.pacman.x += xspeed * elapsed;
    this.pacman.y += yspeed * elapsed;
    this.pacman.time += elapsed;

    this.pacman.mouth = Math.abs(Math.sin(2 * Math.PI * this.pacman.time));
  }

  render () {
    const { context: ctx } = this;
    const { radius, stroke, lineWidth, fill, mouth } = this.pacman;

    const angle = Math.PI + mouth;

    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(0, 0, radius, angle, -angle);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

export default Pacman2;
