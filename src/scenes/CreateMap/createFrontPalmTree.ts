function createFrontPalmTree(this: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
  const palmTrees = map.getObjectLayer('front-palm-tree');

  this.anims.create({
    key: 'move-front-palm-tree',
    frameRate: 10,
    frames: this.anims.generateFrameNames('front-palm-tree-top', {
      start: 1, end: 4, prefix: 'Front Palm Tree Top 0', suffix: '.png',
    }),
    repeat: -1,
  });

  // eslint-disable-next-line object-curly-newline
  palmTrees.objects.forEach(({ x, y, width, height }) => {
    const palmTreeTop = this.matter.add.sprite(x! + width! * 0.5, y! - height! * 0.5, 'front-palm-tree-top');

    palmTreeTop.setBody({ height: palmTreeTop.height - 5 });
    palmTreeTop.body.position.y += 2;
    palmTreeTop.setStatic(true);

    palmTreeTop.play('move-front-palm-tree');
  });
}

export default createFrontPalmTree;
