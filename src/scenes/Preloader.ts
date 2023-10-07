import { Scene } from 'phaser';

class Preloader extends Scene {
  constructor() {
    super('preloader');
  }

  private loadPalmTree() {
    this.load.atlas('front-palm-tree-top', 'front-palm-tree-top.png', 'front-palm-tree-top.json');
    this.load.atlas('back-palm-tree', 'back-palm-tree.png', 'back-palm-tree.json');
  }

  private loadClouds() {
    this.load.image('small-cloud', 'Treasure Hunters/Treasure Hunters/Palm Tree Island/Sprites/Background/Small Cloud 1.png');
    this.load.image('small-cloud-02', 'Treasure Hunters/Treasure Hunters/Palm Tree Island/Sprites/Background/Small Cloud 2.png');
    this.load.image('small-cloud-03', 'Treasure Hunters/Treasure Hunters/Palm Tree Island/Sprites/Background/Small Cloud 3.png');
    this.load.image('big-cloud', 'Treasure Hunters/Treasure Hunters/Palm Tree Island/Sprites/Background/Big Clouds.png');
  }

  private loadTiles() {
    this.load.image('grass-and-palm-trees', 'Treasure Hunters/Treasure Hunters/Palm Tree Island/Sprites/Front Palm Trees/Front Palm Bottom and Grass (32x32).png');
    this.load.image('terrain', 'Treasure Hunters/Treasure Hunters/Palm Tree Island/Sprites/Terrain/Terrain (32x32).png');
    this.load.image('background', 'Treasure Hunters/Treasure Hunters/Palm Tree Island/Sprites/Background/BG Image.png');

    this.load.tilemapTiledJSON('platform', 'game.json');
  }

  private loadCharacters() {
    this.load.atlas('captain', 'captain.png', 'captain.json');
  }

  private loadWaterEffects() {
    this.load.atlas('water-reflect', 'water-reflect.png', 'water-reflect.json');
    this.load.atlas('water-reflect-small', 'water-reflect-small.png', 'water-reflect-small.json');
    this.load.atlas('water-reflect-small-02', 'water-reflect-small-02.png', 'water-reflect-small-02.json');
  }

  private loadShipHelm() {
    this.load.atlas('ship-helm', 'ship-helm.png', 'ship-helm.json');
  }

  private loadWater() {
    this.load.atlas('water', 'water.png', 'water.json');
  }

  private loadShip() {
    this.load.atlas('ship', 'ship.png', 'ship.json');
    this.load.atlas('sail-wind', 'sail-wind.png', 'sail-wind.json');
  }

  public preload() {
    this.loadTiles();
    this.loadCharacters();
    this.loadWaterEffects();
    this.loadClouds();
    this.loadPalmTree();
    this.loadShipHelm();
    this.loadWater();
    this.loadShip();
  }

  public create() {
    this.scene.start('create-map');
  }
}

export default Preloader;
