class GameField extends Phaser.Scene {
  constructor() {
    super("GameField");
    EventDispatcher.getInstance().on(cons.LEVEL_UPDATED, this.colorUpdated, this);
    EventDispatcher.getInstance().on(cons.END_GAME, this.handleGameEnd, this);
  }
  preload() {
    this.gameTimer = this.scene.get("Gametimer");
  }
  init() {
    this.topField;
    this.bottomField;
    this.gameTimer;
  }
  create() {
    //Create game field
    console.log("GameField was started");
    this.scale.on("resize", this.resize, this);
    this.topField = this.add.rectangle(
      0,
      0,
      this.sys.game.canvas.width,
      this.sys.game.canvas.height / 6,
      model._currentGameLevel.fieldColor
    );
    this.topField.setOrigin(0, 0);

    this.bottomField = this.add.rectangle(
      0,
      this.sys.game.canvas.height,
      this.sys.game.canvas.width,
      this.sys.game.canvas.height / 6,
      model._currentGameLevel.fieldColor
    );
    this.bottomField.setOrigin(0, 1);
    Align.scaleToGameWHor(this.topField, 1, this.sys.game.canvas);
    Align.scaleToGameWHor(this.bottomField, 1, this.sys.game.canvas);
    EventDispatcher.getInstance().on(cons.END_GAME, this.startEndScene, this);
    this.scene.launch("MainScene");
    this.scene.launch("Gametimer");
    this.scene.bringToTop("Gametimer");
    //Create game timer
    this.gameTimer.newTimer(this, {
      posX: 100,
      posY: 100,
      callback: "",
      secondsCB: "",
      gameTime: 15,
      delay: 500,
      countdown: false,
    });
  }

  resize(gameSize) {
    Align.scaleToGameWHor(this.topField, 1, gameSize);
    Align.scaleToGameWHor(this.bottomField, 1, gameSize);
    this.topField.setPosition(0, 0);
    this.bottomField.setPosition(0, this.sys.game.canvas.height);
  }

  colorUpdated() {
    this.topField.fillColor = model._currentGameLevel.fieldColor;
    this.bottomField.fillColor = model._currentGameLevel.fieldColor;
  }

  handleGameEnd() {
    this.scale.off("resize", this.resize, this);
  }

  startEndScene() {
    this.scene.stop("MainScene");
    this.scene.start("EndScene");
  }
}
