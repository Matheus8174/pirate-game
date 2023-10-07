function createShip(this: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
  const { objects } = map.getObjectLayer('ship');

  const ship = objects.find(({ name }) => name === 'ship');

  const sailWind = objects.find(({ name }) => name === 'sail-wind');

  if (!ship || !sailWind) return;

  const shipSprite = this.matter.add.sprite(
    ship.x! + ship.width! * 0.5,
    ship.y! - ship.height! * 0.5,
    ship.name!,
    undefined,
    {
      isStatic: true,
    },
  );

  shipSprite.body.position.y -= 1;

  shipSprite.anims.create({
    key: 'ship-shine',
    frameRate: 10,
    frames: this.anims.generateFrameNames('ship', {
      start: 1,
      end: 6,
      prefix: '',
      suffix: '.png',
    }),
    repeat: -1,
  });

  const originalY = shipSprite.y;
  let upOrDown = true;

  shipSprite.play('ship-shine');

  const sailWindSprite = this.add.sprite(
    sailWind.x!,
    sailWind.y! - sailWind.height!,
    sailWind.name!,
  ).setOrigin(0, 0);

  sailWindSprite.y -= 1;

  sailWindSprite.anims.create({
    key: 'sail-wind',
    frameRate: 10,
    frames: this.anims.generateFrameNames('sail-wind', {
      start: 1,
      end: 4,
      prefix: '',
      suffix: '.png',
    }),
    repeat: -1,
  });

  sailWindSprite.play('sail-wind');

  this.time.addEvent({
    delay: shipSprite.anims.currentAnim.msPerFrame,
    loop: true,
    callback: () => {
      if (upOrDown) {
        if (originalY === shipSprite.y) upOrDown = !upOrDown;

        shipSprite.y -= 1;
        sailWindSprite.y -= 1;
      } else {
        if (originalY === shipSprite.y) upOrDown = !upOrDown;

        shipSprite.y += 1;
        sailWindSprite.y += 1;
      }
    },
  });
}

export default createShip;
