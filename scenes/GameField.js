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
    this.topField = this.add.rectangle(
      0,
      0,
      this.sys.game.canvas.width,
      this.sys.game.canvas.height / 5,
      0xff0000
      //model._currentGameLevel.fieldColor
    );
    this.topField.setOrigin(0, 0);

    this.bottomField = this.add.rectangle(
      0,
      this.sys.game.canvas.height,
      this.sys.game.canvas.width,
      this.sys.game.canvas.height / 5,
      model._currentGameLevel.fieldColor
    );
    this.bottomField.setOrigin(0, 1);
    Align.scaleToGameWHor(this.topField, 0.01, this.sys.game.canvas);
    Align.scaleToGameWHor(this.bottomField, 0.01, this.sys.game.canvas);
    EventDispatcher.getInstance().on(cons.END_GAME, this.startEndScene, this);
    this.scene.launch("MainScene");
    this.scene.launch("Gametimer");
    this.scene.bringToTop("Gametimer");

    /*   this.rect1 = new Phaser.GameObjects.Rectangle(
      this,
      500,
      500,
      this.sys.game.canvas.width / 2,
      this.sys.game.canvas.height / 2,
      0xff0000
    );
    this.add.existing(this.rect1); */

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
    Align.scaleToGameWHor(this.topField, 0.01, gameSize);
    Align.scaleToGameWHor(this.bottomField, 0.01, gameSize);
    this.topField.setPosition(0, 0);
    this.bottomField.setPosition(0,  this.sys.game.canvas.height);
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
