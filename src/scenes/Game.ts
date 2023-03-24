import {
  Scene, Types, Physics, Input,
} from 'phaser';

class Game extends Scene {
  private cursors!: Types.Input.Keyboard.CursorKeys;

  private captainSpeed = 4;

  private captain!: Physics.Matter.Sprite;

  private captainSpawn!: [number, number];

  private isTouchingGround = false;

  constructor() {
    super({ key: 'game' });
  }

  public init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public update() {
    if (!this.captain) return;

    const spaceJustPressed = Input.Keyboard.JustDown(this.cursors.space);

    if (this.cursors.left.isDown) {
      this.captain.setFlipX(true);
      this.captain.setVelocityX(-this.captainSpeed);
      this.captain.play('player-walk', true);
    } else if (this.cursors.right.isDown) {
      this.captain.setFlipX(false);
      this.captain.setVelocityX(this.captainSpeed);
      this.captain.play('player-walk', true);
    } else {
      this.captain.setVelocityX(0);
      this.captain.play('player-idle', true);
    }

    if (spaceJustPressed && this.isTouchingGround) {
      this.captain.setVelocityY(-9);
      this.isTouchingGround = false;
    }
  }

  public create() {
    this.createScenario();
    this.createPlayer();
    this.createCaptainAnimations();
  }

  private createPlayer() {
    this.captain = this.matter.add.sprite(this.captainSpawn[0], this.captainSpawn[1], 'captain')
      .play('player-idle');

    this.captain.setBody({ width: 30, height: 30 });
    this.captain.body.position.y += 4;

    this.captain.setFixedRotation();

    // data: MatterJS.ICollisionPair
    this.captain.setOnCollide(() => {
      this.isTouchingGround = true;
    });

    this.cameras.main.startFollow(this.captain);
  }

  private createScenario() {
    const map = this.make.tilemap({ key: 'platform' });

    const tileset = map.addTilesetImage('terrain', 'tiles');

    const terrainLayer = map.createLayer('Terrain', tileset);

    terrainLayer.setCollisionByProperty({ collides: true });

    const objectsLayer = map.getObjectLayer('objects');

    objectsLayer.objects.forEach(({
      x = 0, y = 0, width = 0, name,
    }) => {
      if (name === 'captain-spawn') this.captainSpawn = [x + width * 0.5, y];
    });

    this.matter.world.convertTilemapLayer(terrainLayer);
  }

  private createCaptainAnimations() {
    this.anims.create({
      key: 'player-jump',
      frameRate: 10,
      frames: this.anims.generateFrameNames('captain', {
        start: 1, end: 3, prefix: 'Jump 0', suffix: '.png',
      }),
      repeat: 1,
    });

    this.anims.create({
      key: 'player-idle',
      frameRate: 10,
      frames:
        this.anims.generateFrameNames(
          'captain',
          {
            start: 1, end: 5, prefix: 'Idle 0', suffix: '.png',
          },
        ),
      repeat: -1,
    });

    this.anims.create({
      key: 'player-walk',
      frameRate: 10,
      frames:
        this.anims.generateFrameNames(
          'captain',
          {
            start: 1, end: 6, prefix: 'Run 0', suffix: '.png',
          },
        ),
      repeat: -1,
    });
  }
}

export default Game;
