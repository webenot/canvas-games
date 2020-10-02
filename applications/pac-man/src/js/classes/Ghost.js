class Ghost {
  constructor (ctx, ghost = {}, options = {}) {
    this.context = ctx;
    this.ghost = Object.assign({
      radius: 20,
      x: 150,
      y: 150,
      color: 'red',
      speed: 70,
    }, ghost);
    this.options = Object.assign({
      feet: 4,
      stroke: 'white',
      lineWidth: this.ghost.radius * 0.05,
    }, options);
    this.ghost.headRadius = this.ghost.radius * 0.8;
    this.ghost.footRadius = this.ghost.headRadius / this.options.feet;
  }

  draw () {
    const { context: ctx } = this;
    const { x, y } = this.ghost;

    ctx.save();
    ctx.translate(x, y);
    this.render();
    ctx.restore();
  }

  update (target, elapsed) {
    const angle = Math.atan2(target.pacman.y - this.ghost.y, target.pacman.x - this.ghost.x);
    const xSpeed = Math.cos(angle) * this.ghost.speed;
    const ySpeed = Math.sin(angle) * this.ghost.speed;
    this.ghost.x += xSpeed * elapsed;
    this.ghost.y += ySpeed * elapsed;
  }

  render () {
    const { context: ctx } = this;
    const { stroke, lineWidth, feet } = this.options;
    const { radius, footRadius, headRadius, color } = this.ghost;

    ctx.strokeStyle = stroke;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth || radius * 0.05;
    ctx.beginPath();
    for (let foot = 0; foot < feet; foot++) {
      ctx.arc(
        (2 * footRadius * (feet - foot)) - headRadius - footRadius,
        radius - footRadius,
        footRadius, 0, Math.PI,
      );
    }
    ctx.lineTo(-headRadius, radius - footRadius);
    ctx.arc(0, headRadius - radius, headRadius, Math.PI, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      headRadius - radius - radius / 10,
      headRadius - radius,
      radius / 5, 0, 2 * Math.PI,
    );
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      headRadius - radius + radius / 2,
      headRadius - radius,
      radius / 5,
      0,
      2 * Math.PI,
    );
    ctx.fill();
    ctx.stroke();
  }
}

export default Ghost;
