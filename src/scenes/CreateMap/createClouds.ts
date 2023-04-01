type CreateSmallCloudsProps = {
  howManyClouds: number;
  cloudVelocity: number;
};

function createBigCloud(this: Phaser.Scene) {
  const cloudY = this.game.scale.height * 0.5 + 68;
  const cloudVelocity = 0.1;

  const cloud = this.add.image(0, cloudY, 'big-cloud').setOrigin(0, 0.5);

  const { width } = cloud;

  const cloud02 = this.add.image(width, cloudY, 'big-cloud').setOrigin(0, 0.5);
  const cloud03 = this.add.image(width + width, cloudY, 'big-cloud').setOrigin(0, 0.5);

  return () => {
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
  };
}

function createSmallClouds(this: Phaser.Scene, props: CreateSmallCloudsProps) {
  const halfHeight = this.game.scale.height * 0.5;

  const cloudSpawnRange = [
    halfHeight - 100,
    halfHeight - 70,
    halfHeight - 50,
    halfHeight - 30,
    halfHeight,
  ];

  const cloudTextureRange = [
    'small-cloud',
    'small-cloud-02',
    'small-cloud-03',
  ];

  const getRandomItemFromArray = (from: any[]) => from[
    Math.floor(Math.random() * (from.length))
  ];

  // eslint-disable-next-line arrow-body-style
  const clouds = Array.from({ length: props.howManyClouds }).map((_, index) => {
    const x = this.game.scale.width * 0.5 + 200 * index;
    const y = getRandomItemFromArray(cloudSpawnRange);

    return this.add.image(x, y, getRandomItemFromArray(cloudTextureRange)).setOrigin(0, 0.5);
  });

  const updateSmallCloud = () => {
    clouds.forEach((cloud) => {
      // eslint-disable-next-line no-param-reassign
      cloud.x -= props.cloudVelocity;

      if (cloud.getBounds().right <= 0) {
        cloud.setX(Number(this.game.config.width));
        cloud.setY(getRandomItemFromArray(cloudSpawnRange));
      }
    });
  };

  return updateSmallCloud;
}

function createClouds(this: Phaser.Scene) {
  const updateBigCloud = createBigCloud.call(this);
  const updateSmallClouds = createSmallClouds.call(this, {
    cloudVelocity: 0.5,
    howManyClouds: 5,
  });

  return () => {
    updateBigCloud();
    updateSmallClouds();
  };
}

export default createClouds;
