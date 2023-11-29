class Scorebox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    //
    this.text1 = this.scene.add.text(0, 0, "SCORE:0");
    this.text1.setOrigin(0.5, 0.5);
    this.text1.setFontSize(50);
    this.add(this.text1); // to add text to the container
    this.scene.add.existing(this); // to add container to the scene
    EventDispatcher.getInstance().on(cons.SCORE_UPDATED, this.scoreUpdated, this);
  }

  scoreUpdated() {
    this.text1.setText("SCORE:" + model.score);
  }
}
