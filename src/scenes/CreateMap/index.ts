import { Types, Scene } from 'phaser';

import createWaterReflection from './createWaterReflection';
import createBackPalmTree from './createBackPalmTree';
import createClouds from './createClouds';
import createFrontPalmTree from './createFrontPalmTree';

import PlayerController from '../PlayerController';

class CreateMap extends Scene {
  private playerController?: PlayerController;

  private cursors!: Types.Input.Keyboard.CursorKeys;

  private moveCloud!: () => void;

  constructor() {
    super({ key: 'create-map' });
  }

  public init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public update(_: number, dt: number) {
    this.playerController?.update(dt);
    this?.moveCloud();
  }

  public create() {
    const map = this.make.tilemap({ key: 'platform' });

    map.createLayer('Background', map.addTilesetImage('background', 'background'));

    const grasSandPalmTrees = map.addTilesetImage('palm-tree-stem', 'grass-and-palm-trees');

    this.moveCloud = createClouds.call(this);

    createWaterReflection.call(this);

    createBackPalmTree.call(this, map);

    this.playerController = new PlayerController(this, this.cursors, map);

    createFrontPalmTree.call(this, map);

    const tileset = map.addTilesetImage('terrain', 'terrain');

    const terrainLayer = map.createLayer('Terrain', [tileset, grasSandPalmTrees]);

    map.createLayer('Palm-tree', grasSandPalmTrees);

    terrainLayer.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(terrainLayer);

    // this.cameras.main.width *= 0.5;
    // this.cameras.main.height *= 0.5;
    this.cameras.main.setBounds(0, 0, this.scale.width, this.scale.height);
  }
}

export default CreateMap;
