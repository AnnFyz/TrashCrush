class Button extends Phaser.GameObjects.Container {
  constructor(config) {
    if (!config.scene) {
      console.log("missing scene");
      return;
    }
    if (!config.key) {
      console.log("missing key");
      return;
    }
    super(config.scene);
    this.config = config;
    this.scene = config.scene;
    this.back = this.scene.add.image(0, 0, config.key);

    this.add(this.back);
    if (config.text) {
      this.text1 = this.scene.add.text(0, 0, config.text);
      this.text1.setOrigin(0.5, 0.5);

      this.add(this.text1);
    }

    if (config.event) {
      this.back.setInteractive();
      this.back.on("pointerdown", this.pressed, this);
      this.back.setTint(0xff0000, 0x00ff00, 0x0000ff, 0xff0000);
    }

    this.scene.scale.on("resize", this.resize, this);
    this.scene.add.existing(this);
  }

  pressed() {
    if (this.config.params) {
      EventDispatcher.getInstance().emit(this.config.event, this.config.params);
    } else {
      EventDispatcher.getInstance().emit(this.config.event);
    }
    this.scene.scale.off("resize", this.resizeText, this);
  }

  resize() {
    this.setPosition(this.scene.sys.game.canvas.width / 2, this.scene.sys.game.canvas.height / 2);
  }
}
