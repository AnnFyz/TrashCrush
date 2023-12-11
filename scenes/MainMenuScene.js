

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
  }

  preload() {
    this.load.image("button", "assets/ui_images/Button_1.svg");
  }
  create() {
    //this.scene.stop("GameField");
    //this.scene.stop("MainScene");
    this.emitter = EventDispatcher.getInstance();
    let startButton = new Button({
      scene: this,
      key: "button",
      text: "start the game",
      event: "click",
    });
    startButton.x = this.sys.game.canvas.width / 2;
    startButton.y = this.sys.game.canvas.height / 2;
    this.emitter.on("click", this.clickStartButton, this);
    this.scale.on("resize", this.resizeText, this);
    this.text1 = this.add.text(0, 0, "Main Menu");
    this.text1.setOrigin(0.5, 0.5);
    this.text1.setFontSize(350);
    Align.scaleToGameW(this.text1, 0.25, this.sys.game.canvas);
    Align.centerX(this.text1, this.sys.game.canvas);
    Align.alignToGameWVer(this.text1, this.sys.game.canvas, 9);
  }

  clickStartButton() {
    this.emitter.off("click", this.clickStartButton, this);
    this.scale.off("resize", this.resizeText, this);
    this.scene.start("GameField");
    console.log("Start");

  }

  resizeText() {
    Align.scaleToGameW(this.text1, 0.25, this.sys.game.canvas);
    Align.centerX(this.text1, this.sys.game.canvas);
    Align.alignToGameWVer(this.text1, this.sys.game.canvas, 9);
  }
}

