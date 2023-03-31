import '../public/style.css';

import Phaser, { Types, AUTO } from 'phaser';

import Preloader from './scenes/Preloader';
import CreateMap from './scenes/CreateMap';

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 768, // 24
  height: 384, // 12
  physics: {
    default: 'matter',
    matter: {
      debug: false,
    },
  },
  scene: [Preloader, CreateMap],
  scale: {
    zoom: 1.5,
  },
};

export default new Phaser.Game(config);
