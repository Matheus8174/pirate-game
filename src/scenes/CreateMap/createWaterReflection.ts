function createWaterReflection(this: Phaser.Scene) {
  const height = Number(this.game.config.height);
  const width = Number(this.game.config.width);

  const waterReflects = [
    { x: width * 0.5 + 260, y: height * 0.5 + 130, type: 'Big' },
    { x: width * 0.5 - 250, y: height * 0.5 + 130, type: 'Big' },
  ];

  waterReflects.forEach(({ x, y, type }) => {
    const waterReflect = this.add.sprite(x, y, 'water-reflect');
    /*
      {
        isStatic: true,
        isSensor: true,
      }
    */

    waterReflect.anims.create({
      key: 'water-reflact-big',
      frameRate: 10,
      frames: waterReflect.anims.generateFrameNames('water-reflect', {
        start: 1, end: 4, prefix: `Water Reflect ${type} 0`, suffix: '.png',
      }),
      repeat: -1,
    });

    waterReflect.play('water-reflact-big');
  });
}

export default createWaterReflection;
