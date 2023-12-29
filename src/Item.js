class Item extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.index, config.wasteType);
    this.background;
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
      this.resize();
      this.scene.input.on("drag", this.moveItem, this);
    });
    config.scene.input.on("dragend", this.resize, this, config.x, config.y);
    config.scene.scale.on("resize", this.resize, this);
    EventDispatcher.getInstance().on(cons.ITEM_UPDATED, () => {
      this.swapeRight();
    });
    EventDispatcher.getInstance().on(cons.END_GAME, this.handleGameEnd, this);
    this.createBackground();
    this.setDepth(100);
  }

  swapeRight() {
    this.resize();
    this.deactivateItem();
  }

  moveItem() {
    this.setPosition(game.input.mousePointer.x, game.input.mousePointer.y);
    this.background.setPosition(game.input.mousePointer.x, game.input.mousePointer.y);
  }

  resize() {
    if (this.scene != undefined) {
      Align.scaleToGameW(this, 0.25, this.scene.sys.game.canvas);
      this.setPosition(this.scene.sys.game.canvas.width / 2, this.scene.sys.game.canvas.height / 2);
      this.background.setPosition(this.scene.sys.game.canvas.width / 2, this.scene.sys.game.canvas.height / 2);
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
    if (this.scene != undefined) {
      this.scene.scale.off("resize", this.resize, this);
      this.on("pointerout", () => {
        this.scene.input.off("drag", this.moveItem, this);
      });
      this.off("pointerover", () => {
        this.resize();
        this.scene.input.off("drag", this.moveItem, this);
      });
      this.scene.input.off("dragend", this.resize, this, this.x, this.y);
      this.scene.scale.off("resize", this.resize, this);
      EventDispatcher.getInstance().off(cons.ITEM_UPDATED, () => {
        this.swapeRight();
      });
    }
    this.destroy();
  }

  createBackground() {
    this.background = new Phaser.GameObjects.Rectangle(
      this.scene,
      this.x,
      this.y,
      this.x,
      this.y,
      0xff0000
    );
    this.background.setOrigin(0.5, 0.5);
    this.scene.add.existing(this.background);
  }
}
