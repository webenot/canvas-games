class Grid {
  constructor (ctx, minor, major, stroke, fill) {
    this.context = ctx;
    this.minor = minor || 10;
    this.major = major || this.minor * 5;
    this.stroke = stroke || '#00FF00';
    this.fill = fill || '#009900';
  }

  draw () {
    const { context: ctx, stroke, fill, minor, major } = this;

    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    const width = ctx.canvas.width, height = ctx.canvas.height;
    for (let x = 0; x < width; x += minor) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.lineWidth = (x % this.major === 0) ? 0.5 : 0.25;
      ctx.stroke();
      if (x % major === 0) {
        ctx.fillText(x, x, 10);
      }
    }
    for (let y = 0; y < height; y += minor) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.lineWidth = (y % major === 0) ? 0.5 : 0.25;
      ctx.stroke();
      if (y % this.major === 0) {
        ctx.fillText(y, 0, y + 10);
      }
    }
    ctx.restore();
  }
}

export default Grid;
