function createWater(this: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
  const waters = map.getObjectLayer('water');

  this.anims.create({
    key: 'water-move',
    frameRate: 10,
    frames: this.anims.generateFrameNames('water', {
      start: 1,
      end: 4,
      prefix: '',
      suffix: '.png',
    }),
    repeat: -1,
  });

  this.anims.create({
    key: 'reflect-water-01',
    frameRate: 10,
    frames: this.anims.generateFrameNames('water-reflect-small', {
      start: 1,
      end: 6,
      prefix: '',
      suffix: '.png',
    }),
    repeat: -1,
  });

  this.anims.create({
    key: 'reflect-water-02',
    frameRate: 10,
    frames: this.anims.generateFrameNames('water-reflect-small-02', {
      start: 1,
      end: 6,
      prefix: '',
      suffix: '.png',
    }),
    repeat: -1,
  });

  waters.objects.forEach(({
    x, y, height, width,
  }) => {
    this.add.sprite(x!, y! - height!, 'water')
      .setOrigin(0, 0)
      .play('water-move');

    this.add.sprite(x!, y! - height!, 'water-reflect-small')
      .setOrigin(0, 0)
      .play('reflect-water-01');

    this.add.sprite(x! + width! * 0.5, y! - height!, 'water-reflect-small-02')
      .setOrigin(0, 0)
      .play('reflect-water-02');
  });
}

export default createWater;
