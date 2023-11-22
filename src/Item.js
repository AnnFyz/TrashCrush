class Item extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.index, config.wasteType);

    this.index = config.index;
    this.wasteType = config.wasteType;
    this.scene = config.scene;
    this.deactivateItem();
    this.setInteractive();
    config.scene.input.setDraggable(this);
    config.scene.add.existing(this);
    config.scene.input.on("drag", this.moveItem, this);
    //this.on("pointerdown", this.swape, this);
  }

  swape() {
    EventDispatcher.getInstance().emit(cons.ITEM_UPDATED);
    this.deactivateItem();
  }

  moveItem() {
    this.setPosition(game.input.mousePointer.x, game.input.mousePointer.y);
  }

  deactivateItem() {
    this.setActive(false).setVisible(false);
  }

  activateItem() {
    this.setActive(true).setVisible(true);
  }

  /*  checkOverlap() {
    this.updateTransform();
    console.log("THIS " + this.getBounds());
    this.gameFieldScene = this.scene.scene.get("GameField");
    let boundsOfActiveItem = this.getBounds();
    let boundsOfRightField = this.gameFieldScene.rightField.getBounds();
    let boundsOfLeftField = this.gameFieldScene.leftField.getBounds();
    if (Phaser.Geom.Intersects.RectangleToRectangle(boundsOfActiveItem, boundsOfRightField)) {
      EventDispatcher.getInstance().emit(cons.ITEM_UPDATED);
      this.deactivateItem();
      console.log("UPDATE ITEM");
    }
  } */
}
