import Pacman from './classes/Pacman';
import Pacman2 from './classes/Pacman2';
import Ghost from './classes/Ghost';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('pacman');
  const context = canvas.getContext('2d');
  let previous, elapsed;
  const pacman = new Pacman(context);
  //pacman.draw();
  //pacman.move();
  const pacman2 = new Pacman2(context, { mouth: 0.2 }, { guide: true });
  /*const ghost = new Ghost(context, {
    x: Math.random() * 300,
    y: Math.random() * 300,
    radius: 20,
    speed: 70,
    color: 'red',
  });

  function frame (timestamp) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    ghost.update(pacman2, elapsed);
    ghost.draw();
    previous = timestamp;
    window.requestAnimationFrame(frame);
  }

  window.requestAnimationFrame(frame);*/


  const ghosts = [
    new Ghost(context, {
      x: Math.random() * 300,
      y: Math.random() * 300,
      radius: 20,
      speed: 70,
      color: 'red',
    }),
    new Ghost(context, {
      x: Math.random() * 300,
      y: Math.random() * 300,
      radius: 20,
      speed: 60,
      color: 'pink',
    }),
    new Ghost(context, {
      x: Math.random() * 300,
      y: Math.random() * 300,
      radius: 20,
      speed: 50,
      color: 'cyan',
    }),
    new Ghost(context, {
      x: Math.random() * 300,
      y: Math.random() * 300,
      radius: 20,
      speed: 40,
      color: 'orange',
    }),
  ];

  function frame (timestamp) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    pacman2.update(elapsed / 1000);
    ghosts.forEach(ghost => {
      ghost.update(pacman, elapsed);
    });
    pacman2.draw();
    ghosts.forEach(ghost => {
      ghost.draw();
    });
    previous = timestamp;
    window.requestAnimationFrame(frame);
  }

  window.requestAnimationFrame(frame);
});
