class GameField extends Phaser.Scene {
  constructor() {
    super("GameField");
    EventDispatcher.getInstance().on(cons.LEVEL_UPDATED, this.colorUpdated, this);
  }
  preload() {}
  init() {
    this.leftField;
    this.rightField;
  }
  create() {
    this.scene.launch("MainScene");
    this.leftField = this.add.rectangle(0, 0, game.config.width / 5, game.config.height, model._currentGameLevel.fieldColor);
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

  colorUpdated() {
    this.leftField.fillColor = model._currentGameLevel.fieldColor;
    this.rightField.fillColor = model._currentGameLevel.fieldColor;
  }
}
