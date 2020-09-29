import Pacman from './classes/Pacman';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('pacman');
  const context = canvas.getContext('2d');
  const pacman = new Pacman(context);
  pacman.draw();
  pacman.move();
});
