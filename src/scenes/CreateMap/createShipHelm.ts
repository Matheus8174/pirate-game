type CreateShipHelmProps = {
  x: number,
  y: number
};

function createShipHelm(this: Phaser.Scene, { x, y }: CreateShipHelmProps) {
  const shipHelm = this.add.sprite(x, y, 'ship-helm');

  const idle = shipHelm.anims.create({
    key: 'ship-helm-idle',
    frameRate: 10,
    frames: this.anims.generateFrameNames('ship-helm', {
      start: 1,
      end: 6,
      prefix: 'Ship Helm Idle 0',
      suffix: '.png',
    }),
    repeat: -1,
  }) as Phaser.Animations.Animation;

  const turn = shipHelm.anims.create({
    key: 'ship-helm-turning',
    frameRate: 10,
    frames: this.anims.generateFrameNames('ship-helm', {
      start: 1,
      end: 4,
      prefix: 'Ship Helm Turn 0',
      suffix: '.png',
    }),
  }) as Phaser.Animations.Animation;

  shipHelm.play('ship-helm-idle', true);

  const t = shipHelm.playAfterDelay('ship-helm-turning', turn.duration);

  // let r: Phaser.GameObjects.Sprite;

  t.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
    const r = shipHelm.play('ship-helm-idle');

    r.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      console.log('aaasssssss');
    });
  }, this);

  // shipHelm.

  // this.time.addEvent({
  //   delay: idle.duration,
  //   callback: () => {
  //     const n = shipHelm.play('ship-helm-turning', true);
  //     // turn.getFrames();
  //     this.anims.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
  //       console.log('sssssssss');
  //     }, turn);

  //     n.stopOnFrame(turn.getLastFrame());
  //     console.log('picas');
  //     // shipHelm.anims.stopOnFrame()
  //   },
  //   repeat: 99999999,
  // });

  // this.time.addEvent({
  //   delay: idle.duration,
  //   loop: true,
  //   callback: () => {
  //     console.log('s');
  //     // shipHelm.setTexture('ship-helm-turning');
  //     shipHelm.play('ship-helm-turning', true);
  //     shipHelm.
  //     // shipHelm.play('ship-helm-idle', true);
  //   },
  // });
}

export default createShipHelm;
