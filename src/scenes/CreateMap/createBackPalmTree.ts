function createBackPalmTree(this: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
  const backPalmTrees = map.getObjectLayer('back-palm-tree');

  this.anims.create({
    key: 'left-back-palm-tree',
    frameRate: 10,
    frames: this.anims.generateFrameNames('back-palm-tree', {
      start: 1, end: 4, prefix: 'Back Palm Tree Left 0', suffix: '.png',
    }),
    repeat: -1,
  });

  this.anims.create({
    key: 'regular-back-palm-tree',
    frameRate: 10,
    frames: this.anims.generateFrameNames('back-palm-tree', {
      start: 1, end: 4, prefix: 'Back Palm Tree Regular 0', suffix: '.png',
    }),
    repeat: -1,
  });

  this.anims.create({
    key: 'right-back-palm-tree',
    frameRate: 10,
    frames: this.anims.generateFrameNames('back-palm-tree', {
      start: 1, end: 4, prefix: 'Back Palm Tree Right 0', suffix: '.png',
    }),
    repeat: -1,
  });

  backPalmTrees.objects.forEach(({
    x, y, width, height, name,
  }) => {
    const firstLetterUppercased = name.charAt(0).toUpperCase() + name.slice(1);

    const backPalmTree = this.add.sprite(
      x! + width! * 0.5,
      y! - height! * 0.5,
      'back-palm-tree',
      `Back Palm Tree ${firstLetterUppercased} 01.png`,
    );

    backPalmTree.play(`${name}-back-palm-tree`);
  });
}

export default createBackPalmTree;
