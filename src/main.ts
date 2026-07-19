import { Game } from './Game';

const mount = document.getElementById('app');
if (!mount) {
  throw new Error('Missing #app mount node');
}

const game = new Game(mount);
game.start();