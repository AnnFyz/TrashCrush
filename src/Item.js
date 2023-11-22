class Item extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.index, config.wasteType);

    this.index = config.index;
    this.wasteType = config.wasteType;
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
}
