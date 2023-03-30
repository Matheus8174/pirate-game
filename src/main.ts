import '../public/style.css';

import Phaser, { Types, AUTO } from 'phaser';

import Preloader from './scenes/Preloader';
import Game from './scenes/Game';
import ParallaxScene from './scenes/ParallaxScene';

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 768,
  height: 448,
  physics: {
    default: 'matter',
    matter: {
      debug: false,
    },
  },
  scene: [ParallaxScene],
  scale: {
    zoom: 2,
  },
};

export default new Phaser.Game(config);
