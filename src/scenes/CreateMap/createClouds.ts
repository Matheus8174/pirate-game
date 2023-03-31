function createClouds(this: Phaser.Scene) {
  const cloudY = this.game.scale.height * 0.5 + 68;
  const cloudVelocity = 0.1;

  const cloud = this.add.image(0, cloudY, 'big-cloud').setOrigin(0, 0.5);

  const { width } = cloud;

  const cloud02 = this.add.image(width, cloudY, 'big-cloud').setOrigin(0, 0.5);
  const cloud03 = this.add.image(width + width, cloudY, 'big-cloud').setOrigin(0, 0.5);

  const smallCloud = this.add.image(this.game.scale.width * 0.5, cloudY - 100, 'small-cloud').setOrigin(0, 0.5);
  const smallCloud02 = this.add.image(this.game.scale.width * 0.5 + 250, cloudY - 150, 'small-cloud-02').setOrigin(0, 0.5);
  const smallCloud03 = this.add.image(this.game.scale.width * 0.5 + 450, cloudY - 120, 'small-cloud').setOrigin(0, 0.5);

  const halfHeight = this.game.scale.height * 0.5;
  const smallCloudY = [halfHeight - 100, halfHeight - 50];

  function updateBigCloud() {
    if (cloud.getBounds().right <= 0) {
      cloud.x = width * 2;
    } else if (cloud02.getBounds().right <= 0) {
      cloud02.x = width * 2;
    } else if (cloud03.getBounds().right <= 0) {
      cloud03.x = width * 2;
    }

    cloud.x -= cloudVelocity;
    cloud02.x -= cloudVelocity;
    cloud03.x -= cloudVelocity;
  }

  const updateSmallCloud = () => {
    smallCloud.x -= 0.5;
    smallCloud02.x -= 0.5;
    smallCloud03.x -= 0.5;

    if (smallCloud.getBounds().right <= 0) {
      smallCloud.setX(Number(this.game.config.width));
      smallCloud.setY(smallCloudY[Math.floor(Math.random() * 3)]);
    }

    if (smallCloud03.getBounds().right <= 0) {
      smallCloud03.setX(Number(this.game.config.width));
      smallCloud03.setY(smallCloudY[Math.floor(Math.random() * 3)]);
    }

    if (smallCloud02.getBounds().right <= 0) {
      smallCloud02.setX(Number(this.game.config.width));
    }
  };

  return () => {
    updateBigCloud();
    updateSmallCloud();
  };
}

export default createClouds;
