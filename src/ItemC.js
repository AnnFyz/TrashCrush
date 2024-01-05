class ItemC extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.index, config.wasteType, config.desciption);
    this.background;
    this.textDescription;
    this.desciption = config.desciption;
    this.index = config.index;
    this.wasteType = config.wasteType;
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    config.scene.input.setDraggable(this);
    config.scene.add.existing(this);
  }
}
