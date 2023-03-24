import { Scene } from 'phaser';

class Preloader extends Scene {
  constructor() {
    super('preloader');
  }

  private loadTiles() {
    this.load.image('tiles', 'Treasure Hunters/Treasure Hunters/Palm Tree Island/Sprites/Terrain/Terrain (32x32).png');
    this.load.tilemapTiledJSON('platform', 'game.json');
  }

  private loadCharacters() {
    this.load.atlas('captain', 'captain.png', 'captain.json');
  }

  public preload() {
    this.loadTiles();
    this.loadCharacters();
  }

  public create() {
    this.scene.start('game');
  }
}

export default Preloader;
