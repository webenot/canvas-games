import Grid from '../../../../pac-man/src/js/classes/Grid';

class Asteroid {
  constructor (
    ctx,
    asteroid = {},
    options = {},
  ) {
    this.context = ctx;
    this.asteroid = Object.assign({
      x: this.context.canvas.width * Math.random(),
      y: this.context.canvas.height * Math.random(),
      radius: 50,
      angle: 0,
      segments: 24,
    }, asteroid);
    this.shape = [];
    for (let i = 0; i < this.asteroid.segments; i++) {
      this.shape.push(Math.random() - 0.5);
    }
    this.options = Object.assign({
      stroke: 'white',
      fill: 'black',
      noise: 0.5,
      guide: false,
      xSpeed: this.context.canvas.width * (Math.random() - 0.5),
      ySpeed: this.context.canvas.height * (Math.random() - 0.5),
      rotationSpeed: 2 * Math.PI * (Math.random() - 0.5),
    }, options);
    this.grid = new Grid(this.context);
    this.draw();
  }

  draw () {
    const { x, y, angle } = this.asteroid;
    const { guide } = this.options;
    const { context: ctx } = this;

    if (guide) {
      this.grid.draw();
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    this.render();
    ctx.restore();
  }

  update (elapsed) {
    const { x, y, radius, angle } = this.asteroid;
    const { xSpeed, ySpeed, rotationSpeed } = this.options;
    const { context: ctx } = this;
    if (x - radius + elapsed * xSpeed > ctx.canvas.width) {
      this.asteroid.x = -radius * Math.random();
    }
    if (x + radius + elapsed * xSpeed < 0) {
      this.asteroid.x = ctx.canvas.width + radius * Math.random();
    }
    if (y - radius + elapsed * ySpeed > ctx.canvas.height) {
      this.asteroid.y = -radius * Math.random();
    }
    if (y + radius + elapsed * ySpeed < 0) {
      this.asteroid.y = ctx.canvas.height + radius * Math.random();
    }
    this.asteroid.x += elapsed * xSpeed;
    this.asteroid.y += elapsed * ySpeed;
    this.asteroid.angle = (angle + elapsed * rotationSpeed) % (2 * Math.PI);
  }

  render () {
    const { radius } = this.asteroid;
    const { stroke, fill, guide, noise } = this.options;
    const { shape, context: ctx } = this;

    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.beginPath();
    for (let i = 0; i < shape.length; i++) {
      ctx.rotate(2 * Math.PI / shape.length);
      ctx.lineTo(radius + radius * noise * shape[i], 0);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (guide) {
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = 0.2;
      ctx.arc(0, 0, radius + radius * noise, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius - radius * noise, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}

export default Asteroid;
