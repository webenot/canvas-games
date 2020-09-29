class Starship {
  constructor (ctx, ship = {}, options = {}) {
    this.context = ctx;
    this.ship = Object.assign({
      radius: 150,
      x: 0,
      y: 0,
      angle: 0.5 * Math.PI,
      curve1: 0.25,
      curve2: 0.75,
    }, ship);
    this.options = Object.assign({
      guide: false,
      lineWidth: 2,
      stroke: 'white',
      fill: 'black',
    }, options);
    this.draw();
  }

  draw () {
    const ctx = this.context;

    const { guide, fill, lineWidth, stroke } = this.options;
    const { x, y, radius, angle: angl, curve1, curve2 } = this.ship;

    const angle = angl / 2;

    ctx.save();
    ctx.translate(x, y);
    if (guide) {
      ctx.strokeStyle = 'white';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
    ctx.lineWidth = lineWidth || 2;
    ctx.strokeStyle = stroke || 'white';
    ctx.fillStyle = fill || 'black';
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    // here we have the three curves
    ctx.quadraticCurveTo(
      Math.cos(angle) * radius * curve2,
      Math.sin(angle) * radius * curve2,
      Math.cos(Math.PI - angle) * radius,
      Math.sin(Math.PI - angle) * radius,
    );
    ctx.quadraticCurveTo(-radius * curve1, 0,
      Math.cos(Math.PI + angle) * radius,
      Math.sin(Math.PI + angle) * radius,
    );
    ctx.quadraticCurveTo(
      Math.cos(-angle) * radius * curve2,
      Math.sin(-angle) * radius * curve2,
      radius, 0,
    );
    ctx.fill();
    ctx.stroke();
    // the guide drawing code is getting complicated
    if (guide) {
      ctx.strokeStyle = 'white';
      ctx.fillStyle = 'white';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(
        Math.cos(-angle) * radius,
        Math.sin(-angle) * radius,
      );
      ctx.lineTo(0, 0);
      ctx.lineTo(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
      );
      ctx.moveTo(-radius, 0);
      ctx.lineTo(0, 0);

      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        Math.cos(angle) * radius * curve2,
        Math.sin(angle) * radius * curve2,
        radius / 40, 0, 2 * Math.PI,
      );
      ctx.fill();
      ctx.beginPath();
      ctx.arc(
        Math.cos(-angle) * radius * curve2,
        Math.sin(-angle) * radius * curve2,
        radius / 40, 0, 2 * Math.PI,
      );
      ctx.fill();
      ctx.beginPath();
      ctx.arc(radius * curve1 - radius, 0, radius / 50, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }
}

export default Starship;
