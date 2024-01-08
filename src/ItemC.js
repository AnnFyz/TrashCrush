class ItemC extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene, config.key, config.index, config.wasteType, config.desciption); // config.x, config.y,
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;

    this.background;
    this.textDescription;
    this.desciption = config.desciption;
    this.index = config.index;
    this.wasteType = config.wasteType;

    this.setSize(config.width, config.height);
    this.setInteractive();
    this.scene.input.setDraggable(this);
    this.scene.add.existing(this);

    this.on("pointerout", () => {
      this.scene.input.off("drag", this.moveItem, this);
    });
    this.on("pointerover", () => {
      this.resetPos();
      this.scene.input.on("drag", this.moveItem, this);
    });
    config.scene.input.on("dragend", this.resetPos, this, config.x, config.y);
    config.scene.scale.on("resize", this.resize, this);
    EventDispatcher.getInstance().on(cons.ITEM_UPDATED, () => {
      this.swapeRight();
    });
    EventDispatcher.getInstance().on(cons.END_GAME, this.handleGameEnd, this);

    this.scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.createBackground();

    this.imageSprite = this.scene.add.sprite(this.width / 2, this.height / 2, typesOfWaste.Plastic + "0");
    this.add(this.imageSprite);
    this.imageSprite.setOrigin(1.5, 2.5);
    Align.scaleToGameW(this.imageSprite, 0.5, this);

    this.setupDescription();
  }

  swapeRight() {
    this.resetPos();
    this.deactivateItem();
  }

  moveItem() {
    this.x = game.input.mousePointer.x;
    this.y = game.input.mousePointer.y;
    //this.setPosition(game.input.mousePointer.x, game.input.mousePointer.y);
    //this.background.setPosition(game.input.mousePointer.x, game.input.mousePointer.y);
    //this.textTime.setPosition(game.input.mousePointer.x, game.input.mousePointer.y);
  }

  resize() {
    this.scale(0.5, this.scene.sys.game.canvas);
  }
  resetPos() {
    if (this.scene != undefined) {
      //Align.scaleToGameWVer(this.background, 0.5, this.scene.sys.game.canvas);
      //Align.scaleToGameWVer(this, 0.25, this.scene.sys.game.canvas);
      this.setPosition(this.scene.sys.game.canvas.width / 2, this.scene.sys.game.canvas.height / 2);
      //this.background.setPosition(this.scene.sys.game.canvas.width / 2, this.startPosY);
      //this.textDescription.setPosition(this.scene.sys.game.canvas.width / 2, this.scene.sys.game.canvas.height / 1.75);
    }
  }

  deactivateItem() {
    this.setActive(false).setVisible(false);
    if (this.background != undefined) {
      this.background.setActive(false).setVisible(false);
    }
    if (this.textDescription != undefined) {
      this.textDescription.setActive(false).setVisible(false);
    }
  }

  activateItem() {
    this.setActive(true).setVisible(true);
    if (this.background != undefined) {
      this.background.setActive(true).setVisible(true);
    }
    if (this.textDescription != undefined) {
      this.textDescription.setActive(true).setVisible(true);
    }
  }

  handleGameEnd() {
    console.log("off resize item");
    if (this.scene != undefined) {
      this.scene.scale.off("resize", this.resetPos, this);
      this.on("pointerout", () => {
        this.scene.input.off("drag", this.moveItem, this);
      });
      this.off("pointerover", () => {
        this.resetPos();
        this.scene.input.off("drag", this.moveItem, this);
      });
      this.scene.input.off("dragend", this.resetPos, this, this.x, this.y);
      this.scene.scale.off("resize", this.resetPos, this);
      EventDispatcher.getInstance().off(cons.ITEM_UPDATED, () => {
        this.swapeRight();
      });
    }
    this.background.destroy();
    this.destroy();
  }

  createBackground() {
    this.background = new Phaser.GameObjects.Rectangle(
      this.scene,
      this.width / 2,
      this.height / 2,
      this.width,
      this.height,
      0xff0000
    );
    this.background.setOrigin(1, 1);
    this.add(this.background);
  }

  setupDescription() {
    this.textDescription = this.scene.add.text(
      this.scene.sys.game.canvas.width / 2,
      this.scene.sys.game.canvas.height / 1.75,
      this.desciption
    );
  }

  scale(scale, proportion) {
    this.scaleX = scale.width / proportion;
    this.scaleY = scale.height / proportion;
    this.setPosition(this.scaleX, this.scaleY);
  }
}
