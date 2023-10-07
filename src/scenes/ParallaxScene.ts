class ParallaxScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private speed = 3;

  constructor() {
    super({ key: 'parallax-scene' });
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image('big-cloud', 'Treasure Hunters/Treasure Hunters/Palm Tree Island/Sprites/Background/Big Clouds.png');
  }

  create() {
    const scrollFactor = 1;

    const { height, width } = this.scale;

    // const cloudCount = Math.ceil((width * 10)
    // / this.textures.get('big-cloud').getSourceImage().width) * scrollFactor;

    const cloud = this.add.image(0, height * 0.5, 'big-cloud').setOrigin(0, 1);
    const cloud02 = this.add.image(cloud.width, height * 0.5, 'big-cloud').setOrigin(0, 1);
    const cloud03 = this.add.image(cloud.width + cloud.width, height * 0.5, 'big-cloud').setOrigin(0, 1);

    cloud.setScrollFactor(scrollFactor);
    cloud02.setScrollFactor(scrollFactor);
    cloud03.setScrollFactor(scrollFactor);

    this.cameras.main.setBounds(0, 0, width * 3, height);
  }

  update() {
    const cam = this.cameras.main;

    if (this.cursors.left.isDown) {
      cam.scrollX -= this.speed;
    } else if (this.cursors.right.isDown) {
      cam.scrollX += this.speed;
    }
  }
}

export default ParallaxScene;
// width: 960, // 30
// height: 384, // 12
// width: 640, // 20
// height: 288, // 9
