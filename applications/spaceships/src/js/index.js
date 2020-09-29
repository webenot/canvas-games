import Asteroid from './classes/Asteroid';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('asteroids');
  const context = canvas.getContext('2d');
  /*new Starship(
    context,
    {
      x: 150,
      y: 150,
      radius: 100,
    },
  );*/
  const asteroids = [
    new Asteroid(context,
      {
        segments: 24,
        radius: 50,
      },
      { noise: 0.2 },
    ),
    new Asteroid(context,
      {
        segments: 24,
        radius: 50,
      },
      { noise: 0.5 },
    ),
    new Asteroid(context,
      {
        segments: 36,
        radius: 50,
      },
      { noise: 0.2 },
    ),
  ];

  let previous, elapsed;

  function frame (timestamp) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    asteroids.forEach(asteroid => {
      asteroid.update(elapsed / 1000);
      asteroid.draw();
    });

    previous = timestamp;
    window.requestAnimationFrame(frame);
  }

  window.requestAnimationFrame(frame);
});
