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
    this.leftField;
    this.rightField;
    this.gameTimer;
  }
  create() {
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

    /*  this.text1 = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 9, "Time:0");
    this.text1.setOrigin(0.5, 0.5);
    this.text1.setFontSize(350);

    let currentScore = 0;
    let newScore = 60;

    let updateTween = this.tweens.addCounter({
      from: currentScore,
      to: newScore,
      duration: 60000,
      ease: "linear",
      onUpdate: (tween) => {
        const value = Math.round(tween.getValue());
        this.text1.setText("Time:" + Math.round(tween.getValue()));
        console.log("value: " + value);
      },
    });
    Align.scaleToGameW(this.text1, 0.25, this.sys.game.canvas); */

    //Create game field
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
    EventDispatcher.getInstance().on(cons.END_GAME, this.startEndScene, this);
    this.scene.launch("MainScene");
    this.scene.launch("Gametimer");
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
    this.scale.off("resize", this.resize, this);
  }

  startEndScene() {
    this.scene.stop("MainScene");
    this.scene.start("EndScene");
  }
}
