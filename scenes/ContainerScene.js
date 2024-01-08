class ContainerScene extends Phaser.Scene {
  constructor() {
    super("ContainerScene");
  }
  preload() {
    for (let i = 0; i < amountOfItems_plastic; i++) {
      this.load.image(typesOfWaste.Plastic + i, "assets/images/Plastic/" + typesOfWaste.Plastic + i + ".png");
    }
  }

  create() {
    let itemC = new ItemC({
      scene: this,
      x: this.sys.game.canvas.width / 2,
      y: this.sys.game.canvas.height / 2,
      key: "plastic" + "0",
      index: 0,
      typesOfWaste: typesOfWaste.Plastic,
    });

  }
}
