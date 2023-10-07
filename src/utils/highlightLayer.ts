import { Scene, Tilemaps, Display } from 'phaser';

function highlightLayer(scene: Scene, layer: Tilemaps.TilemapLayer) {
  const debugGraphics = scene.add.graphics().setAlpha(0.7);

  layer.renderDebug(debugGraphics, {
    tileColor: null,
    collidingTileColor: new Display.Color(243, 234, 48, 255),
    faceColor: new Display.Color(40, 39, 37, 255),
  });
}

export default highlightLayer;
