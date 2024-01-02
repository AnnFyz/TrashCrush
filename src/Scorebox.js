class Scorebox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    //
    this.text1 = this.scene.add.text(0, 0, "SCORE:0");
    this.text1.setOrigin(0.5, 0.5);
    this.text1.setFontSize(350);
    Align.scaleToGameW(this.text1, 0.25, this.scene.sys.game.canvas);
    this.add(this.text1); // to add text to the container
    this.scene.add.existing(this); // to add container to the scene
    EventDispatcher.getInstance().on(cons.SCORE_UPDATED, this.scoreUpdated, this);
    this.scene.scale.on("resize", this.resize, this);
    EventDispatcher.getInstance().on(cons.END_GAME, this.handleGameEnd, this);
  }

  scoreUpdated() {
    //if (this.text1 != undefined)
    try {
      this.text1.setText("SCORE:" + model.score);
    } catch (error) {
      log("error " + error);
    }
  }

  resize() {
    if (this.scene != undefined) {
      this.x = this.scene.sys.game.canvas.width / 2;
      this.y = this.scene.sys.game.canvas.height / 1.1;
      Align.scaleToGameW(this.text1, 0.25, this.scene.sys.game.canvas);
    }
  }

  handleGameEnd() {
    this.scene.scale.off("resize", this.resize, this);
    this.destroy();
  }
}
