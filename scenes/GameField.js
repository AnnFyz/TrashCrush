class GameField extends Phaser.Scene {
  constructor() {
    super("GameField");
    EventDispatcher.getInstance().on(cons.LEVEL_UPDATED, this.colorUpdated, this);
    EventDispatcher.getInstance().on(cons.END_GAME, this.handleGameEnd, this);
  }
  preload() {}
  init() {
    this.leftField;
    this.rightField;
  }
  create() {
    console.log("GameField was started");
    this.scale.on("resize", this.resize, this);
    this.leftField = this.add.rectangle(
      0,
      0,
      this.sys.game.canvas.width / 5,
      this.sys.game.canvas.height,
      model._currentGameLevel.fieldColor
    );
    this.leftField.setOrigin(0, 0);

    this.rightField = this.add.rectangle(
      this.sys.game.canvas.width,
      0,
      this.sys.game.canvas.width / 5,
      this.sys.game.canvas.height,
      model._currentGameLevel.fieldColor
    );
    this.rightField.setOrigin(1, 0);
    Align.scaleToGameWHor(this.leftField, 0.25, this.sys.game.canvas);
    Align.scaleToGameWHor(this.rightField, 0.25, this.sys.game.canvas);
    this.scene.launch("MainScene");
    EventDispatcher.getInstance().on(cons.END_GAME, this.startEndScene, this);
  }

  resize(gameSize) {
    Align.scaleToGameWHor(this.leftField, 0.25, gameSize);
    Align.scaleToGameWHor(this.rightField, 0.25, gameSize);
    this.leftField.setPosition(0, 0);
    this.rightField.setPosition(gameSize.width, 0);
  }

  colorUpdated() {
    this.leftField.fillColor = model._currentGameLevel.fieldColor;
    this.rightField.fillColor = model._currentGameLevel.fieldColor;
  }

  handleGameEnd() {
    EventDispatcher.getInstance().off(cons.LEVEL_UPDATED, this.colorUpdated, this);
  }

  startEndScene() {
    this.scene.stop("MainScene");
    this.scene.start("EndScene");
  }
}
