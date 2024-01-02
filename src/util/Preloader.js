class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // preload MAIN assets
    this.load.json("gDataSet", "assets/data/data.json");
  }

  complete() {
    console.log("PRELOADER: Asset preload done");
    // store the loaded data
    sData = this.cache.json.get("gDataSet");
  }
}
