class GameField extends Phaser.Scene {
  constructor() {
    super("GameField");
  }
  preload() {}
  init() {
    this.leftField;
    this.rightField;
  }
  create() {
    this.scene.launch("MainScene");
    this.leftField = this.add.rectangle(
      0,
      0,
      game.config.width / 5,
      game.config.height,
      model._currentGameLevel.fieldColor
    );
    this.leftField.setOrigin(0, 0);

    this.rightField = this.add.rectangle(
      game.config.width,
      0,
      game.config.width / 5,
      game.config.height,
      model._currentGameLevel.fieldColor
    );
    this.rightField.setOrigin(1, 0);
  }

  update() {}
}
