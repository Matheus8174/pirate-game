import { Input, Physics, Types } from 'phaser';

import StateMachine, { IStateBase } from '../statemachine/StateMachine';

type Hooks = {
  [x: string]: IStateBase
};

class PlayerController {
  private captainSpeed = 4;

  private stateMachine: StateMachine;

  private sprite!: Physics.Matter.Sprite;

  constructor(
    private scene: Phaser.Scene,
    private cursors: Types.Input.Keyboard.CursorKeys,
    map: Phaser.Tilemaps.Tilemap,
    private terrainLayer: Phaser.Tilemaps.TilemapLayer,
  ) {
    this.createSprite(map);

    this.createCaptainAnimations();

    this.stateMachine = new StateMachine(this, 'player');

    // eslint-disable-next-line object-curly-newline
    const { walk, jump, idle, fall } = this.handleHooksFactory();

    this.stateMachine
      .addState('walk', walk)
      .addState('jump', jump)
      .addState('idle', idle)
      .addState('fall', fall);

    this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      const { gameObject } = data.bodyA as MatterJS.BodyType;

      if (gameObject.tile?.properties?.floor) {
        this.stateMachine.setState('idle');
      }

      if (gameObject.texture?.key) {
        this.stateMachine.setState('idle');
      }
    });

    this.stateMachine.setState('idle');
  }

  private createSprite(map: Phaser.Tilemaps.Tilemap) {
    let spriteSpawn: number[] = [];

    const objectsLayer = map.getObjectLayer('objects');

    objectsLayer.objects.forEach(({ x, y, ...e }) => {
      if (e.name === 'captain-spawn') spriteSpawn = [x! + e.width! * 0.5, y!];
    });

    this.sprite = this.scene.matter.add.sprite(spriteSpawn[0], spriteSpawn[1], 'captain');

    this.sprite.setBody({ width: 24, height: 30 });
    this.sprite.body.position.y += 4;

    this.sprite.setFixedRotation();

    this.scene.cameras.main.startFollow(this.sprite);
  }

  public update(dt: number): void {
    this.stateMachine.update(dt);
  }

  private handleHooksFactory(): Hooks {
    function idleOnEnter(this: PlayerController) {
      this.sprite.play('player-idle');
    }

    function idleOnUpdate(this: PlayerController) {
      if (this.cursors.left.isDown || this.cursors.right.isDown) {
        this.stateMachine.setState('walk');
      }

      const spaceJustPressed = Input.Keyboard.JustDown(this.cursors.space);

      if (spaceJustPressed) {
        this.stateMachine.setState('jump');
      }
    }

    function walkOnEnter(this: PlayerController) {
      this.sprite.play('player-walk');
    }

    function walkOnUpdate(this: PlayerController) {
      if (this.cursors.left.isDown) {
        this.sprite.setFlipX(true);
        this.sprite.setVelocityX(-this.captainSpeed);
      } else if (this.cursors.right.isDown) {
        this.sprite.setFlipX(false);
        this.sprite.setVelocityX(this.captainSpeed);
      } else {
        this.sprite.setVelocityX(0);
        this.stateMachine.setState('idle');
      }

      const spaceJustPressed = Input.Keyboard.JustDown(this.cursors.space);

      if (spaceJustPressed) {
        this.stateMachine.setState('jump');
      }
    }

    function jumpOnEnter(this: PlayerController) {
      this.sprite.setVelocityY(-9);
      this.sprite.play('player-jump', true);
    }

    function jumpOnUpdate(this: PlayerController) {
      if (this.cursors.left.isDown) {
        this.sprite.setFlipX(true);
        this.sprite.setVelocityX(-this.captainSpeed);
      } else if (this.cursors.right.isDown) {
        this.sprite.setFlipX(false);
        this.sprite.setVelocityX(this.captainSpeed);
      }

      if (this.sprite.body.velocity.y > 0) {
        this.stateMachine.setState('fall');
      }
    }

    function fallOnUpdate(this: PlayerController) {
      if (this.cursors.left.isDown) {
        this.sprite.setFlipX(true);
        this.sprite.setVelocityX(-this.captainSpeed);
      } else if (this.cursors.right.isDown) {
        this.sprite.setFlipX(false);
        this.sprite.setVelocityX(this.captainSpeed);
      }
    }

    function fallOnEnter(this: PlayerController) {
      this.sprite.play('player-fall');
    }

    return {
      walk: {
        onEnter: walkOnEnter.bind(this),
        onUpdate: walkOnUpdate.bind(this),
      },
      idle: {
        onEnter: idleOnEnter.bind(this),
        onUpdate: idleOnUpdate.bind(this),
      },
      jump: {
        onEnter: jumpOnEnter.bind(this),
        onUpdate: jumpOnUpdate.bind(this),
      },
      fall: {
        onEnter: fallOnEnter.bind(this),
        onUpdate: fallOnUpdate.bind(this),
      },
    };
  }

  private createCaptainAnimations(): void {
    this.sprite.anims.create({
      key: 'player-jump',
      frameRate: 10,
      frames: this.sprite.anims.generateFrameNames('captain', {
        start: 1, end: 3, prefix: 'Jump 0', suffix: '.png',
      }),
    });

    this.sprite.anims.create({
      key: 'player-fall',
      frameRate: 10,
      frames: [{ key: 'captain', frame: 'Fall 01.png' }],
    });

    this.sprite.anims.create({
      key: 'player-idle',
      frameRate: 10,
      frames:
        this.sprite.anims.generateFrameNames(
          'captain',
          {
            start: 1, end: 5, prefix: 'Idle 0', suffix: '.png',
          },
        ),
      repeat: -1,
    });

    this.sprite.anims.create({
      key: 'player-walk',
      frameRate: 10,
      frames:
        this.sprite.anims.generateFrameNames(
          'captain',
          {
            start: 1, end: 6, prefix: 'Run 0', suffix: '.png',
          },
        ),
      repeat: -1,
    });
  }
}

export default PlayerController;
