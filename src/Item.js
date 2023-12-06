class Item extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.index, config.wasteType);

    this.index = config.index;
    this.wasteType = config.wasteType;
    this.scene = config.scene;
    this.deactivateItem();
    this.setInteractive();
    this.x = config.x;
    this.y = config.y;
    config.scene.input.setDraggable(this);
    config.scene.add.existing(this);
    this.on("pointerout", () => {
      this.scene.input.off("drag", this.moveItem, this);
    });
    this.on("pointerover", () => {
      this.resetPos();
      this.scene.input.on("drag", this.moveItem, this);
    });
    config.scene.input.on("dragend", this.resetPos, this, config.x, config.y);
    config.scene.scale.on("resize", this.resetPos, this);
    EventDispatcher.getInstance().on(cons.ITEM_UPDATED, () => {
      this.swapeRight();
    });
    EventDispatcher.getInstance().on(cons.END_GAME, this.handleGameEnd, this);
  }

  swapeRight() {
    this.resetPos();
    this.deactivateItem();
  }

  moveItem() {
    this.setPosition(game.input.mousePointer.x, game.input.mousePointer.y);
  }

  resetPos() {
    if(this.scene != undefined){
      Align.scaleToGameW(this, 0.25, this.scene.sys.game.canvas);
      this.setPosition(this.scene.sys.game.canvas.width / 2, this.scene.sys.game.canvas.height / 2);
    }
  }

  deactivateItem() {
    this.setActive(false).setVisible(false);
  }

  activateItem() {
    this.setActive(true).setVisible(true);
  }

  handleGameEnd() {
    console.log("off resize item");
    this.scene.scale.off("resize", this.resetPos, this);
  }
}
