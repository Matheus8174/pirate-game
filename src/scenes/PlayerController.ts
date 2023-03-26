import { Input, Physics, Types } from 'phaser';

import StateMachine, { IStateBase } from '../statemachine/StateMachine';

// type Hooks = {
//   [x: string]: IStateBase
// };

class PlayerController {
  private captainSpeed = 4;

  private stateMachine: StateMachine;

  constructor(
    private sprite: Physics.Matter.Sprite,
    private cursors: Types.Input.Keyboard.CursorKeys,
  ) {
    this.createCaptainAnimations();

    this.stateMachine = new StateMachine(this, 'player');

    this.stateMachine
      .addState('walk', {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate,
      })
      .addState('jump', {
        onUpdate: this.jumpOnUpdate,
        onEnter: this.jumpOnEnter,
      })
      .addState('idle', {
        onEnter: this.idleOnEnter,
        onUpdate: this.idleOnUpdate,
      })
      .addState('fall', {
        onUpdate: this.fallOnUpdate,
        onEnter: this.fallOnEnter,
      });

    // data: MatterJS.ICollisionPair
    this.sprite.setOnCollide(() => {
      if (this.stateMachine.isCurrentState('fall') || this.stateMachine.isCurrentState('jump')) {
        this.stateMachine.setState('idle');
      }
    });

    this.stateMachine.setState('idle');
  }

  public update(dt: number) {
    this.stateMachine.update(dt);
  }

  // private handleHooks(): Hooks {

  // }

  private idleOnEnter() {
    this.sprite.play('player-idle');
  }

  private idleOnUpdate() {
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
      this.stateMachine.setState('walk');
    }

    const spaceJustPressed = Input.Keyboard.JustDown(this.cursors.space);

    if (spaceJustPressed) {
      this.stateMachine.setState('jump');
    }
  }

  private fallOnEnter() {
    this.sprite.play('player-fall');
  }

  private walkOnEnter() {
    this.sprite.play('player-walk');
  }

  private jumpOnEnter() {
    this.sprite.setVelocityY(-9);
    this.sprite.play('player-jump', true);
  }

  private jumpOnUpdate() {
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

  private fallOnUpdate() {
    if (this.cursors.left.isDown) {
      this.sprite.setFlipX(true);
      this.sprite.setVelocityX(-this.captainSpeed);
    } else if (this.cursors.right.isDown) {
      this.sprite.setFlipX(false);
      this.sprite.setVelocityX(this.captainSpeed);
    }
  }

  private walkOnUpdate() {
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

  private createCaptainAnimations() {
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
