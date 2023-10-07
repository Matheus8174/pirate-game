import { Types, Scene } from 'phaser';

import createWaterReflection from './createWaterReflection';
import createBackPalmTree from './createBackPalmTree';
import createClouds from './createClouds';
import createFrontPalmTree from './createFrontPalmTree';
import createShipHelm from './createShipHelm';
import createWater from './createWater';

import PlayerController from '../PlayerController';
import createShip from './createShip';

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

    const { height, width } = this.game.config;

    // const x = Number(width) * 0.5;
    // const y = (Number(height) + Number(height)) * 0.4 - 3;

    // createShipHelm.call(this, { x, y });

    createShip.call(this, map);

    createWater.call(this, map);

    const tileset = map.addTilesetImage('terrain', 'terrain');

    const terrainLayer = map.createLayer('Terrain', [tileset, grasSandPalmTrees]);

    terrainLayer.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(terrainLayer);

    this.playerController = new PlayerController(this, this.cursors, map, terrainLayer);

    createFrontPalmTree.call(this, map);

    map.createLayer('Palm-tree', grasSandPalmTrees);

    // this.cameras.main.width *= 0.9;
    // this.cameras.main.height *= 0.9;
    this.cameras.main.setBounds(
      0,
      -140,
      Number(width) + 90,
      520,
    );
  }
}

export default CreateMap;
